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
    const sign = (v) => (v < 0 ? '-' : '');
    const formatGap = (gap) => (gap === 0 ? 0 : `${sign(gap)}${numberUtil.formatPrice(Math.abs(gap), activeCurrency, currencySign)}`);
    const totalGap = order.finalTotalKRW ?
      new Decimal(getPrice('finalTotal')).sub(getPrice('total')).toNumber()
      : 0;
    const renderFinalPrice = () => {
      if (order.finalTotalKRW) {
        const priceGap = new Decimal(sum(['finalTax', 'finalHandlingFee', 'finalSubtotal']))
          .sub(sum(['tax', 'handlingFee', 'subtotal'])).toNumber();
        const taxGap = new Decimal(getPrice('finalTax')).sub(getPrice('tax')).toNumber();
        const handlingFeeGap = new Decimal(getPrice('finalHandlingFee')).sub(getPrice('handlingFee')).toNumber();
        const subtotalGap = new Decimal(getPrice('finalSubtotal')).sub(getPrice('subtotal')).toNumber();
        const shippingCostGap = new Decimal(getPrice('finalShippingCost')).sub(getPrice('shippingCost')).toNumber();
        return (
          <div className="cell content-cell" style={({ paddingBottom: '40px' })}>
            <div className="left">{i18n.get('pcMypage.productPrice')}: </div>
            <div className="right">{formatGap(subtotalGap)}</div>
            <div className="left">{i18n.get('pcPayment.tax')}: </div>
            <div className="right">{formatGap(taxGap)}</div>
            <div className="left">{i18n.get('pcPayment.handlingFee')}: </div>
            <div className="right">{formatGap(handlingFeeGap)}</div>
            <div className="left">{i18n.get('pcMypage.shippingCostGap')}: </div>
            <div className="right">{formatGap(shippingCostGap)}</div>
          </div>
        );
      }
      return (
        <div className="cell content-cell">
          <div className="left">{i18n.get('pcMypage.productPrice')}: </div>
          <div className="right">0</div>
          <div className="left">{i18n.get('pcPayment.tax')}: </div>
          <div className="right">0</div>
          <div className="left">{i18n.get('pcPayment.handlingFee')}: </div>
          <div className="right">0</div>
          <div className="left">{i18n.get('pcMypage.shippingCostGap')}: </div>
          <div className="right">0</div>
        </div>
      );
    };
    const renderPriceSummary = () => {
      const vbankPayment = _.find(order.payments, (p) => p.type === 3 && p.status === 2 && p.data.payMethod === 'VBank');
      if (order.paymentStatus === 200 && vbankPayment) {
        return (
          <div className="price-summary-line">
            <span>{i18n.get('pcOrder.vbankPaymentPriceTitle')}</span>
            <span className="price">{numberUtil.format(_.get(vbankPayment, 'data.TotPrice'))}원</span>
          </div>
        );
      }
      if (order.finalTotalKRW) {
        return (
          <div className="price-summary-line">
            <span>{i18n.get('pcPayment.totalPrice')}</span>
            <span>{totalPrice}</span>
            <span style={({ marginLeft: '70px' })}>{i18n.get('pcPayment.finalTotalPrice')}</span>
            <span className="price">{formatPrice('finalTotal')}</span>
          </div>
        );
      }
      return (
        <div className="price-summary-line">
          <span>{i18n.get('pcPayment.totalPrice')}</span>
          <span className="price">{totalPrice}</span>
        </div>
      );
    };
    return (
      <div className="payment-info-container">
        <div className="row">
          <div className="cell title-cell">
            <span>{i18n.get('pcMypage.productPrice')}</span>
            <div className="price">{subtotalPrice}</div>
          </div>
          <div className="cell title-cell">
            <span>{i18n.get('pcMypage.orderPrice')}</span>
            <div className="price">+{orderPrice}</div>
          </div>
          <div className="cell title-cell">
            <span>{i18n.get('pcMypage.promotions')}</span>
            <div className="price">{adjustmentPrice}</div>
          </div>
          <div className="cell title-cell">
            <span>{i18n.get('pcMypage.refundPrice')}</span>
            <div className="price">{formatGap(totalGap)}</div>
          </div>
        </div>
        <div className="row">
          <div className="cell content-cell">
            <div className="left">{i18n.get('pcMypage.productPrice')} :</div>
            <div className="right">{subtotalPrice}</div>
          </div>
          <div className="cell content-cell">
            <div className="left">{i18n.get('pcPayment.tax')} :</div>
            <div className="right">+{taxPrice}</div>
            <div className="left">{i18n.get('pcPayment.handlingFee')} :</div>
            <div className="right">+{handlingFeePrice}</div>
            <div className="left">{i18n.get('pcPayment.shippingCost')} :</div>
            <div className="right">+{shippingCostPrice}</div>
          </div>
          <div className="cell content-cell">
            {_.get(order, 'adjustments', []).map(renderAdjustment)}
          </div>
          {renderFinalPrice()}
        </div>
        {renderPriceSummary()}
      </div>
    );
  },
});
