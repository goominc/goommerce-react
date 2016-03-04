import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CartPage from 'components/CartPage';

import { ApiAction } from 'redux/actions';
const { createOrder, deleteCartProduct, loadCart, updateCartProduct } = ApiAction;

const Cart = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    createOrder: PropTypes.func.isRequired,
    deleteCartProduct: PropTypes.func.isRequired,
    loadCart: PropTypes.func.isRequired,
    updateCartProduct: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.props.loadCart();
  },
  render() {
    const { router } = this.context;
    const { cart, createOrder, deleteCartProduct, updateCartProduct } = this.props; // eslint-disable-line no-shadow
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
        productVariants: productVariants.map((variant) => ({ id: variant.id, count: variant.count })),
      }).then((order) => router.push(`/orders/${order.id}/checkout`));
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
