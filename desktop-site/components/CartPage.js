import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import SellerBox from 'components/CartSellerBox';

export default React.createClass({
  propTypes: {
    cart: PropTypes.object,
    buy: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { cart, buy } = this.props;
    const { activeCurrency } = this.context;
    const variants = cart.productVariants || [];
    const total = cart.total || {};

    function buyAll() {
      buy(variants);
    }
    function renderBuyAllButton() {
      if (variants.length > 0) {
        return (
          <button className="cart-buyall-button" onClick={buyAll}>Buy All</button>
        );
      }
      return '';
    }
    return (
      <div className="container">
        <div className="cart-title-box">
          Your Cart
        </div>
        <div className="cart-top-box">
          <Link to="/products">
            <span className="cart-continue-shopping-arrow"></span>
            <span className="cart-continue-shopping-text">Continue Shopping</span>
          </Link>
        </div>
        <SellerBox {...this.props} productVariants={variants} canChangeQuantity>
          <div className="cart-seller-bottom">
            <div className="cart-total-price-box">
              Total: <b>{activeCurrency} {total[activeCurrency]}</b>
            </div>
            {renderBuyAllButton()}
          </div>
        </SellerBox>
      </div>
    );
  },
});
