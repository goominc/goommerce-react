// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    closePopup: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  render() {
    const { closePopup } = this.props;
    const { ApiAction } = this.context;
    const onSubmit = (e) => {
      e.preventDefault();
      const oldPassword = this.refs.oldPassword.value;
      const password = this.refs.password.value;
      if (!password) {
        window.alert(i18n.get('pcMain.signup.enterPassword'));
        return;
      }
      if (password !== this.refs.passwordRe.value) {
        window.alert(i18n.get('pcMain.signup.warningInputPasswordEqual'));
        return;
      }
      ApiAction.changePassword(oldPassword, password).then(() => {
        window.alert(i18n.get('pcMain.signup.changePasswordSuccess'));
        closePopup();
      }, () => {
        window.alert(i18n.get('pcMain.signup.changePasswordFail'));
      });
    };
    return (
      <div>
        <div className="popup-overlay"></div>
        <form className="change-password-popup" onSubmit={onSubmit}>
          <div className="title">{i18n.get('pcMypage.changePassword')}</div>
          <div className="description"></div>
          <input type="password" placeholder={i18n.get('pcMain.signup.oldPassword')} ref="oldPassword" />
          <input type="password" placeholder={i18n.get('pcMain.signup.newPassword')} ref="password" />
          <input type="password" placeholder={i18n.get('pcMain.signup.passwordAgain')} ref="passwordRe" />
          <div className="button-line">
            <button className="button-modify" type="submit">{i18n.get('word.save')}</button>
            <button className="button-cancel" type="reset" onClick={closePopup}>{i18n.get('word.cancel')}</button>
          </div>
          <div className="popup-close-button" onClick={closePopup}></div>
        </form>
      </div>
    );
  },
});
