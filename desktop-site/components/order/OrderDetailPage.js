// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import CartProduct from 'components/CartProduct';
import orderUtil from 'commons/utils/orderUtil';
import numberUtil from 'commons/utils/numberUtil';

import AddressInfo from './AddressInfo';
import PaymentInfo from './PaymentInfo';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    // const { activeCurrency, currencySign } = this.context;
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
    const orderFields = [
      { label: '주문 날짜', value: numberUtil.formatDateKor(order.createdAt) },
      { label: '주문 번호', value: order.id },
    ];
    return (
      <div className="order-done-container">
        <div className="title">주문 정보</div>
        <div className="simple-key-value-container">
          {orderFields.map(renderField)}
        </div>
        <div className="title">결제 정보</div>
        <PaymentInfo order={order} />
        <div className="title">배송 정보</div>
        <AddressInfo order={order} />
        <CartProduct brands={brands} />
      </div>
    );
  },
});
