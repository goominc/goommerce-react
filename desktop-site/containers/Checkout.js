import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ReactScriptLoaderMixin } from 'react-script-loader';

import CheckoutPage from 'components/checkout/CheckoutPage';

import { ApiAction } from 'redux/actions';
const { inipay, loadOrder, loadAddresses, saveAddress, setActiveAddress } = ApiAction;
const _ = require('lodash');

const Checkout = React.createClass({
  propTypes: {
    activeAddress: PropTypes.object,
    addresses: PropTypes.object,
    inipay: PropTypes.func.isRequired,
    loadOrder: PropTypes.func.isRequired,
    loadAddresses: PropTypes.func.isRequired,
    order: PropTypes.object,
    orderId: PropTypes.string.isRequired,
    saveAddress: PropTypes.func.isRequired,
    setActiveAddress: PropTypes.func.isRequired,
    step: PropTypes.string,
  },
  mixins: [ReactScriptLoaderMixin],
  getDefaultProps() {
    return { step: 'review' };
  },
  getInitialState() {
    return { scriptLoaded: false };
  },
  componentDidMount() {
    this.props.loadOrder(this.props.orderId);
    this.props.loadAddresses();
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
      { key: 'detail.name', text: 'Contact Name' },
      { key: 'countryCode', text: 'Country/Region' },
      { key: 'detail.streetAddress', text: 'Street Address' },
      { key: 'detail.city', text: 'City' },
      { key: 'detail.postalCode', text: 'Zip/Postal Code' },
      { key: 'detail.tel', text: 'Tel' },
    ];
    const { addresses } = this.props;
    let { activeAddress } = this.props;
    if (!activeAddress) {
      if (addresses && Object.keys(addresses).length > 0) {
        activeAddress = addresses[Object.keys(addresses)[0]];
      } else {
        activeAddress = { detail: {} };
        fields.forEach((field) => _.set(activeAddress, field.key, ''));
      }
    }
    return (
      <CheckoutPage {...this.props}
        doCheckout={this.doCheckout}
        activeAddress={activeAddress}
        addressFields={fields}
      />
    );
  },
});

export default connect(
  (state, ownProps) => ({
    orderId: ownProps.params.orderId,
    step: ownProps.params.step,
    order: state.entities.orders[ownProps.params.orderId],
    activeAddress: state.entities.addresses[state.settings.activeAddressId] || null,
    addresses: state.entities.addresses,
  }),
  { inipay, loadOrder, loadAddresses, saveAddress, setActiveAddress }
)(Checkout);
