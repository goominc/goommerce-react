// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import numberUtil from 'commons/utils/numberUtil';
import orderUtil from 'commons/utils/orderUtil';

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
            주문하기
          </div>
        );
      }
      return null;
    };

    const formatPrice = numberUtil.formatPrice(total[activeCurrency], activeCurrency, currencySign);
    return (
      <div className="cart-conatiner">
        <div className="cart-title-box">
          <i className="icon-cart"></i> <span>장바구니</span>
        </div>
        <CartProduct {...this.props} brands={cart.brands} canUpdate />
        <div className="cart-payment-container">
          <div className="title">결제 정보</div>
          <div className="row">
            <div className="label">상품금액</div>
            <div className="control">{formatPrice}</div>
          </div>
          <div className="row">
            <div className="label">부가세</div>
            <div className="control">{numberUtil.formatPrice(total[activeCurrency] / 10, activeCurrency, currencySign)}</div>
          </div>
          <div className="row">
            <div className="label">배송비</div>
            <div className="control">0</div>
          </div>
          <div className="total-row">
            <div className="label">결제금액</div>
            <div className="control">{formatPrice}</div>
          </div>
          {renderBuyButton()}
        </div>
      </div>
    );
  },
});
