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
    goBack: PropTypes.func,
    handleSignup: PropTypes.func.isRequired,
  },
  // only used when two-way binding is used. form input is that case
  getInitialState() {
    return {};
  },
  render() {
    const { goBack, handleSignup } = this.props;
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
          { key: 'data.lastName', errorMsg: '성을 입력해 주세요' },
          { key: 'data.firstName', errorMsg: '이름을 입력해 주세요' },
          { key: 'data.tel', errorMsg: '전화번호를 입력해 주세요' },
          { key: 'data.bizName', errorMsg: '사업자명을 입력해 주세요' },
          { key: 'data.bizNumber', errorMsg: '사업자 번호를 입력해 주세요' },
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
        if (!this.state.bizImageUrl) {
          window.alert('사업자 등록증을 선택해 주세요');
          return;
        }
        const cb = (result) => {
          user.data.bizImage = result;
          if (user.data.firstName && user.data.lastName) {
            user.name = `${user.data.lastName} ${user.data.firstName}`;
          }
          handleSignup(user);
        };
        uploadUtil.uploadFile(this.state.bizImageUrl, cb);
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
      const renderBizInfo = () => {
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
                {this.state.bizImageName || '선택된 파일이 없습니다'}
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
            cannotSignupMessage = '이메일을 올바르게 입력해 주세요';
            return (
              <div className="form-input-warning">이메일 형식으로 입력해 주세요</div>
            );
          }
          cannotSignupMessage = null;
          return null;
        }
        cannotSignupMessage = '이메일을 입력해 주세요';
        return null;
      };
      const renderPasswordConfirmWarning = () => {
        if (this.state.password && this.state.password !== this.state.passwordConfirm) {
          cannotSignupMessage = '비밀번호가 일치해야 합니다';
          return (<div className="form-input-warning">비밀번호가 일치해야 합니다</div>);
        }
        cannotSignupMessage = null;
        return null;
      };
      return (
        <form onSubmit={clickSignup} className="signup-container">
          <img className="signup-progress-img" src={`${constants.resourceRoot}/main/signup-step2.png`} />
          <div className="signup-form-section">
            <div className="title">
              {i18n.get('pcMain.signup.signInInformation')}
              <span className="desc-required">*은 필수입력</span>
            </div>
            <div className="form-group">
              <label><span className="required">*</span>{i18n.get('pcMain.signup.id')}</label>
              <div className="form-input">
                <input onChange={(e) => onChange(e, 'email')} type="email" placeholder="ex) linkshops@linkshops.com" />
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
            <button type="submit" className="button-next">{i18n.get('pcMain.signup.naxt')}</button>
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
