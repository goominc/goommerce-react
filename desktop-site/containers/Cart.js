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
      if (!productVariants instanceof Array) {
        productVariants = [productVariants];
      }
      createOrder({
        productVariants: productVariants.map((variant) => ({ id: variant.productVariant.id, count: variant.count })),
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
  (state) => ({ cart: state.cart })
)(Cart);
