// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

const _ = require('lodash');

import { constants } from 'commons/utils/constants';
import i18n from 'commons/utils/i18n';

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
      const clickSignup = (e) => {
        e.preventDefault();
        const user = _.pick(this.state, ['email', 'password', 'passwordConfirm', 'data']);
        handleSignup(user);
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
            <input onChange={(e) => onChange(e, field.key)} type="text" placeholder={field.placeholder} />
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
        return (
          <div className="signup-form-section">
            <div className="title">
              사업자정보
            </div>
            {fields1.map(renderField)}
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
            return (
              <div className="form-input-warning">이메일 형식으로 입력해 주세요</div>
            );
          }
        }
        return null;
      };
      const renderPasswordConfirmWarning = () => {
        if (this.state.password && this.state.password != this.state.passwordConfirm) {
          return (<div className="form-input-warning">비밀번호가 일치해야 합니다</div>);
        }
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
          <div className="signup-form-section">
            <div className="title">
              개인정보
            </div>
            <div className="form-group">
              <label><span className="required">*</span>성함</label>
              <div className="input-lastname">
                <input onChange={(e) => onChange(e, 'data.lastName')} type="text" placeholder="성" />
              </div>
              <div className="input-firstname">
                <input onChange={(e) => onChange(e, 'data.firstName')} type="text" placeholder="이름" />
              </div>
            </div>
            <div className="form-group">
              <label><span className="required">*</span>연락처</label>
              <div className="form-tel">
                <div className="area-code">
                  +82
                  <div className="arrow-down"></div>
                </div>
                <input onChange={(e) => onChange(e, 'data.tel')} type="text" placeholder="연락처를 입력해 주세요" />
              </div>
            </div>
          </div>
          {renderBizInfo()}
          <div className="button-line">
            <button type="reset" className="button-back" onClick={goBack}>뒤로</button>
            <button type="submit" className="button-next">다음</button>
          </div>
          {/*
           <form onSubmit={clickSignup} className="signup-form-body">
           <div className="form-group">
           <div className="field-label">Email <span className="required"> * </span></div>
           <input type="email" placeholder="enter email"
           value={this.state.email}
           onChange={(e) => this.setState({ email: e.target.value })}
           />
           </div>
           <div className="form-group">
           <div className="field-label">Password <span className="required"> * </span></div>
           <input type="password" placeholder="password"
           value={this.state.password}
           onChange={(e) => this.setState({ password: e.target.value })}
           />
           </div>
           <div className="form-group">
           <div className="field-label">Password Confirm <span className="required"> * </span></div>
           <input type="password" placeholder="password(again)"
           value={this.state.passwordConfirm}
           onChange={(e) => this.setState({ passwordConfirm: e.target.value })}
           />
           </div>
           <button className="next-button" type="submit">Next</button>
           </form>
           */}
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
