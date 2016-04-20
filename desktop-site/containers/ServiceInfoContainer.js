// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  componentDidMount() {
    const { params } = this.props;
    if (params.section) {
      setTimeout(() => {
        // 2016. 04. 20. [heekyu] there is timing issue
        const offset = $(`#${params.section}`).offset();
        console.log(offset);
        if (offset) {
          $('body').scrollTop(offset.top);
        }
      }, 10);
    }
  },
  render() {
    const sections = [
      { id: 'intro', title: '서비스 안내', subTitle: '| 온라인 도매시장의 새로운 기준 링크샵스', width: 936, height: 1078, img: `${constants.resourceRoot}/banner/service-info-why.jpg` }, // eslint-disable-line
      { id: 'signup', title: '회원가입 안내', subTitle: '| 고객과 함께 성장하는 파트너', width: 1061, height: 1076, img: `${constants.resourceRoot}/banner/service-info-signup.jpg` }, // eslint-disable-line
      { id: 'ship_pay', title: '배송결제 안내', subTitle: '| 편리하고 안전한 배송결제 시스템', width: 894, height: 882, img: `${constants.resourceRoot}/banner/service-info-shipping.jpg` }, // eslint-disable-line
      { id: 'customer_center', title: '고객지원 센터', subTitle: '| 언제나 고개님 의견에 귀 기울이는 링크샵스 고객지원 서비스', width: 827, height: 818, img: `${constants.resourceRoot}/banner/service-info-customer.jpg` }, // eslint-disable-line
    ];
    // 2016. 04. 20. [heekyu] use height for calc section offet before img load
    const renderSection = (section) => (
      <div id={section.id} key={section.id} className="section">
        <div className="title">
          <strong>{section.title}</strong>
          <span>{section.subTitle}</span>
        </div>
        <div className="content">
          <img width={section.width} height={section.height} src={section.img} />
        </div>
      </div>
    );
    return (
      <div className="service-info-container">
        {sections.map(renderSection)}
      </div>
    );
  },
});
