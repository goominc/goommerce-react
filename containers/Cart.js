import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';

import { loadCart, updateCartProduct, deleteCartProduct, createOrder } from '../redux/actions';

const Cart = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    loadCart: PropTypes.func.isRequired,
    updateCartProduct: PropTypes.func.isRequired,
    deleteCartProduct: PropTypes.func.isRequired,
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
    function updateCount(e) {
      this.props.updateCartProduct(variant.id, e.target.value);
    }
    function remove() {
      this.props.deleteCartProduct(variant.id);
    }
    function buy() {
      this.props.createOrder({
        productVariants: [{ id: variant.id, count: variant.count }],
      }).then(
        (order) => this.history.pushState(null, `/orders/${order.id}/checkout`)
      );
    }
    return (
      <li key={variant.sku}>
        {variant.sku},
        KRW {variant.price.KRW}
        <input type="number" name="quantity" min="1" max="100" onChange={updateCount.bind(this)} defaultValue={variant.count}/>
        <button onClick={remove.bind(this)}>Remove</button>
        <button onClick={buy.bind(this)}>Buy this item</button>
      </li>
    );
  },
  render() {
    const { cart } = this.props;
    const variants = cart.productVariants || [];
    return (
      <div className="container">
        <div className="cart-title-box">
          Your Cart
        </div>
        <div className="cart-top-box">
          <a><span className="cart-continue-shopping-arrow"></span> <span className="cart-continue-shopping-text">Continue Shopping</span></a>
        </div>
        <div className="cart-seller-box">
          Seller:
        </div>
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
  { loadCart, updateCartProduct, deleteCartProduct, createOrder }
)(Cart);
