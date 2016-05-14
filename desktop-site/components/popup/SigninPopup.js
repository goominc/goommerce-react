// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  propTypes: {
    closePopup: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  },
  render() {
    const { closePopup, handleSubmit } = this.props;
    const onSubmit = (e) => {
      e.preventDefault();
      handleSubmit({
        email: this.refs.email.value,
        password: this.refs.password.value,
        rememberMe: $('#rememberme').is(':checked'),
      });
    };
    return (
      <div>
        <div className="popup-overlay"></div>
        <div className="signin-popup">
          <div className="center">
            <img src={`${constants.resourceRoot}/header/logo.png`} />
            <div className="desc-bold">링크샵스는 사업자회원만이 이용할 수 있는 도매사이트 입니다.</div>
            <div className="desc-normal">더 많은 서비스 이용을 원하실 경우 로그인 또는 회원가입을 해주세요.</div>
          </div>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-left">
              <input type="email" placeholder="아이디" ref="email" />
              <input type="password" placeholder="비밀번호" ref="password" />
            </div>
            <button type="submit" className="signin-button">로그인</button>
          </form>
          <div className="remember-me">
            <input id="rememberme" type="checkbox" defaultChecked />
            <label onClick={() => $('#rememberme').click()}></label>
            <span>로그인 상태 유지</span>
            <div className="signup-or-forgot">
              <Link to="/accounts/forgot" className="item" onClick={closePopup}>비밀번호 찾기</Link>
              <Link to="/accounts/signup" className="item" onClick={closePopup}>회원가입</Link>
            </div>
          </div>
          <div className="popup-close-button" onClick={this.props.closePopup}></div>
        </div>
      </div>
    );
  },
});
