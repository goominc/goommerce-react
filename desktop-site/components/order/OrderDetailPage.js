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
    const renderReceipt = () => {
      const payment = _.find(order.payments, { type: 0 });
      if (paymentMethod(payment) === 'CARD') {
        return (
          <form action="https://iniweb.inicis.com/app/publication/apReceipt.jsp" acceptCharset="euc-kr" target="_blank">
            <input type="hidden" name="noTid" value={payment.tid} />
            <input type="hidden" name="noMethod" value="1" />
            <input type="hidden" name="clpaymethod" value="0" />
            <input type="hidden" name="rt" value="1" />
            <input type="hidden" name="valFlg" value="1" />
            <input type="hidden" name="nmBuyer" value={payment.data.P_UNAME || payment.data.buyerName} />
            <input type="hidden" name="prGoods" value={payment.data.P_AMT || payment.data.TotPrice} />
            <button><i className="icon-print"></i> {i18n.get('pcMypage.printOrder')}</button>
          </form>
        );
      }
      if (paymentMethod(payment) === 'VBANK') {
        const parent = getParent(payment);
        return (
          <form action="https://iniweb.inicis.com/app/publication/apCashReceipt.jsp" acceptCharset="euc-kr" target="_blank">
            <input type="hidden" name="noTid" value={_.get(parent, 'tid', payment.tid)} />
            <input type="hidden" name="noMethod" value="1" />
            <input type="hidden" name="clpaymethod" value="22" />
            <input type="hidden" name="rt" value="1" />
            <input type="hidden" name="valFlg" value="1" />
            <input type="hidden" name="nmBuyer" value={_.get(parent, 'data.buyerName', payment.data.P_UNAME)} />
            <input type="hidden" name="prGoods" value={_.get(parent, 'data.TotPrice', payment.data.P_AMT)} />
            <button><i className="icon-print"></i> {i18n.get('pcMypage.printOrder')}</button>
          </form>
        );
      }
      return null;
    };
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
          <div className="item">{renderReceipt()}</div>
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
