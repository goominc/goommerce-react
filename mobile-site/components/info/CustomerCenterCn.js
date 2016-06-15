// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="mobile-customer-center-container-cn">
        <div className="wrap_service_intro"></div>
        <div className="radius_buyer">
          营业时间 (韩国时间)
        </div>
        <div className="center_cont">
          <div className="center_ul1">
            <div>10:00 ~ 18:00</div>
            <div className="center_con_text2">12:30 ~ 13:30</div>
          </div>
          <div className="center_ul2">
            <div>周一至周五</div>
            <div className="center_con_text2">午休</div>
          </div>
        </div>
        <div className="center_con_info">国家节假日(韩国), 周末休息</div>
        <p className="mid_line"></p>
        <div className="radius_buyer">
          联系方式
        </div>
        <div className="service_cont">
          <div className="service_ul1">
            <div>Email</div>
            <div className="service_con_text2">WeChat</div>
            <div className="service_con_text3">Line</div>
          </div>
          <div className="service_ul2">
            <div>cs@linkshops.com</div>
            <div className="service_con_text2">linkshops-china</div>
            <div className="service_con_text3">linkshops</div>
          </div>
        </div>

      </div>
    );
  },
});
