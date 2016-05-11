// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import brandUtil from 'commons/utils/brandUtil';
import numberUtil from 'commons/utils/numberUtil';
import orderUtil from 'commons/utils/orderUtil';

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
    const orderPrice = numberUtil.formatPrice(
      +(order[`tax${activeCurrency}`] || 0) + +(order[`handlingFee${activeCurrency}`] || 0) + +(order[`shippingCost${activeCurrency}`] || 0),
      activeCurrency,
      currencySign,
    );
    const renderAdjustment = (adjustment) =>
    (
      <div key={adjustment.id}>
        <div className="left">+</div>
        <div className="right">{brandUtil.getName(adjustment.brand)}: {numberUtil.formatPrice(adjustment[activeCurrency], activeCurrency, currencySign)}</div>
      </div>
    );
    const subtotalPrice = formatPrice('subtotal');
    const adjustmentPrice = formatPrice('adjustmentTotal');
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
            <div className="price">{adjustmentPrice}</div>
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
            <div className="right">부가세(10%): {taxPrice}</div>
            <div className="left">+</div>
            <div className="right">사입비(3.3%): {handlingFeePrice}</div>
            <div className="left">+</div>
            <div className="right">배송비: {shippingCostPrice}</div>
          </div>
          <div className="cell content-cell">
            {_.get(order, 'adjustments', []).map(renderAdjustment)}
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
