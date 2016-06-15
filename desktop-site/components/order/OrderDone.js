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
        <i className="icon-check"></i> <span>{i18n.get('enum.order.paymentStatus.100')}</span>
      </div>
    );
    const message = order.paymentStatus === 100 ? i18n.get('pcMypage.thanksForYourOrderPayment') : i18n.get('pcMypage.thanksForYourOrder');
    const brands = orderUtil.collectByBrands(order.orderProducts);
    return (
      <div className="order-done-container">
        {order.paymentStatus === 100 && paid}
        <div className="message">{message}</div>
        <div className="title">{i18n.get('pcPayment.paymentInfo')}</div>
        <PaymentInfo order={order} />
        <div className="title">{i18n.get('pcPayment.shippingAddress')}</div>
        <AddressInfo order={order} />
        <CartProduct brands={brands} />
        <Link to="/mypage/my_orders"><div className="go-order-list-button">{i18n.get('pcMypage.orderList')}</div></Link>
      </div>
    );
  },
});
