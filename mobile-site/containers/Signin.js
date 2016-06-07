// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { ApiAction } from 'redux/actions';
import { constants } from 'commons/utils/constants';
import i18n from 'commons/utils/i18n';

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
          {i18n.get('mSignin.onlyRetailerLinkshopsService1')}<br />
          {i18n.get('mSignin.onlyRetailerLinkshopsService2')}
        </div>
        <div className="signin-desc-light">{i18n.get('pcMain.loginBeforeUseService')}</div>
        <input className="signin-input" type="email" placeholder={i18n.get('pcMain.signup.idEmail')} ref="email" />
        <input className="signin-input" type="password" placeholder={i18n.get('pcMain.signup.password')} ref="password" />
        <div className="signin-remember-me">
          <input id="rememberme" type="checkbox" defaultChecked />
          <label onClick={() => $('#rememberme').click()}></label>
          <span>{i18n.get('word.keepMeSignedIn')}</span>
          <Link to="/accounts/forgot" className="signin-forgot">
            {i18n.get('word.findYourPassword')}
          </Link>
        </div>
        <button type="submit" className="signin-button">{i18n.get('word.login')}</button>
        <Link to="/accounts/signup" className="signin-bottom-signup-button">{i18n.get('word.register')}</Link>
      </form>
    );
  },
});

export default connect(
  undefined,
  { login }
)(Signin);
