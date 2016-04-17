// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import { constants } from 'commons/utils/constants';
import UserTerms from './UserTerms';
import UserPolicies from './UserPolicies';

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
            <label htmlFor="terms_title"></label>
            <span style={({ marginLeft: '15px' })}>이용약관 동의</span>
          </div>
          <div className="content-box">
            <iframe src="/user/terms" />
          </div>
        </div>
        <div className="signup-terms-section">
          <div className="title">
            <input id="policies_title" type="checkbox" ref="policies" />
            <label htmlFor="policies_title"></label>
            <span style={({ marginLeft: '15px' })}>개인정보 수집방침 동의</span>
          </div>
          <div className="content-box">
            <iframe src="/user/policies" />
          </div>
        </div>
        <div className="button-line">
          <button onClick={goBack} className="button-back">뒤로</button>
          <button onClick={onNext} className="button-next">다음</button>
        </div>
      </div>
    );
  },
});
