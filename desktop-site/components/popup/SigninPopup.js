// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { constants } from 'commons/utils/constants';
import i18n from 'commons/utils/i18n';


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
            <div className="desc-bold">{i18n.get('pcMain.modalLogin.onlyRetailerLinkshopsService')}</div>
            <div className="desc-normal">{i18n.get('pcMain.modalLogin.ifYouWantToUseFurtherService')}</div>
          </div>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-left">
              <input type="email" placeholder={i18n.get('pcMain.signup.idEmail')} ref="email" />
              <input type="password" placeholder={i18n.get('pcMain.signup.password')} ref="password" />
            </div>
            <button type="submit" className="signin-button">{i18n.get('word.login')}</button>
          </form>
          <div className="remember-me">
            <input id="rememberme" type="checkbox" defaultChecked />
            <label onClick={() => $('#rememberme').click()}></label>
            <span>{i18n.get('word.keepMeSignedIn')}</span>
            <div className="signup-or-forgot">
              <Link to="/accounts/signup" className="item" onClick={closePopup}>{i18n.get('word.register')}</Link>
              <Link to="/accounts/forgot" className="item" onClick={closePopup}>{i18n.get('word.findYourPassword')}</Link>
            </div>
          </div>
          <div className="popup-close-button" onClick={this.props.closePopup}></div>
        </div>
      </div>
    );
  },
});
