import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CartPage from 'components/CartPage';

import { ApiAction } from 'redux/actions';
const { loadCart, updateCartProduct, deleteCartProduct, createOrder } = ApiAction;

const Cart = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    loadCart: PropTypes.func.isRequired,
    updateCartProduct: PropTypes.func.isRequired,
    deleteCartProduct: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.props.loadCart();
  },
  render() {
    const { router } = this.context;
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
        (order) => router.push(`/orders/${order.id}/checkout`)
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
