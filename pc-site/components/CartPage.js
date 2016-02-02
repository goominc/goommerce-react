import React, { PropTypes } from 'react';

import SellerBox from './CartSellerBox';

export default React.createClass({
  propTypes: {
    cart: PropTypes.object,
    buy: PropTypes.func,
  },
  render() {
    const { cart, buy } = this.props;
    function buyAll() {
      buy(variants);
    }
    function renderBuyAllButton() {
      if (variants.length >  0) {
        return (
          <button className="cart-buyall-button" onClick={buyAll}>Buy All</button>
        );
      }
    }
    const variants = cart.productVariants || [];
    let totalPrice = 0;
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      totalPrice += variant.price.KRW * variant.count;
    };
    return (
      <div className="container">
        <div className="cart-title-box">
          Your Cart
        </div>
        <div className="cart-top-box">
          <a><span className="cart-continue-shopping-arrow"></span><span className="cart-continue-shopping-text">Continue Shopping</span></a>
        </div>
        <SellerBox {...this.props}>
          <div className="cart-seller-bottom">
            <div className="cart-total-price-box">
              Total: <b>KRW {totalPrice}</b>
            </div>
            {renderBuyAllButton()}
          </div>
        </SellerBox>
      </div>
    );
  },
});
