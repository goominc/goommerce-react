// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { ApiAction } from 'redux/actions';
import { constants } from 'commons/utils/constants';

const { login } = ApiAction;

const Signin = React.createClass({
  propTypes: {
    login: PropTypes.func,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  render() {
    const onSubmit = (e) => {
      e.preventDefault();
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      const rememberMe = $('#rememberme').is(':checked');
      this.props.login({ email, password, rememberMe }, this.context.router);
    };
    return (
      <form className="container" onSubmit={onSubmit}>
        <Link to="/" className="signin-title">
          <img className="logo-img" src={`${constants.resourceRoot}/mobile/main/mobile_linkshops_logo.png`} />
        </Link>
        <div className="signin-desc-bold">
          링크샵스는 사업자회원만이 이용할 수 있는<br />
          도매사이트입니다
        </div>
        <div className="signin-desc-light">로그인 또는 회원가입 후 다양한 서비스를 이용하실 수 있습니다.</div>
        <input className="signin-input" type="email" placeholder="아이디(이메일)" ref="email" />
        <input className="signin-input" type="password" placeholder="비밀번호" ref="password" />
        <div className="signin-remember-me">
          <input id="rememberme" type="checkbox" defaultChecked />
          <label onClick={() => $('#rememberme').click()}></label>
          <span>로그인 상태 유지</span>
          <Link to="/accounts/forgot" className="signin-forgot">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <button type="submit" className="signin-button">로그인</button>
        <Link to="/accounts/signup" className="signin-bottom-signup-button">회원가입</Link>
      </form>
    );
  },
});

export default connect(
  undefined,
  { login }
)(Signin);
