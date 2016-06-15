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
    } else {
      orderSummary.forEach((s) => {
        s.text = i18n.get(s.textKey);
      });
    }
    orderSummary[0].link = '/mypage/orders?status=0';
    orderSummary[1].link = '/mypage/orders?status=100,101,102';
    orderSummary[2].link = '/mypage/orders?status=200,202';
    orderSummary[3].link = '/mypage/orders?status=201,203';
    return (
      <div className="mypage-dashboard">
        {/* 2016. 06. 14. [heekyu] do not use Link for reject not refreshing */}
        <a href="/mypage/orders">
          <div className="left-title-box">
            <div className="title">{i18n.get('word.myPage')}</div>
            <div className="welcome">
              <strong>{stringUtil.getUserName(auth)}</strong><br />
              {i18n.get('pcMypage.welcome')}
            </div>
          </div>
        </a>
        <div className="right-order-summary-box">
          <div className="title"><i className="icon-receipt"></i> {i18n.get('pcMypage.orderSummaryTitle')}</div>
          <div className="summary-line">
            {orderSummary.map((item, index) => (
              <span>
                <div key={`order-summary-item-${index}`} className="item">
                  <div className="status">{item.text}</div>
                  <div className="value">
                    {/* 2016. 06. 14. [heekyu] do not use Link for reject not refreshing */}
                    <a href={item.link}><strong>{item.cnt}</strong>{i18n.get('pcMypage.orderCount')}</a>
                  </div>
                </div>
                {index === orderSummary.length - 1 ? null :
                  <div className="arrow-right"><i className="icon-order-summary-arrow-right"></i></div>
                }
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
