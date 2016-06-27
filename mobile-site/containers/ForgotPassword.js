// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { ApiAction } from 'redux/actions';
import { constants } from 'commons/utils/constants';
import i18n from 'commons/utils/i18n';

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
          <img className="logo-img" src={`${constants.resourceRoot}/mobile/main/mobile_linkshops_logo.png`} />
        </Link>
        <input className="signin-input" type="email" placeholder={i18n.get('pcMain.signup.idEmail')} ref="email" />
        <Link className="signin-simple-link" to="/accounts/signin">{i18n.get('word.login')}</Link>
        <Link className="signin-simple-link" to="/accounts/signup">{i18n.get('word.register')}</Link>
        <button className="signin-button" type="submit">{i18n.get('word.findYourPassword')}</button>
      </form>
    );
  },
});

export default connect(
  undefined,
  { forgotPassword }
)(ForgotPassword);
