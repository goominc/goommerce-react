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

import ServiceInfoCn from 'components/info/ServiceInfoCn';
import SignupInfoCn from 'components/info/SignupInfoCn';
import OrderInfoCn from 'components/info/OrderInfoCn';
import CustomerCenterCn from 'components/info/CustomerCenterCn';

import i18n from 'commons/utils/i18n';

const ServiceInfoContainer = React.createClass({
  propTypes: {
    setHeader: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
  },
  componentDidMount() {
    this.props.setHeader({
      showLogo: false,
      showSearch: true,
      showCart: true,
      titleI18NKey: 'mServiceInfo.title',
    });
  },
  render() {
    const { activeLocale } = this.context;
    const currentTab = _.get(this.props, 'params.section') || 'service_info';
    const isChinaLocale = activeLocale === 'zh-cn' || activeLocale === 'zh-tw';
    const tabs = [
      { name: i18n.get('mServiceInfo.infoTitle'), key: 'service_info', contents: isChinaLocale ? <ServiceInfoCn /> : <ServiceInfo /> },
      { name: i18n.get('mServiceInfo.signupTitle'), key: 'signup_info', contents: isChinaLocale ? <SignupInfoCn /> : <SignupInfo /> },
      { name: i18n.get('mServiceInfo.orderTitle'), key: 'order_info', contents: isChinaLocale ? <OrderInfoCn /> : <OrderInfo /> },
      { name: i18n.get('mServiceInfo.customerCenterTitle'), key: 'customer_center', contents: isChinaLocale ? <CustomerCenterCn /> : <CustomerCenter /> },
    ];
    let contents = '';
    tabs.forEach((tab) => {
      if (tab.key === currentTab) {
        contents = tab.contents;
      }
    });
    const renderTab = (tab) => (
      <Link
        key={tab.key}
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
  (state, ownProps) => ({}),
  { setHeader }
)(ServiceInfoContainer);
