import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';

import { loadCart, updateCartProduct, deleteCartProduct, createOrder } from '../redux/actions';

import CartPage from '../components/CartPage'

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
  render() {
    const { cart, updateCartProduct, deleteCartProduct, createOrder } = this.props;
    function updateCount(variant, value) {
      updateCartProduct(variant.id, value);
    }
    function removeProduct(variant) {
      deleteCartProduct(variant.id);
    }
    function buy(productVariants) {
      if (!productVariants instanceof Array) {
        productVariants = [productVariants];
      }
      createOrder({
        productVariants: productVariants.map((variant) => { return { id: variant.id, count: variant.count } }),
      }).then(
        (order) => this.history.pushState(null, `/orders/${order.id}/checkout`)
      );
    }
    return (
      <CartPage cart={cart}
                updateCount={updateCount}
                removeProduct={removeProduct}
                buy={buy}
      />
    );
  },
});

export default connect(
  (state) => ({ cart: state.cart }),
  { loadCart, updateCartProduct, deleteCartProduct, createOrder }
)(Cart);
