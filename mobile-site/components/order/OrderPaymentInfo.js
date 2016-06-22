import React, { PropTypes } from 'react';
import i18n from 'commons/utils/i18n';

import { formatPrice } from 'commons/utils/numberUtil';
import { formatPriceGapFix } from 'commons/utils/orderUtil';

export default React.createClass({
  propTypes: {
    order: PropTypes.object.isRequired,
    activeCurrency: PropTypes.string.isRequired,
    currencySign: PropTypes.object.isRequired,
  },
  render() {
    const { order, activeCurrency, currencySign } = this.props;
    const finalTotal = formatPrice(order[`finalTotal${activeCurrency}`], activeCurrency, currencySign);
    const total = formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign);
    return (
      <div className="myorder-box">
        <div className="box-header">
          {i18n.get('pcPayment.paymentInfo')}
        </div>
        <div className="box-detail">
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcPayment.subtotal')}</span>
              <span className="cost">
                { formatPrice(order[`subtotal${activeCurrency}`], activeCurrency, currencySign)}
              </span>
          </div>
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcPayment.tax')}</span>
              <span className="cost">
                { formatPrice(order[`tax${activeCurrency}`], activeCurrency, currencySign)}
              </span>
          </div>
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcPayment.handlingFee')}</span>
              <span className="cost">
                { formatPrice(order[`handlingFee${activeCurrency}`], activeCurrency, currencySign)}
              </span>
          </div>
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcPayment.shippingCost')}</span>
              <span className="cost">
                { formatPrice(order[`shippingCost${activeCurrency}`], activeCurrency, currencySign)}
              </span>
          </div>
          <div className="order-price-black">
            <span className="checkout-item">배송비할인</span>
              <span className="cost">
                { formatPriceGapFix(order, 'shippingCost', activeCurrency, currencySign) }
              </span>
          </div>
          <hr className="line-dash" />
          <div className="order-price-black"><strong>
            <span className="checkout-item">{i18n.get('pcPayment.totalPrice')}</span>
              <span className="cost">
                { formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign) }
              </span></strong>
          </div>
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcMypage.refundPrice')}</span>
              <span className="cost">
                { formatPriceGapFix(order, 'total', activeCurrency, currencySign) }
              </span>
          </div>
          <div className="order-price-gray">
            <span className="checkout-item">∟ {i18n.get('pcMypage.productPrice')}</span>
              <span className="cost">
                { formatPriceGapFix(order, 'subtotal', activeCurrency, currencySign)}
              </span>
          </div>
          <div className="order-price-gray">
            <span className="checkout-item">∟ {i18n.get('pcPayment.tax')}</span>
              <span className="cost">
                { formatPriceGapFix(order, 'tax', activeCurrency, currencySign)}
              </span>
          </div>
          <div className="order-price-gray">
            <span className="checkout-item">∟ {i18n.get('pcPayment.handlingFee')}</span>
              <span className="cost">
                { formatPriceGapFix(order, 'handlingFee', activeCurrency, currencySign)}
              </span>
          </div>
          <div className="order-price-gray">
            <span className="checkout-item">∟ {i18n.get('pcMypage.shippingCostGap')}</span>
              <span className="cost">
                { formatPriceGapFix(order, 'shippingCost', activeCurrency, currencySign)}
              </span>
          </div>
          <div className="order-price-red">
            <span className="checkout-item"><strong>최종 결제금액</strong></span>
              <span className="cost"><strong>
                { !finalTotal ? total : finalTotal }
              </strong></span>
          </div>
        </div>
      </div>
    );
  },
});