// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';
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
      { label: i18n.get('pcOrder.vbankPaymentPriceTitle'), value: price, className: 'price' },
      { label: i18n.get('pcOrder.vbankBankTitle'), value: payment.data.vactBankName },
      { label: i18n.get('pcOrder.vbankAccountNumberTitle'), value: payment.data.VACT_Num },
      { label: i18n.get('pcOrder.vbankAccountHolderTitle'), value: payment.data.VACT_Name },
      { label: i18n.get('pcOrder.vbankSenderTitle'), value: payment.data.VACT_InputName },
    ];
    return (
      <div className="simple-key-value-container">
        {accountFields.map(renderField)}
      </div>
    );
  },
});
