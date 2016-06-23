// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import i18n from 'commons/utils/i18n';
import numberUtil from 'commons/utils/numberUtil';
import { paymentMethod, mobileVBankDataToDesktopDataIfNeed } from 'commons/utils/inipay';

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
    const payment = _.find(order.payments, (p) => p.type === 3 && p.status === 2 && paymentMethod(p) === 'VBANK');
    if (!order || order.paymentStatus !== 200 || !payment) {
      return null;
    }
    mobileVBankDataToDesktopDataIfNeed(payment);
    const price = numberUtil.formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign);
    const accountFields = [
      { label: i18n.get('pcOrder.vbankPaymentPriceTitle'), value: price, className: 'price' },
      { label: i18n.get('pcOrder.vbankBankTitle'), value: payment.data.vactBankName },
      { label: i18n.get('pcOrder.vbankAccountNumberTitle'), value: payment.data.VACT_Num },
      { label: i18n.get('pcOrder.vbankAccountHolderTitle'), value: payment.data.VACT_Name },
      { label: i18n.get('pcOrder.vbankSenderTitle'), value: payment.data.VACT_InputName },
    ];
    const renderField = (field) => (
      <p key={field.label} className="order-info-red">
        {field.label} : {field.value}
      </p>
    );
    return (
      <div className="myorder-box">
        <div className="box-header">
          {i18n.get('pcOrder.vbankTitle')}
        </div>
        <div className="box-detail">
          {accountFields.map(renderField)}
        </div>
      </div>
    );
  },
});
