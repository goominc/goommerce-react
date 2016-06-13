// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import i18n from 'commons/utils/i18n';
import stringUtil from 'commons/utils/stringUtil';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    orderSummary: PropTypes.array,
  },
  render() {
    const { auth } = this.props;
    let { orderSummary } = this.props;
    if (!orderSummary) {
      orderSummary = [
        { text: i18n.get('enum.order.paymentStatus.200'), cnt: 0 },
        { text: i18n.get('enum.order.status.100'), cnt: 0 },
        { text: i18n.get('enum.order.status.200'), cnt: 0 },
        { text: i18n.get('enum.order.status.201'), cnt: 0 },
      ];
    }
    return (
      <div className="mypage-dashboard">
        <div className="left-title-box">
          <div className="title">{i18n.get('word.myPage')}</div>
          <div className="welcome">
            <strong>{stringUtil.getUserName(auth)}</strong><br />
            {i18n.get('pcMypage.welcome')}
          </div>
        </div>
        <div className="right-order-summary-box">
          <div className="title">{i18n.get('pcMypage.orderSummaryTitle')}</div>
          <div className="summary-line">
            {orderSummary.map((item) => (
              <div className="item">
                <div className="status">{item.text}</div>
                <div className="value"><strong>{item.cnt}</strong>{i18n.get('pcMypage.orderCount')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
