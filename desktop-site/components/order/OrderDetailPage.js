// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import OrderProduct from 'components/order/OrderProduct';
import orderUtil from 'commons/utils/orderUtil';
import numberUtil from 'commons/utils/numberUtil';
import i18n from 'commons/utils/i18n';
import { paymentMethod, getParent } from 'commons/utils/inipay';

import AddressInfo from './AddressInfo';
import PaymentInfo from './PaymentInfo';
import PrintOrderReceiptButton from 'components/snippet/PrintOrderReceiptButton';

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
    if (!order) {
      return null;
    }
    const brands = orderUtil.collectByBrands(order.orderProducts);
    const renderSummaryPaymentInfo = () => {
      const vbankPayment = _.find(order.payments, (p) => p.type === 3 && p.status === 2 && p.data.payMethod === 'VBank');
      if (order.paymentStatus === 200 && vbankPayment) {
        return (
          <div className="lower-line">
            <span className="left">
              <div className="vbank">
                {i18n.get('pcOrder.vbankBankTitle')}
                : <strong>{vbankPayment.data.vactBankName}</strong>
              </div>
              <div className="vbank">
                {i18n.get('pcOrder.vbankAccountNumberTitle')}
                : <strong>{vbankPayment.data.VACT_Num}</strong>
              </div>
              <div className="vbank">
                {i18n.get('pcOrder.vbankAccountHolderTitle')}
                  : <strong>{vbankPayment.data.VACT_Name}</strong>
              </div>
              <div className="vbank">
                {i18n.get('pcOrder.vbankSenderTitle')}
                : <strong>{vbankPayment.data.VACT_InputName}</strong>
              </div>
            </span>
            <span className="right">
              <span className="content">{i18n.get('pcOrder.vbankPaymentPriceTitle')}</span>
              <strong className="content price">{numberUtil.format(_.get(vbankPayment, 'data.TotPrice'))}원</strong>
            </span>
          </div>
        );
      }
      const renderRightPrice = () => {
        if (order.finalTotalKRW) {
          return (
            <span className="right">
              <span className="content">{i18n.get('pcPayment.totalPrice')}</span>
              <span className="content">{numberUtil.formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign)}</span><br />
              {order.finalTotalKRW === order.totalKRW ? null
              : <div>
                  <span className="content">{i18n.get('pcMypage.refundPrice')}</span>
                  <span className="content">{orderUtil.formatPriceGap(order, 'total', activeCurrency, currencySign)}</span>
                </div>
              }
              <strong className="content">{i18n.get('pcPayment.finalTotalPrice')}</strong>
              <strong className="content price">{numberUtil.formatPrice(order[`finalTotal${activeCurrency}`], activeCurrency, currencySign)}</strong>
            </span>
          );
        }
        return (
          <span className="right">
            <span className="content">{i18n.get('pcPayment.totalPrice')}</span>
            <span className="content">{numberUtil.formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign)}</span><br />
          </span>
        );
      };
      return (
        <div className="lower-line">
          <span className="left">
            {i18n.get('pcPayment.paymentMethod')}: {orderUtil.getPaymentMethodType(order)}
          </span>
          {renderRightPrice()}
        </div>
      );
    };
    return (
      <div className="order-detail-container">
        <div className="top-action-line">
          <div className="item">
            <PrintOrderReceiptButton order={order} />
          </div>
        </div>
        <div className="order-detail-summary-box">
          <div className="upper-line">
            <span className="date">{numberUtil.formatDate(order.orderedAt || order.createdAt, true)}</span>
            <span className="order-number">{i18n.get('pcMypage.orderNumber')}:{order.id}</span>
            <span className="status">{orderUtil.getOrderStatus(order)}</span>
          </div>
          {renderSummaryPaymentInfo()}
        </div>
        <div className="title">{i18n.get('pcMypage.myOrders')}</div>
        <OrderProduct brands={brands} {...this.props} />
        <div style={({ height: '30px' })}></div>
        <div className="title">{i18n.get('pcMypage.payment')}</div>
        <PaymentInfo order={order} />
        <div className="title">{i18n.get('pcMypage.shipTo')}</div>
        <AddressInfo order={order} />
        <Link to="/mypage/my_orders"><div className="go-order-list-button">{i18n.get('pcMypage.orderList')}</div></Link>
      </div>
    );
  },
});
