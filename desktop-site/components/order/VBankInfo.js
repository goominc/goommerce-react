// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import numberUtil from 'commons/utils/numberUtil';

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
    const payment = _.find(order.payments, (p) => p.type === 3 && p.status === 2 && p.data.payMethod === 'VBank');
    if (!order || order.paymentStatus !== 200 || !payment) {
      return null;
    }
    const renderField = (field) => (
      <div key={field.label} className="row">
        <div className="label">{field.label}</div>
        <div className={`control ${field.className || ''}`}>{field.value || '&'}</div>
      </div>
    );
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
  },
});
