// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { Link } from 'react-router';

import i18n from 'commons/utils/i18n';
import { constants } from 'commons/utils/constants';

export default React.createClass({
  render() {
    return (
      <div className="footer-linkshops">
        <div className="container no-padding">
          <div className="info-box">
            <div className="info-title">
              {i18n.get('pcFooter.aprilInc')}
            </div>
            <div className="info-content">
              {i18n.get('pcFooter.ceoKyoungmiSeo')} <br />
              {i18n.get('pcFooter.aprilAddress')} <br />
              {i18n.get('pcFooter.businessRegistrationNo')} <br />
              {i18n.get('pcFooter.telecommunicationServices')} <br />
            </div>
          </div>
          <div className="info-box">
            <div className="info-title">
            </div>
            <div className="info-content">
              {i18n.get('pcFooter.tel')} <br />
              {i18n.get('pcFooter.fax')} <br />
              E-mail <a href="mailto:cs@linkshops.com">cs@linkshops.com</a> <br />
              {i18n.get('pcFooter.privacyPolicyManager')} <br />
              <Link to="user/policies">{i18n.get('pcFooter.privacyPolicy')}</Link> <br />
              <Link to="user/terms">{i18n.get('pcFooter.termsOfUse')}</Link> <br />
            </div>
          </div>
          <div className="info-box">
            <div className="info-title">
              {i18n.get('pcFooter.customerService')}
            </div>
            <div className="info-content">
              {i18n.get('pcFooter.customerServiceTime')} <br />
              {i18n.get('pcFooter.lunchTime')} <br />
              {i18n.get('pcFooter.customerServiceDay')} <br />
            </div>
          </div>
          <div className="info-box">
            <div className="info-title">
              <img src={`${constants.resourceRoot}/footer/logo_kakao.png`} />
            </div>
            <div className="info-content">
              {i18n.get('pcFooter.kakaoTalk')}<br />
              {i18n.get('pcFooter.wechat')}<br />
            </div>
          </div>
        </div>
        <div className="footer-external-link">
          <img src={`${constants.resourceRoot}/footer/logo_visa.png`} />
          <img src={`${constants.resourceRoot}/footer/logo_master.png`} />
          <img src={`${constants.resourceRoot}/footer/logo_alipay.png`} />
          <img src={`${constants.resourceRoot}/footer/logo_unionpay.png`} />
          <img src={`${constants.resourceRoot}/footer/logo_tenpay.png`} />
          <img src={`${constants.resourceRoot}/footer/logo_cj.png`} />
        </div>
        <div className="footer-copywrite">
          APRIL INC. © 2016 LINKSHOPS.COM. ALL RIGHTS RESERVED.
        </div>
      </div>
    );
  },
});
