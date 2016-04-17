// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import CartProduct from 'components/CartProduct';
import AddressInfo from './AddressInfo';
import PaymentInfo from './PaymentInfo';
import i18n from 'commons/utils/i18n';
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
  /*
  renderDone() {

    return (
      <div>
        <div>Total: KRW {order.totalKRW}</div>
        <div>Status: {i18n.get(`enum.order.status.${order.status}`)}</div>
        {this.renderVBank()}
      </div>
    );
  },
  */
  render() {
    const { order } = this.props;
    const { activeCurrency, currencySign } = this.context;
    if (!order) {
      return null;
    }
    const brands = orderUtil.collectByBrands(order.orderProducts);
    const renderField = (field) => (
      <div key={field.label} className="row">
        <div className="label">{field.label}</div>
        <div className={`control ${field.className || ''}`}>{field.value || '&'}</div>
      </div>
    );
    const renderVBank = () => {
      if (order.status === 0) {
        const payment = _.find(order.payments, (p) => p.type === 0 && p.status === 2 && p.data.payMethod === 'VBank');
        if (payment) {
          const price = numberUtil.formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign);
          const accountFields = [
            { label: '입금금액', value: price, className: 'price' },
            { label: '입금은행', value: payment.data.vactBankName },
            { label: '입금계좌번호', value: payment.data.VACT_Num },
            { label: '예금주명', value: payment.data.VACT_Name },
            { label: '송금자명', value: payment.data.VACT_InputName },
          ];
          return (
            <div className="simple-key-value-container">
              {accountFields.map(renderField)}
            </div>
          );
        }
      }
      return null;
    };
    return (
      <div className="order-done-container">
        <div className="title-box">
          <i className="icon-check"></i> <span>결제 완료</span>
        </div>
        <div className="message">
          주문 및 결제가 완료되었습니다.
        </div>
        <div className="title">입금 정보</div>
        {renderVBank()}
        <div className="title">결제 정보</div>
        <PaymentInfo order={order} />
        <div className="title">배송 정보</div>
        <AddressInfo order={order} />
        <CartProduct brands={brands} />
        <Link to="/mypage/my_orders"><div className="go-order-list-button">주문 목록</div></Link>
      </div>
    );
  },
});
