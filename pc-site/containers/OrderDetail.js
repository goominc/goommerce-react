import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CheckoutPage from '../components/CheckoutPage';

import { ApiAction, setCheckoutStep } from '../redux/actions';
const { loadOrder } = ApiAction;

const OrderDetail = React.createClass({
  propTypes: {
    orderId: PropTypes.string.isRequired,
    order: PropTypes.object,
    checkout: PropTypes.object,
    loadOrder: PropTypes.func.isRequired,
    setCheckoutStep: PropTypes.func,
  },
  componentDidMount() {
    const { orderId } = this.props;
    this.props.loadOrder(orderId);
    if (this.props.checkout.step !== 3) {
      this.props.setCheckoutStep(3);
    }
  },
  render() {
    const { order } = this.props;
    if (!order) {
      return (<div></div>);
    }
    const handleCheckoutStep = () => {
      // ignore since all step is done.
    };
    return (
      <CheckoutPage {...this.props} setCheckoutStep={handleCheckoutStep} />
    );
  },
});

export default connect(
  (state, ownProps) => ({
    orderId: ownProps.params.orderId,
    order: state.entities.orders[ownProps.params.orderId],
    checkout: state.checkout,
  }),
  { loadOrder, setCheckoutStep }
)(OrderDetail);
