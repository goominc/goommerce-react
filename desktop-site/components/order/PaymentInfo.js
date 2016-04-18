// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import numberUtil from 'commons/utils/numberUtil';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    const { activeCurrency, currencySign } = this.context;
    const formatPrice = (type) => {
      return numberUtil.formatPrice(order[`${type}${activeCurrency}`], activeCurrency, currencySign);
    };
    console.log(order);
    const orderPrice = numberUtil.formatPrice(
      +(order[`tax${activeCurrency}`] || 0) + +(order[`handlingFee${activeCurrency}`] || 0) + +(order[`shippingCost${activeCurrency}`] || 0),
      activeCurrency,
      currencySign,
    );
    const subtotalPrice = formatPrice('subtotal');
    const taxPrice = formatPrice('tax');
    const handlingFeePrice = formatPrice('handlingFee');
    const shippingCostPrice = formatPrice('shippingCost');
    const totalPrice = formatPrice('total');
    return (
      <div className="payment-info-container">
        <div className="row">
          <div className="cell title-cell">
            <div className="title">상품금액</div>
            <div className="price">{subtotalPrice}</div>
          </div>
          <div className="cell title-cell">
            <div className="title">주문비용</div>
            <div className="price">{orderPrice}</div>
          </div>
          <div className="cell title-cell">
            <div className="title">기타</div>
            <div className="price">0</div>
          </div>
          <div className="cell title-cell">
            <div className="title">결제금액</div>
            <div className="price">{totalPrice}</div>
          </div>
        </div>
        <div className="row">
          <div className="cell content-cell">
            <div className="left">+</div>
            <div className="right">상품가격: {subtotalPrice}</div>
          </div>
          <div className="cell content-cell">
            <div className="left">+</div>
            <div className="right">사입비: {handlingFeePrice}</div>
            <div className="left">+</div>
            <div className="right">배송비: {shippingCostPrice}</div>
            <div className="left">+</div>
            <div className="right">부가세: {taxPrice}</div>
          </div>
          <div className="cell content-cell">
          </div>
          <div className="cell content-cell">
            <div className="left">=</div>
            <div className="right">{totalPrice}</div>
          </div>
        </div>
      </div>
    );
  },
});