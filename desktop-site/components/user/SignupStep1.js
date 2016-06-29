// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { constants } from 'commons/utils/constants';

import { getUserTerms, getUserPolicies } from 'commons/components/I18nComponentSelector';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    goNext: PropTypes.func,
    goBack: PropTypes.func,
    activeLocale: PropTypes.string,
  },
  render() {
    const { goNext, goBack } = this.props;
    const onNext = () => {
      goNext({
        terms: { value: this.refs.terms.checked, errorMessage: i18n.get('pcMain.signup.pleaseAgreeTerms') },
        policies: { value: this.refs.policies.checked, errorMessage: i18n.get('pcMain.signup.pleaseAgreePolicy') },
      });
    };
    const { activeLocale } = this.props;
    return (
      <div className="signup-container">
        <img className="signup-progress-img" src={this.props.signupProgressImg} />
        <div className="desc1">{i18n.get('pcMain.modalLogin.onlyRetailerLinkshopsService')}</div>
        <div className="desc2">
          {i18n.get('pcMain.modalLogin.signupPolicyDesc1')}<br />
          {i18n.get('pcMain.modalLogin.signupPolicyDesc2')}
        </div>
        <div className="divider"></div>
        <div className="signup-terms-section">
          <div className="title">
            <input id="terms_title" type="checkbox" className="default-checkbox" ref="terms" />
            <label onClick={() => $('#terms_title').click()}></label>
            <span style={({ marginLeft: '15px' })}>{i18n.get('pcMain.signup.agreeToTermsOfUse')}</span>
          </div>
          <div className="content-box">
            {getUserTerms(activeLocale)}
          </div>
        </div>
        <div className="signup-terms-section">
          <div className="title">
            <input id="policies_title" type="checkbox" className="default-checkbox" ref="policies" />
            <label onClick={() => $('#policies_title').click()}></label>
            <span style={({ marginLeft: '15px' })}>{i18n.get('pcMain.signup.agreeToPrivacyPolicy')}</span>
          </div>
          <div className="content-box">
            {getUserPolicies(activeLocale)}
          </div>
        </div>
        <div className="form-button-line">
          <button onClick={goBack} className="button-back">{i18n.get('pcMain.signup.back')}</button>
          <button onClick={onNext} className="button-next">{i18n.get('pcMain.signup.next')}</button>
        </div>
      </div>
    );
  },
});