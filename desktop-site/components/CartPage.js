// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import numberUtil from 'commons/utils/numberUtil';
import orderUtil from 'commons/utils/orderUtil';
import i18n from 'commons/utils/i18n';

import CartProduct from './CartProduct';

export default React.createClass({
  propTypes: {
    buy: PropTypes.func,
    cart: PropTypes.object,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { cart, buy } = this.props;
    const { activeCurrency, currencySign } = this.context;
    const variants = orderUtil.getProductVariantsFromCart(cart);
    const total = cart.total || {};

    function buyAll() {
      buy(variants);
    }

    const renderBuyButton = () => {
      if (cart.brands && cart.brands.length) {
        return (
          <div className="cart-button-order" onClick={buyAll}>
            {i18n.get('pcCart.checkout')}
          </div>
        );
      }
      return null;
    };

    const formatPrice = numberUtil.formatPrice(total[activeCurrency] || 0, activeCurrency, currencySign);
    return (
      <div className="cart-container">
        <div className="cart-title-box">
          <i className="icon-cart"></i> <span>{i18n.get('pcCart.cart')}</span>
        </div>
        <CartProduct {...this.props} brands={cart.brands} canUpdate />
        <div className="cart-payment-container">
          <div className="title">{i18n.get('pcCart.total')}</div>
          <div className="total-row">
            <div className="label">{i18n.get('pcCart.subtotal')}</div>
            <div className="control">{formatPrice}</div>
          </div>
          {renderBuyButton()}
        </div>
      </div>
    );
  },
});
