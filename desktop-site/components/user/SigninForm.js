// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    handleSubmit: PropTypes.func.isRequired,
    goForgotPassword: PropTypes.func.isRequired,
  },
  render() {
    const { handleSubmit, goForgotPassword } = this.props;
    const onSubmit = (e) => {
      e.preventDefault();
      handleSubmit(this.refs.email.value, this.refs.password.value);
    };
    return (
      <form onSubmit={onSubmit}>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="아이디(이메일)"
          required
          autoFocus
          ref="email"
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="비밀번호"
          required
          ref="password"
        />
        <button className="btn-signin" type="submit">로그인</button>
        <Link to="/accounts/signup">회원가입</Link>
        <Link to="/accounts/forgot">비밀번호 찾기</Link>
      </form>
    );
  },
});
