// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import i18n from 'commons/utils/i18n';

const getCmsKey = (locale) => {
  if (locale === 'en') {
    locale = 'ko';
  }
  return `mobile_shipping_policy_${locale}`;
};

const ShippingPolicy = React.createClass({
  propTypes: {
    cmsData: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    router: PropTypes.object,
  },
  componentDidMount() {
    this.context.ApiAction.loadCMSData(getCmsKey('ko'));
    this.context.ApiAction.loadCMSData(getCmsKey('zh-cn'));
    this.context.ApiAction.loadCMSData(getCmsKey('zh-tw'));
  },
  render() {
    const { cmsData } = this.props;
    if (!cmsData) {
      return null;
    }
    return (
      <div className="pay-wrap" style={({ display: 'block' })}>
        <div className="pay-header">
          <span className="pay-title">{i18n.get('mOrder.shippingPolicyTitle')}</span>
          <span className="pay-cancel" onClick={this.context.router.goBack}></span>
        </div>
        <div dangerouslySetInnerHTML={({ __html: cmsData.data })} />
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    cmsData: state.cms[getCmsKey(state.i18n.activeLocale)],
  })
)(ShippingPolicy);
