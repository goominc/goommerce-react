// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

const _ = require('lodash');

import { constants } from 'commons/utils/constants';
import i18n from 'commons/utils/i18n';
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
      const renderField = (field) => (
        <div key={field.name} className="form-group">
          <label><span className="required">{field.isRequired ? '*' : ''}</span>{field.name}</label>
          <div className="form-input">
            <input id={field.key.split('.').slice(-1)[0]} onChange={(e) => onChange(e, field.key)} type="text" placeholder={field.placeholder} />
          </div>
        </div>
      );
      const renderBizInfo = () => {
        const fields1 = [
          { name: t('bizName'), placeholder: t('bizNamePlaceHolder'), key: 'data.bizName', isRequired: true },
          { name: t('bizNumber'), placeholder: t('bizNumberPlaceHolder'), key: 'data.bizNumber', isRequired: true },
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
              사업자정보
            </div>
            {fields1.map(renderField)}
            <div className="form-group">
              <label><span className="required">*</span>사업자 등록증</label>
              <div className="input-biz-image">
                {this.state.bizImageName || '선택된 파일이 없습니다'}
                <div className="biz-file-input">
                  <input type="file" accept="image/*" onChange={onSelectFile} />
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
              로그인 정보
              <span className="desc-required">*은 필수입력</span>
            </div>
            <div className="form-group">
              <label><span className="required">*</span>아이디</label>
              <div className="form-input">
                <input onChange={(e) => onChange(e, 'email')} type="email" placeholder="ex) linkshops@linkshops.com" />
                {renderEmailWarning(this.state.email)}
              </div>
            </div>
            <div className="form-group">
              <label><span className="required">*</span>비밀번호</label>
              <div className="form-input">
                <input onChange={(e) => onChange(e, 'password')} type="password" placeholder="6~16자 영문 대 소문자, 숫자를 사용하세요." />
              </div>
            </div>
            <div className="form-group">
              <label><span className="required">*</span>비밀번호 확인</label>
              <div className="form-input">
                <input onChange={(e) => onChange(e, 'passwordConfirm')} type="password" placeholder="비밀번호를 다시 입력해주세요" />
                {renderPasswordConfirmWarning()}
              </div>
            </div>
          </div>
          <InputPersonalInfo onChange={onChange} />
          {renderBizInfo()}
          <div className="button-line">
            <button type="reset" className="button-back" onClick={goBack}>뒤로</button>
            <button type="submit" className="button-next">다음</button>
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
