// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import CartProduct from 'components/CartProduct';
import AddressInfo from './AddressInfo';
import PaymentInfo from './PaymentInfo';
import VBankInfo from './VBankInfo';
import i18n from 'commons/utils/i18n';
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
    const paid = (
      <div className="title-box">
        <i className="icon-check"></i> <span>결제 완료</span>
      </div>
    );
    const message = order.paymentStatus === 100 ? '주문 및 결제가 완료되었습니다.' : '주문이 완료되었습니다.';
    const brands = orderUtil.collectByBrands(order.orderProducts);
    return (
      <div className="order-done-container">
        {order.paymentStatus === 100 && paid}
        <div className="message">{message}</div>
        {order.paymentStatus === 200 && <div className="title">입금 정보</div>}
        <VBankInfo order={order} />
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
