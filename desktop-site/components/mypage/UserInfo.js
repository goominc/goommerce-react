// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import InputPersonalInfo from 'components/user/InputPersonalInfo';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    cancel: PropTypes.func,
    onChange: PropTypes.func,
    // openChangePasswordPopup: PropTypes.func,
    save: PropTypes.func,
  },
  render() {
    const { auth, onChange, openChangePasswordPopup, save, cancel } = this.props;
    if (!auth || !auth.id) {
      return null;
    }

    const t = (key) => i18n.get(`pcMain.signup.${key}`);
    const renderBizInfo = () => {
      const fields1 = [
        { name: t('bizName'), placeholder: t('bizNamePlaceHolder'), key: 'data.bizName', isReadOnly: true },
        { name: t('bizNumber'), placeholder: t('bizNumberPlaceHolder'), key: 'data.bizNumber', isReadOnly: true },
      ];
      const fields2 = [
        { name: t('returnAccountNumber'), placeholder: '', key: 'data.returnAccountNumber', isReadOnly: true }, // eslint-disable-line
        { name: t('returnAccountBank'), placeholder: '', key: 'data.returnAccountBank', isReadOnly: true }, // eslint-disable-line
        { name: t('returnAccountOwner'), placeholder: '', key: 'data.returnAccountOwner', isReadOnly: true }, // eslint-disable-line
      ];
      const renderField = (field) => (
        <div key={field.name} className="form-group">
          <label><span className="required"></span>{field.name}</label>
          <div className="form-input">
            <input
              onChange={(e) => onChange(e, field.key)}
              type="text" placeholder={field.placeholder}
              readOnly={field.isReadOnly}
              value={_.get(auth, field.key)}
            />
          </div>
        </div>
      );
      return (
        <div className="signup-form-section">
          <div className="title">
              {i18n.get('pcMain.signup.businessInformation')}
          </div>
          {fields1.map(renderField)}
          {fields2.map(renderField)}
        </div>
      );
    };
    return (
      <div className="user-info-container">
        <div className="signup-form-section">
          <div className="title">{i18n.get('pcMypage.idPassword')}</div>
          <div className="row">
            <div className="label">{i18n.get('pcMain.signup.id')}</div>
            <div className="control">
              <input type="text" value={auth.email} readOnly />
            </div>
          </div>
          {/*
          <div className="row">
            <div className="label">비밀번호</div>
            <div className="control">
              <button className="user-info-change-password" onClick={openChangePasswordPopup}>비밀번호 변경</button>
            </div>
          </div>
           */}
        </div>
        <InputPersonalInfo auth={auth} {...this.props} />
        {renderBizInfo()}
        <div className="button-line">
          <button className="button-modify" onClick={() => save().then(() => window.alert('저장되었습니다'))}>{i18n.get('pcMypage.edit')}</button>
          <button className="button-cancel" onClick={cancel}>{i18n.get('pcMypage.cancel')}</button>
        </div>
      </div>
    );
  },
});
