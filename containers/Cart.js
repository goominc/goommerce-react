import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';

import { loadCart, createOrder } from '../redux/actions';

const Cart = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    loadCart: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
  },
  mixins: [History],
  componentDidMount() {
    this.props.loadCart();
  },
  checkout() {
    const { cart } = this.props;
    cart.productVariants = cart.productVariants.map(v => ({ id: v.id, count: v.count }));
    this.props.createOrder(cart).then(
      (order) => this.history.pushState(null, `/orders/${order.id}/checkout`)
    );
  },
  renderVariant(variant) {
    return (
      <li key={variant.sku}>
        {variant.sku}, {variant.count}
      </li>
    );
  },
  render() {
    const { cart } = this.props;
    const variants = cart.productVariants || [];
    return (
      <div className="row">
        <ul>
          {variants.map(this.renderVariant)}
        </ul>
        <button onClick={this.checkout}>Buy All</button>
      </div>
    );
  },
});

export default connect(
  (state) => ({ cart: state.cart }),
  { loadCart, createOrder }
)(Cart);
