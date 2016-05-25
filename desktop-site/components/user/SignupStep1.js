// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import { constants } from 'commons/utils/constants';
import UserTerms from 'commons/components/user/UserTerms';
import UserPolicies from 'commons/components/user/UserPolicies';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    goNext: PropTypes.func,
    goBack: PropTypes.func,
  },
  render() {
    const { goNext, goBack } = this.props;
    const onNext = () => {
      goNext({
        terms: { value: this.refs.terms.checked, errorMessage: '이용약관에 동의해 주세요' },
        policies: { value: this.refs.policies.checked, errorMessage: '개인정보 수집방침에 동의해 주세요' },
      });
    };
    return (
      <div className="signup-container">
        <img className="signup-progress-img" src={`${constants.resourceRoot}/main/signup-step1.png`} />
        <div className="signup-terms-section">
          <div className="title">
            <input id="terms_title" type="checkbox" ref="terms" />
            <label onClick={() => $('#terms_title').click()}></label>
            <span style={({ marginLeft: '15px' })}>{i18n.get('pcMain.signup.agreeToTermsOfUse')}</span>
          </div>
          <div className="content-box">
            <UserTerms />
          </div>
        </div>
        <div className="signup-terms-section">
          <div className="title">
            <input id="policies_title" type="checkbox" ref="policies" />
            <label onClick={() => $('#policies_title').click()}></label>
            <span style={({ marginLeft: '15px' })}>{i18n.get('pcMain.signup.agreeToPrivacyPolicy')}</span>
          </div>
          <div className="content-box">
            <UserPolicies />
          </div>
        </div>
        <div className="button-line">
          <button onClick={goBack} className="button-back">{i18n.get('pcMain.signup.back')}</button>
          <button onClick={onNext} className="button-next">{i18n.get('pcMain.signup.naxt')}</button>
        </div>
      </div>
    );
  },
});
