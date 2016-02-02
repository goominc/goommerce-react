import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ReactScriptLoaderMixin } from 'react-script-loader';

import { inipay, loadOrder, setCheckoutStep } from '../redux/actions';

import CheckoutPage from '../components/CheckoutPage';

const Checkout = React.createClass({
  propTypes: {
    orderId: PropTypes.string.isRequired,
    order: PropTypes.object,
    checkout: PropTypes.object,
    inipay: PropTypes.func.isRequired,
    loadOrder: PropTypes.func.isRequired,
  },
  mixins: [ReactScriptLoaderMixin],
  getInitialState() {
    return {
      scriptLoaded: false,
    };
  },
  componentDidMount() {
    this.props.loadOrder(this.props.orderId);
    const initial_step = 1;
    if (!this.props.checkout || this.props.checkout.step != initial_step) {
      this.props.setCheckoutStep(initial_step);
    }
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
    this.props.inipay(orderId).then(res => {
      paymentInfo.mid.value = res.mid;
      paymentInfo.oid.value = res.oid;
      paymentInfo.price.value = res.price;
      paymentInfo.timestamp.value = res.timestamp;
      paymentInfo.signature.value = res.signature;
      paymentInfo.returnUrl.value = res.returnUrl;
      paymentInfo.mKey.value = res.mKey;
      INIStdPay.pay('checkout');
    });
  },
  render() {
    const handleCheckoutStep = (step) => {
      if (step !== 3) {
        // 2016. 02. 02. [heekyu]
        this.props.setCheckoutStep(step);
      }
    };
    return (
      <CheckoutPage {...this.props} setCheckoutStep={handleCheckoutStep} doCheckout={this.doCheckout} />
    );
  },
});

export default connect(
  (state, ownProps) => ({
    orderId: ownProps.params.orderId,
    order: state.entities.orders[ownProps.params.orderId],
    checkout: state.checkout,
  }),
  { inipay, loadOrder, setCheckoutStep }
)(Checkout);
