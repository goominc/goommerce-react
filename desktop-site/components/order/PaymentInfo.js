// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Decimal from 'decimal.js-light';

import brandUtil from 'commons/utils/brandUtil';
import numberUtil from 'commons/utils/numberUtil';
import i18n from 'commons/utils/i18n';

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
    const getPrice = (type) => order[`${type}${activeCurrency}`];
    const formatPrice = (type) => {
      return numberUtil.formatPrice(getPrice(type), activeCurrency, currencySign);
    };
    const sum = (types) => {
      let ret = new Decimal(0);
      types.forEach((type) => (ret = ret.add(order[`${type}${activeCurrency}`] || 0)));
      return ret.toNumber();
    };
    const orderPrice = numberUtil.formatPrice(
      sum(['tax', 'handlingFee', 'shippingCost']), activeCurrency, currencySign);
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
    const renderFinalPrice = () => {
      if (order.finalTotalKRW) {
        const totalGap = new Decimal(getPrice('finalTotal')).sub(getPrice('total')).toNumber();
        if (totalGap === 0) {
          return (
            <div className="cell content-cell">
              <div className="final-price-line">
                <div className="left">최종금액</div>
                <div className="right">{totalPrice}</div>
              </div>
            </div>
          );
        }
        const priceGap = new Decimal(sum(['finalTax', 'finalHandlingFee', 'finalSubtotal']))
          .sub(sum(['tax', 'handlingFee', 'subtotal'])).toNumber();
        const shippingCostGap = new Decimal(getPrice('finalShippingCost')).sub(getPrice('shippingCost')).toNumber();
        const sign = (v) => (v < 0 ? '-' : '');
        const formatGap = (gap) => (gap === 0 ? 0 : `${sign(gap)}${numberUtil.formatPrice(Math.abs(gap), activeCurrency, currencySign)}`);
        return (
          <div className="cell" style={({ paddingBottom: '40px' })}>
            <div className="sub-title-line">
              <div className="left">환불금액</div>
              <div className="right">{formatGap(totalGap)}</div>
            </div>
            <div className="content-refund-cell">
              <div className="left">-</div>
              <div className="right">주문조정: {formatGap(priceGap)}</div>
              <div className="left">-</div>
              <div className="right">배송차액: {formatGap(shippingCostGap)}</div>
            </div>
            <div className="final-price-line">
              <div className="left">최종금액</div>
              <div className="right">{formatPrice('finalTotal')}</div>
            </div>
          </div>
        );
      }
      return (
        <div className="cell content-cell">
          <div className="final-price-line">
            <div className="left">{i18n.get('pcMypage.paymentTotal')}</div>
            <div className="right">{totalPrice}</div>
          </div>
        </div>
      );
    };
    return (
      <div className="payment-info-container">
        <div className="row">
          <div className="cell title-cell">
            <div className="title">{i18n.get('pcMypage.productPrice')}</div>
            <div className="price">{subtotalPrice}</div>
          </div>
          <div className="cell title-cell">
            <div className="title">{i18n.get('pcMypage.productPrice')}</div>
            <div className="price">{orderPrice}</div>
          </div>
          <div className="cell title-cell">
            <div className="title">{i18n.get('pcMypage.promotions')}</div>
            <div className="price">{adjustmentPrice}</div>
          </div>
          <div className="cell title-cell">
            <div className="title">{i18n.get('pcMypage.paymentTotal')}</div>
            <div className="price">{order.paymentStatus === 200 ? 0 : totalPrice}</div>
          </div>
        </div>
        <div className="row">
          <div className="cell content-cell">
            <div className="left">+</div>
            <div className="right">{i18n.get('pcMypage.productPrice')} : {subtotalPrice}</div>
          </div>
          <div className="cell content-cell">
            <div className="left">+</div>
            <div className="right">{i18n.get('word.tax')} (10%) : {taxPrice}</div>
            <div className="left">+</div>
            <div className="right">{i18n.get('word.handlingFee')} (3.3%) : {handlingFeePrice}</div>
            <div className="left">+</div>
            <div className="right">{i18n.get('word.shippingCost')} : {shippingCostPrice}</div>
          </div>
          <div className="cell content-cell">
            {_.get(order, 'adjustments', []).map(renderAdjustment)}
          </div>
          {renderFinalPrice()}
        </div>
      </div>
    );
  },
});
