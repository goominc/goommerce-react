import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ReactScriptLoaderMixin } from 'react-script-loader';

import CheckoutPage from 'components/checkout/CheckoutPage';

import { ApiAction, checkoutNewAddress, checkoutToggleEditAddress, saveAddressAndThen } from 'redux/actions';
const { inipay, loadOrder, loadAddresses,
  saveOrderAddress, setActiveAddressId, saveDefaultAddressOnCreateOrder } = ApiAction;

const Checkout = React.createClass({
  propTypes: {
    activeAddressId: PropTypes.number,
    addresses: PropTypes.object,
    isEditMode: PropTypes.bool,
    isNewAddress: PropTypes.bool,
    inipay: PropTypes.func.isRequired,
    loadOrder: PropTypes.func.isRequired,
    loadAddresses: PropTypes.func.isRequired,
    order: PropTypes.object,
    orderId: PropTypes.string.isRequired,
    saveOrderAddress: PropTypes.func.isRequired,
    saveDefaultAddressOnCreateOrder: PropTypes.func,
    checkoutNewAddress: PropTypes.func,
    checkoutToggleEditAddress: PropTypes.func,
    saveAddressAndThen: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  mixins: [ReactScriptLoaderMixin],
  getDefaultProps() {
    return {};
  },
  getInitialState() {
    return { scriptLoaded: false };
  },
  componentDidMount() {
    const promises = [];
    promises.push(this.props.loadOrder(this.props.orderId));
    promises.push(this.props.loadAddresses());
    Promise.all(promises).then((res) => {
      const order = res[0];
      const addresses = res[1].addresses || [];
      let activeAddressExist = false;
      addresses.forEach((address) => {
        if (address.id === this.props.activeAddressId) {
          activeAddressExist = true;
        }
      });
      if (!activeAddressExist) {
        this.props.checkoutNewAddress();
      }
      this.props.saveDefaultAddressOnCreateOrder(order, addresses);
    });
  },
  onScriptError() {
    // Show the user an error message.
  },
  onScriptLoaded() {
    this.setState({ scriptLoaded: true });
  },
  getScriptURL() {
    if (process.env.NODE_ENV === 'production') {
      return 'https://stdpay.inicis.com/stdjs/INIStdPay.js';
    }
    return 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js';
  },
  doCheckout(orderId, method, paymentInfo) {
    function upperFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const inipayMethod = method === 'VBank' || method === 'Card' ? 'web' : 'global';
    this.props.inipay(orderId, inipayMethod).then((res) => {
      paymentInfo.mid.value = res.mid;
      paymentInfo.oid.value = res.oid;
      paymentInfo.price.value = res.price;
      paymentInfo.buyeremail.value = res.buyeremail;
      paymentInfo.buyername.value = res.buyername;
      paymentInfo.buyertel.value = res.buyertel;
      paymentInfo.timestamp.value = res.timestamp;
      if (inipayMethod === 'global') {
        // FIXME: we don't have english buyer name.
        paymentInfo.buyername.value = 'linkshops';
        paymentInfo.goods.value = 'clothing';
        paymentInfo.webordernumber.value = res.oid;
        paymentInfo.reqtype.value = res.reqtype;
        paymentInfo.hashdata.value = res.hashdata;
        paymentInfo.returnurl.value = res.returnUrl;
        paymentInfo.notiurl.value = res.notiUrl;
        paymentInfo.checkoutForm.action = `https://inilite.inicis.com/inipayStd${upperFirst(method)}`;
        paymentInfo.checkoutForm.submit();
      } else {
        paymentInfo.signature.value = res.signature;
        paymentInfo.returnUrl.value = res.returnUrl;
        paymentInfo.mKey.value = res.mKey;
        INIStdPay.pay('checkout');
      }
    });
  },
  render() {
    if (!this.props.order) {
      return (<div>Loading...</div>);
    }
    const { order, addresses, isEditMode, isNewAddress, activeAddressId,
      checkoutToggleEditAddress, saveAddressAndThen } = this.props;

    let addressForEdit = { detail: {} };
    if (isEditMode && !isNewAddress && addresses[activeAddressId]) {
      addressForEdit = addresses[activeAddressId];
    }

    const editAddress = (address) => {
      if (address.id !== activeAddressId) {
        window.alert('code error');
        return;
      }
      checkoutToggleEditAddress();
    };

    const cancelEditAddress = () => {
      if (Object.keys(addresses).length < 1) {
        // must be create address
        return;
      }
      checkoutToggleEditAddress();
    };

    return (
      <CheckoutPage
        {...this.props}
        doCheckout={this.doCheckout}
        addressForEdit={addressForEdit}
        cancelEditAddress={cancelEditAddress}
        editAddress={editAddress}
        submitAddress={(address) => saveAddressAndThen(order, address)}
        deleteAddress={this.context.ApiAction.deleteAddress}
      />
    );
  },
});

export default connect(
  (state, ownProps) => ({
    orderId: ownProps.params.orderId,
    order: state.entities.orders[ownProps.params.orderId],
    activeAddressId: state.auth.addressId,
    addresses: state.entities.addresses,
    isEditMode: state.page.pageCheckout.isEditMode,
    isNewAddress: state.page.pageCheckout.isNewAddress,
  }),
  { inipay, loadOrder, loadAddresses, saveOrderAddress, setActiveAddressId,
    saveDefaultAddressOnCreateOrder, checkoutNewAddress, checkoutToggleEditAddress, saveAddressAndThen }
)(Checkout);
