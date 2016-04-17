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
  doCheckout(orderId, paymentInfo) {
    this.props.inipay(orderId).then((res) => {
      paymentInfo.mid.value = res.mid;
      paymentInfo.oid.value = res.oid;
      paymentInfo.price.value = res.price;
      paymentInfo.buyeremail.value = res.buyeremail;
      paymentInfo.timestamp.value = res.timestamp;
      paymentInfo.signature.value = res.signature;
      paymentInfo.returnUrl.value = res.returnUrl;
      paymentInfo.mKey.value = res.mKey;
      INIStdPay.pay('checkout');
    });
  },
  render() {
    if (!this.props.order) {
      return (<div>Loading...</div>);
    }
    const fields = [
      { key: 'detail.alias', objKey: 'alias', text: '별명' },
      { key: 'detail.name', objKey: 'name', text: '받는 분' },
      { key: 'detail.tel', objKey: 'tel', text: '연락처' },
      { key: 'detail.postalCode', objKey: 'postalCode', text: '우편 번호' },
      { key: 'detail.address.base', objKey: 'address1', text: '주소' },
      { key: 'detail.address.detail', objKey: 'address2', text: '상세 주소' },
    ];
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
        addressFields={fields}
        cancelEditAddress={cancelEditAddress}
        editAddress={editAddress}
        submitAddress={(address) => saveAddressAndThen(order, address)}
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
