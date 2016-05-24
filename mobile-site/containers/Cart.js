import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CartPage from 'components/CartPage';

import { ApiAction, setHeader } from 'redux/actions';
const { loadCart, updateCartProduct, deleteCartProduct, createOrder } = ApiAction;

const Cart = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    setHeader: PropTypes.func.isRequired,
    loadCart: PropTypes.func.isRequired,
    updateCartProduct: PropTypes.func.isRequired,
    deleteCartProduct: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return { checkBuy: false };
  },
  componentDidMount() {
    this.props.setHeader(false, true, false, '장바구니');
    this.props.loadCart();
  },
  wrapOrder(productVariants) {
    this.props.createOrder({
      productVariants: productVariants.map((variant) => ({ id: variant.id, count: variant.count })),
    }).then((order) => this.context.router.push(`/orders/${order.id}`));
  },
  render() {
    const { cart } = this.props;
    return (
      <CartPage cart={cart}
        updateCartProduct={this.props.updateCartProduct} deleteCartProduct={this.props.deleteCartProduct}
        createOrder={this.wrapOrder} checkBuy={this.state.checkBuy}
        toggleBuy={() => this.setState({ checkBuy: !this.state.checkBuy })}
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
  },
  { setHeader, loadCart, updateCartProduct, deleteCartProduct, createOrder }
)(Cart);
