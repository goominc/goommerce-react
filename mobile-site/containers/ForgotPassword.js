// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { ApiAction } from 'redux/actions';
import { constants } from 'commons/utils/constants';

const { forgotPassword } = ApiAction;

const ForgotPassword = React.createClass({
  propTypes: {
    forgotPassword: PropTypes.func,
  },
  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      $('.signin-button').attr('disabled', true);
      // this.props.forgotPassword(this.state).then((res) => alert(res.message)); // eslint-disable-line no-alert
      const forgotData = {
        email: this.refs.email.value,
        resetBaseUrl: `${window.location.href.slice(0, -6)}reset`,
      };
      this.props.forgotPassword(forgotData).then(() => {
        alert('비밀번호 변경을 위해 이메일을 확인해 주세요');
        this.context.router.push('/');
      }, () => {
        window.alert('failed to request reset email');
        $('.signin-button').attr('disabled', false);
      }); // eslint-disable-line no-alert
    };
    return (
      <form className="container" onSubmit={handleSubmit}>
        <Link to="/" className="signin-title">
          <img className="logo-img" src={`${constants.resourceRoot}/extra/01_linkshops_logo.png`} />
        </Link>
        <input className="signin-input" type="email" placeholder="아이디(이메일)" ref="email" />
        <Link className="signin-simple-link" to="/accounts/signin">로그인</Link>
        <Link className="signin-simple-link" to="/accounts/signup">회원가입</Link>
        <button className="signin-button" type="submit">비밀번호 찾기</button>
      </form>
    );
  },
});

export default connect(
  undefined,
  { forgotPassword }
)(ForgotPassword);
