// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { constants } from 'commons/utils/constants';

import { setHeader } from 'redux/actions';

const ServiceInfoContainer = React.createClass({
  propTypes: {
    setHeader: PropTypes.func,
  },
  getInitialState() {
    return { currentTab: _.get(this.props, 'params.section') || 'service_info' };
  },
  componentDidMount() {
    this.props.setHeader(false, false, false, '이용안내');
  },
  render() {
    const currentTab = this.state.currentTab;
    const tabs = [
      { name: '서비스소개', key: 'service_info', img: `${constants.resourceRoot}/mobile/banner/service_guide_001.png` },
      { name: '회원가입', key: 'signup_info', img: `${constants.resourceRoot}/mobile/banner/service_guide_002.png` },
      { name: '주문배송', key: 'order_info', img: `${constants.resourceRoot}/mobile/banner/service_guide_003.png` },
      { name: '고객센터', key: 'customer_center', img: `${constants.resourceRoot}/mobile/banner/service_guide_004.png` },
    ];
    let content = '';
    tabs.forEach((tab) => {
      if (tab.key === currentTab) {
        content = <img src={tab.img} width="100%" />
      }
    });
    const renderTab = (tab) => (
      <div
        className={`item ${tab.key === currentTab ? 'active' : ''}`}
        onClick={() => this.setState({ currentTab: tab.key })}
      >
        <span>{tab.name}</span>
      </div>
    );
    return (
      <div>
        <div className="service-info-navbar">
          {tabs.map(renderTab)}
        </div>
        {content}
      </div>
    );
  },
});

export default connect(
  undefined,
  { setHeader }
)(ServiceInfoContainer);
