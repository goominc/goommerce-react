import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';

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

  render() {
    const { cart } = this.props;
    return (
      <CartPage cart={cart}/>
      );
  },
});

export default connect(
  (state) => ({ cart: state.cart }),
  { loadCart, updateCartProduct, deleteCartProduct, createOrder }
)(Cart);
