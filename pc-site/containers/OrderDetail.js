import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';

import { loadOrder } from '../redux/actions';

const OrderDetail = React.createClass({
  propTypes: {
    orderId: PropTypes.string.isRequired,
    order: PropTypes.object,
    loadOrder: PropTypes.func.isRequired,
  },
  mixins: [History],
  componentDidMount() {
    const { orderId } = this.props;
    this.props.loadOrder(orderId);
  },
  renderVariant(variant) {
    return (
      <li key={variant.sku}>
        {variant.sku}, {variant.count}, KRW {variant.total.KRW}
      </li>
    );
  },
  render() {
    const { order } = this.props;
    if (!order) {
      return (<div></div>);
    }
    const variants = order.productVariants || [];
    return (
      <div className="row">
        <ul>
          {variants.map(this.renderVariant)}
        </ul>
        <div>Total: KRW {order.total.KRW}</div>
        <div>Status: {order.paymentStatus}</div>
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    orderId: ownProps.params.orderId,
    order: state.entities.orders[ownProps.params.orderId],
  }),
  { loadOrder }
)(OrderDetail);
