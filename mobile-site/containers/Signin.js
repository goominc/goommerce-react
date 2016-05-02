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
      this.props.login(email, password, this.context.router);
    };
    return (
      <form className="container" onSubmit={onSubmit}>
        <Link to="/" className="signin-title">
          <img className="logo-img" src={`${constants.resourceRoot}/mobile/main/mobile_linkshops_logo.png`} />
        </Link>
        <input className="signin-input" type="email" placeholder="아이디(이메일)" ref="email" />
        <input className="signin-input" type="password" placeholder="비밀번호" ref="password" />
        <Link to="/accounts/forgot" className="sigin-forgot">
          비밀번호를 잊으셨나요?
        </Link>
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
