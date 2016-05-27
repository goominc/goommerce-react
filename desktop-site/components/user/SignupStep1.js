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
        <div className="desc1">
          링크샵스는 사업자회원만이 이용할 수 있는 도매사이트 입니다.
        </div>
        <div className="desc2">
          패션잡화 관련 소매업자에 한해 가입승인이 진행되며,<br />
          취급품목 및 업태가 다른 경우 승인이 반려될 수 있습니다.
        </div>
        <div className="divider"></div>
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
