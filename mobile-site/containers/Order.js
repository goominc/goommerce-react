import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import OrderPage from 'components/OrderPage';

import { ApiAction, setHeader } from 'redux/actions';
const { loadOrder } = ApiAction;

const Order = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    setHeader: PropTypes.func.isRequired,
    loadOrder: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.setHeader(false, false, false, 'Place Order');
    const { orderId } = this.props.params;
    this.props.loadOrder(orderId);
  },
  render() {
    const { order } = this.props;
    return (
        <OrderPage order={order} />
      );
  },
});

export default connect(
  (state, ownProps) => ({
    order: state.entities.orders[ownProps.params.orderId],
  }),
  { loadOrder, setHeader }
)(Order);
