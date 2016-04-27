// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import { constants } from 'commons/utils/constants';
import stringUtil from 'commons/utils/stringUtil';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    goNext: PropTypes.func,
  },
  render() {
    const { auth, goNext } = this.props;
    return (
      <div className="signup-container">
        <img className="signup-progress-img" src={`${constants.resourceRoot}/main/signup-step3.png`} />
        <div className="signup-greeting">
          <div className="title">
            <b>{stringUtil.getUserName(auth)}</b> 님 가입을 환영합니다!
          </div>
          <div className="description">
            구매회원 승인 절차를 위해 약 <b>24시간</b> 정도 소요될 예정입니다.<br />
            승인여부에 대한 안내는 가입시 입력하신 이메일<br />
            <b>{auth.email}</b> 로 전달 드릴 예정입니다.<br />
            기타 가입 절차에 대한 문의는 아래 연락처로 문의해주시기 바랍니다.<br />
          </div>
        </div>
        <img className="signup-contact-img" src={`${constants.resourceRoot}/main/signup-contact.png`} />
        <div className="button-line">
          <button onClick={goNext} className="button-next">홈으로</button>
        </div>
      </div>
    );
  },
});
