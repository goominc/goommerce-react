// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    handleSubmit: PropTypes.func.isRequired,
    goForgotPassword: PropTypes.func.isRequired,
  },
  render() {
    const { handleSubmit } = this.props;
    const onSubmit = (e) => {
      e.preventDefault();
      handleSubmit(this.refs.email.value, this.refs.password.value, $('#rememberme').is(':checked'));
    };
    return (
      <form onSubmit={onSubmit}>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder={i18n.get('pcMain.signup.idEmail')}
          required
          autoFocus
          ref="email"
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder={i18n.get('pcMain.signup.password')}
          required
          ref="password"
        />
        <div className="signin-remember-me">
          <input id="rememberme" type="checkbox" className="default-checkbox" defaultChecked />
          <label onClick={() => $('#rememberme').click()}></label>
          <span>{i18n.get('word.keepMeSignedIn')}</span>
        </div>
        <button className="btn-signin" type="submit">{i18n.get('word.login')}</button>
        <Link to="/accounts/signup">{i18n.get('word.register')}</Link>
        <Link to="/accounts/forgot">{i18n.get('word.findYourPassword')}</Link>
      </form>
    );
  },
});
