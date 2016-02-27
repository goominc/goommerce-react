import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import OrderPage from '../components/OrderPage';

import { ApiAction } from '../redux/actions';
//const { loadCart, updateCartProduct, deleteCartProduct, createOrder } = ApiAction;


const Cart = React.createClass({
  /* propTypes: {
    cart: PropTypes.object,
    loadCart: PropTypes.func.isRequired,
    updateCartProduct: PropTypes.func.isRequired,
    deleteCartProduct: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
  },*/

  render() {
    //const { cart } = this.props;
    return (
        <OrderPage />
      );
  },
});

export default connect(
  (state) => ({ cart: state.cart }),
  { }
)(Cart);
