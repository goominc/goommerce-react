// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

const _ = require('lodash');

import { constants } from 'commons/utils/constants';
import i18n from 'commons/utils/i18n';
import numberUtil from 'commons/utils/numberUtil';
import uploadUtil from 'commons/utils/uploadUtil';

import InputPersonalInfo from './InputPersonalInfo';

export default React.createClass({
  propTypes: {
    activeLocale: PropTypes.string,
    goBack: PropTypes.func,
    handleSignup: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {};
  },
  render() {
    const { goBack, handleSignup, activeLocale } = this.props;
    const isChinaSignup = activeLocale === 'zh-cn' || activeLocale === 'zh-tw';
    const t = (key) => i18n.get(`pcMain.signup.${key}`);
    const renderBody = () => {
      let cannotSignupMessage = null;
      const clickSignup = (e) => {
        e.preventDefault();
        if (cannotSignupMessage) {
          window.alert(cannotSignupMessage);
          return;
        }
        const requiredFields = [
          { key: 'data.lastName', errorMsg: i18n.get('pcMain.signup.warningInputLastName') },
          { key: 'data.firstName', errorMsg: i18n.get('pcMain.signup.warningInputFirstName') },
          { key: 'data.tel', errorMsg: i18n.get('pcMain.signup.warningInputTel') },
          { key: 'data.bizName', errorMsg: i18n.get('pcMain.signup.warningInputBizName') },
          { key: 'data.bizNumber', errorMsg: i18n.get('pcMain.signup.warningInputBizNumber') },
        ];
        const user = _.pick(this.state, ['email', 'password', 'passwordConfirm', 'data']);
        for (let i = 0; i < requiredFields.length; i++) {
          const field = requiredFields[i];
          if (!_.get(user, field.key)) {
            window.alert(field.errorMsg);
            $(`#${field.key.split('.').splice(-1)[0]}`).focus();
            return;
          }
        }
        if (!isChinaSignup && !this.state.bizImageUrl) {
          window.alert(i18n.get('pcMain.signup.warningInputBizImage'));
          return;
        }
        if (user.data.firstName && user.data.lastName) {
          user.name = `${user.data.lastName} ${user.data.firstName}`;
        }
        const cb = (result) => {
          user.data.bizImage = result;
          handleSignup(user);
        };
        if (this.state.bizImageUrl) {
          uploadUtil.uploadFile(this.state.bizImageUrl, cb);
        } else {
          handleSignup(user);
        }
      };
      const onChange = (e, key) => {
        const nextState = {};
        _.set(nextState, key, e.target.value);
        this.setState(_.merge(this.state, nextState));
      };
      const onlyNumberFieldOnChange = (e, key, maxLen) => {
        if (numberUtil.validateNumberInput(e.target.value, maxLen)) {
          onChange(e, key);
        }
      };
      const renderField = (field) => (
        <div key={field.name} className="form-group">
          <label><span className="required">{field.isRequired ? '*' : ''}</span>{field.name}</label>
          <div className="form-input">
            <input
              id={field.key.split('.').slice(-1)[0]}
              onChange={(e) => (field.onChange ? field.onChange(e) : onChange(e, field.key))}
              type="text"
              value={_.get(this.state, field.key) || ''}
              placeholder={field.placeholder}
            />
          </div>
        </div>
      );
      const renderBizInfoChina = () => {
        const fields1 = [
          { name: t('bizName'), placeholder: t('bizNamePlaceHolder'), key: 'data.bizName' },
          { name: t('bizNumber'), placeholder: t('bizNumberPlaceHolder'), key: 'data.bizNumber',
            onChange: (e) => onlyNumberFieldOnChange(e, 'data.bizNumber', 16) },
        ];
        const onSelectFile = (e) => {
          const r = new FileReader();
          const bizImageName = e.target.files[0].name;
          r.onload = (event) => {
            this.setState({ bizImageUrl: event.target.result, bizImageName });
          };
          r.readAsDataURL(e.target.files[0]);
        };
        return (
          <div className="signup-form-section">
            <div className="title">
              {i18n.get('pcMain.signup.businessInformation')}
            </div>
            {fields1.map(renderField)}
            <div className="form-group">
              <label>{i18n.get('pcMypage.businessRegisteration')}</label>
              <div className="input-biz-image">
                {this.state.bizImageName || i18n.get('word.thereIsNoFile')}
                <div className="biz-file-input">
                  <input type="file" accept="image/*,application/pdf" onChange={onSelectFile} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>{i18n.get('word.etc')}</label>
              <div className="form-input">
                <textarea rows="2" onChange={(e) => onChange(e, 'data.signupMemo')} />
              </div>
            </div>
          </div>
        );
      };
      const renderBizInfo = () => {
        if (isChinaSignup) {
          return renderBizInfoChina();
        }
        const fields1 = [
          { name: t('bizName'), placeholder: t('bizNamePlaceHolder'), key: 'data.bizName', isRequired: true },
          { name: t('bizNumber'), placeholder: t('bizNumberPlaceHolder'), key: 'data.bizNumber', isRequired: true,
            onChange: (e) => onlyNumberFieldOnChange(e, 'data.bizNumber', 16) },
        ];
        const fields2 = [
          { name: t('returnAccountNumber'), placeholder: '123-456-123456', key: 'data.returnAccountNumber' }, // eslint-disable-line
          { name: t('returnAccountBank'), placeholder: t('returnAccountBankPlaceHolder'), key: 'data.returnAccountBank' }, // eslint-disable-line
          { name: t('returnAccountOwner'), placeholder: t('returnAccountOwnerPlaceHolder'), key: 'data.returnAccountOwner' }, // eslint-disable-line
        ];
        const onSelectFile = (e) => {
          const r = new FileReader();
          const bizImageName = e.target.files[0].name;
          r.onload = (event) => {
            this.setState({ bizImageUrl: event.target.result, bizImageName });
          };
          r.readAsDataURL(e.target.files[0]);
        };
        return (
          <div className="signup-form-section">
            <div className="title">
              {i18n.get('pcMain.signup.businessInformation')}
            </div>
            {fields1.map(renderField)}
            <div className="form-group">
              <label><span className="required">*</span>{i18n.get('pcMypage.businessRegisteration')}</label>
              <div className="input-biz-image">
                {this.state.bizImageName || i18n.get('word.thereIsNoFile')}
                <div className="biz-file-input">
                  <input type="file" accept="image/*,application/pdf" onChange={onSelectFile} />
                </div>
              </div>
            </div>
            {fields2.map(renderField)}
          </div>
        );
      };
      const renderEmailWarning = (email) => {
        if (email) {
          // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript#answer-46181
          const validateEmail = () => {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
            return re.test(email);
          };
          if (!validateEmail()) {
            cannotSignupMessage = i18n.get('pcMain.signup.warningInputEmail');
            return (
              <div className="form-input-warning">{i18n.get('pcMain.signup.warningInputEmail')}</div>
            );
          }
          cannotSignupMessage = null;
          return null;
        }
        cannotSignupMessage = i18n.get('pcMain.signup.enterEmail');
        return null;
      };
      const renderPasswordConfirmWarning = () => {
        if (this.state.password && this.state.password !== this.state.passwordConfirm) {
          cannotSignupMessage = i18n.get('pcMain.signup.warningInputPasswordEqual');
          return (<div className="form-input-warning">{i18n.get('pcMain.signup.warningInputPasswordEqual')}</div>);
        }
        cannotSignupMessage = null;
        return null;
      };
      return (
        <form onSubmit={clickSignup} className="signup-container">
          <img className="signup-progress-img" src={`${constants.resourceRoot}/main/signup-step2.png`} />
          <div className="desc1">{i18n.get('pcMain.modalLogin.onlyRetailerLinkshopsService')}</div>
          <div className="desc2">
            {i18n.get('pcMain.modalLogin.signupPolicyDesc1')}<br />
            {i18n.get('pcMain.modalLogin.signupPolicyDesc2')}
          </div>
          <div className="divider"></div>
          <div className="signup-form-section">
            <div className="title">
              {i18n.get('pcMain.signup.signInInformation')}
              <span className="desc-required">* {i18n.get('pcMain.signup.isRequired')}</span>
            </div>
            <div className="form-group">
              <label><span className="required">*</span>{i18n.get('pcMain.signup.id')}</label>
              <div className="form-input">
                <input onChange={(e) => onChange(e, 'email')} type="email" placeholder={i18n.get('pcMain.signup.enterEmail')} />
                {renderEmailWarning(this.state.email)}
              </div>
            </div>
            <div className="form-group">
              <label><span className="required">*</span>{i18n.get('pcMain.signup.password')}</label>
              <div className="form-input">
                <input onChange={(e) => onChange(e, 'password')} type="password" placeholder={i18n.get('pcMain.signup.useLettersAndNumbers')} />
              </div>
            </div>
            <div className="form-group">
              <label><span className="required">*</span>{i18n.get('pcMain.signup.passwordAgain')}</label>
              <div className="form-input">
                <input onChange={(e) => onChange(e, 'passwordConfirm')} type="password" placeholder={i18n.get('pcMain.signup.pleaseEnterYourPasswordAgain')} />
                {renderPasswordConfirmWarning()}
              </div>
            </div>
          </div>
          <InputPersonalInfo auth={this.state} onChange={onChange} onlyNumberFieldOnChange={onlyNumberFieldOnChange} />
          {renderBizInfo()}
          <div className="button-line">
            <button type="reset" className="button-back" onClick={goBack}>{i18n.get('pcMain.signup.back')}</button>
            <button type="submit" className="button-next">{i18n.get('pcMain.signup.next')}</button>
          </div>
        </form>
      );
    };
    return (
      <div>
        {renderBody()}
      </div>
    );
  },
});
