// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { setHeader } from 'redux/actions';

import ServiceInfo from 'components/info/ServiceInfo';
import SignupInfo from 'components/info/SignupInfo';
import OrderInfo from 'components/info/OrderInfo';
import CustomerCenter from 'components/info/CustomerCenter';

const ServiceInfoContainer = React.createClass({
  propTypes: {
    setHeader: PropTypes.func,
  },
  componentDidMount() {
    this.props.setHeader(false, false, false, '이용안내');
  },
  render() {
    const currentTab = _.get(this.props, 'params.section') || 'service_info';
    const tabs = [
      { name: '서비스소개', key: 'service_info', contents: <ServiceInfo /> },
      { name: '회원가입', key: 'signup_info', contents: <SignupInfo /> },
      { name: '주문배송', key: 'order_info', contents: <OrderInfo /> },
      { name: '고객센터', key: 'customer_center', contents: <CustomerCenter /> },
    ];
    let contents = '';
    tabs.forEach((tab) => {
      if (tab.key === currentTab) {
        contents = tab.contents;
      }
    });
    const renderTab = (tab) => (
      <Link
        className={`item ${tab.key === currentTab ? 'active' : ''}`}
        to={`/service/info/${tab.key}`}
      >
        <span>{tab.name}</span>
      </Link>
    );
    return (
      <div>
        <div className="service-info-navbar">
          {tabs.map(renderTab)}
        </div>
        {contents}
      </div>
    );
  },
});

export default connect(
  undefined,
  { setHeader }
)(ServiceInfoContainer);
