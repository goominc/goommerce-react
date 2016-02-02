import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ReactScriptLoaderMixin } from 'react-script-loader';

import { inipay, loadOrder } from '../redux/actions';

import CheckoutPage from '../components/CheckoutPage';

const Checkout = React.createClass({
  propTypes: {
    orderId: PropTypes.string.isRequired,
    order: PropTypes.object,
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
  checkout(orderId) {
    this.props.inipay(orderId).then(res => {
      this.refs.mid.value = res.mid;
      this.refs.oid.value = res.oid;
      this.refs.price.value = res.price;
      this.refs.timestamp.value = res.timestamp;
      this.refs.signature.value = res.signature;
      this.refs.returnUrl.value = res.returnUrl;
      this.refs.mKey.value = res.mKey;
      INIStdPay.pay('checkout');
    });
  },
  render() {
    return (
      <CheckoutPage {...this.props} checkout={this.checkout} />
    );
  },
});

export default connect(
  (state, ownProps) => ({
    orderId: ownProps.params.orderId,
    order: state.entities.orders[ownProps.params.orderId],
  }),
  { inipay, loadOrder }
)(Checkout);
