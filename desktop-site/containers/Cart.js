import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CartPage from 'components/CartPage';

const Cart = React.createClass({
  propTypes: {
    cart: PropTypes.object,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
    ApiAction: PropTypes.object,
  },
  componentDidMount() {
    this.context.ApiAction.loadCart();
    // this.context.ApiAction.initCartForBigBuyer();
  },
  render() {
    const { router } = this.context;
    const { cart } = this.props; // eslint-disable-line no-shadow
    const { createOrder, deleteCartProduct, updateCartProduct } = this.context.ApiAction;

    function updateCount(variant, value) {
      updateCartProduct(variant.id, value);
    }
    function removeProduct(variant) {
      deleteCartProduct(variant.id);
    }
    function buy(productVariants) {
      if (!(productVariants instanceof Array)) {
        productVariants = [productVariants];
      }
      $('.cart-button-order').prop('disabled', true);
      createOrder({
        productVariants: productVariants.map((variant) => ({ id: variant.productVariant.id, count: variant.count })),
      }).then((order) => router.push(`/orders/${order.id}/checkout`), () => {
        $('.cart-button-order').prop('disabled', false);
      });
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
  // NOTE: DO NOT CHANGE CODE:
  // using '(state) => ({ cart: state.cart })'
  // makes Cart would not be updated even though the context is changed.
  // we should investigate this more. it seems there's a bug in connect.shouldComponentUpdate().
  (state, ownProps) => {
    return { cart: state.cart };
  }
)(Cart);
