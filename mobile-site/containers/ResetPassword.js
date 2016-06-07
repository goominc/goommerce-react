// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import i18n from 'commons/utils/i18n';

import { ApiAction } from 'redux/actions';
const { resetPassword } = ApiAction;

import { constants } from 'commons/utils/constants';

const ResetPassword = React.createClass({
  propTypes: {
    resetPassword: PropTypes.func,
  },
  contextTypes: {
    router: PropTypes.object,
  },
  getInitialState() {
    return {};
  },
  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      const access_token = _.get(this.props, 'location.query.access_token'); // eslint-disable-line
      const password = this.state.password;
      if (!password) {
        window.alert('비밀번호를 입력하세요');
        return;
      }
      if (password !== this.state.passwordRe) {
        window.alert('비밀번호가 일치하지 않습니다');
        return;
      }
      this.props.resetPassword({
        access_token,
        password,
      }).then(() => {
        window.alert('비밀번호가 변경되었습니다. 로그인해 주세요');
        this.context.router.push('/accounts/signin');
      });
    };
    return (
      <form className="container" onSubmit={handleSubmit}>
        <Link to="/" className="signin-title">
          <img className="logo-img" src={`${constants.resourceRoot}/mobile/main/mobile_linkshops_logo.png`} />
        </Link>
        <input
          className="signin-input"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <input
          className="signin-input"
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => this.setState({ passwordRe: e.target.value })}
        />
        <Link className="signin-simple-link" to="/accounts/signin">{i18n.get('word.login')}</Link>
        <Link className="signin-simple-link" to="/accounts/signup">{i18n.get('word.register')}</Link>
        <Link className="signin-simple-link" to="/accounts/forgot">{i18n.get('word.findYourPassword')}</Link>
        <button className="signin-button" type="submit">비밀번호 변경하기</button>
      </form>
    );
  },
});

export default connect(
  undefined,
  { resetPassword }
)(ResetPassword);
