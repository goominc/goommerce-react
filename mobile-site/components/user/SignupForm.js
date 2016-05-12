// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import { constants } from 'commons/utils/constants';
import i18n from 'commons/utils/i18n';
import numberUtil from 'commons/utils/numberUtil';
import uploadUtil from 'commons/utils/uploadUtil';

export default React.createClass({
  propTypes: {
    handleSubmit: PropTypes.func,
    signupUser: PropTypes.object,
    updateSignupUser: PropTypes.func,
  },
  getInitialState() {
    if (this.props.signupUser) {
      return this.props.signupUser;
    }
    return { activeAreaCodeIndex: 0 };
  },
  componentWillUnmount() {
    this.props.updateSignupUser(this.state);
  },
  render() {
    const { handleSubmit } = this.props;
    const { areaCodes } = constants;
    const activeAreaCodeIndex = this.state.activeAreaCodeIndex || 0;
    const t = (key) => i18n.get(`pcMain.signup.${key}`);

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
    const renderField = (field) =>
      <input
        key={field.name}
        className={field.className || 'signin-input'}
        value={_.get(this.state, field.key) || ''}
        type={field.type || 'text'}
        placeholder={field.name}
        onChange={(e) => (
          field.onChange ? field.onChange(e) : onChange(e, field.key)
        )}
      />;
    const renderBizInfo = () => {
      const onSelectFile = (e) => {
        const r = new FileReader();
        const bizImageName = e.target.files[0].name;
        r.onload = (event) => {
          this.setState({ bizImageUrl: event.target.result, bizImageName });
        };
        r.readAsDataURL(e.target.files[0]);
      };
      const fields1 = [
        { name: t('bizName'), placeholder: t('bizNamePlaceHolder'), key: 'data.bizName', isRequired: true },
        { name: `${t('bizNumber')}('-' 제외)`, placeholder: t('bizNumberPlaceHolder'), key: 'data.bizNumber', isRequired: true,
          onChange: (e) => onlyNumberFieldOnChange(e, 'data.bizNumber', 15) },
      ];
      const fields2 = [
        { name: t('returnAccountNumber'), placeholder: '123-456-123456', key: 'data.returnAccountNumber' }, // eslint-disable-line
        { name: t('returnAccountBank'), placeholder: t('returnAccountBankPlaceHolder'), key: 'data.returnAccountBank' }, // eslint-disable-line
        { name: t('returnAccountOwner'), placeholder: t('returnAccountOwnerPlaceHolder'), key: 'data.returnAccountOwner' }, // eslint-disable-line
      ];
      const openBizImagePopup = () => {
        $('#biz-image-button').click();
      };
      const bizImageField = (
        <div key="signup-biz-image" className="signup-biz-image-line">
          <img src={this.state.bizImageUrl ? this.state.bizImageUrl : ''} alt="사업자 등록증" />
          <input id="biz-image-button" type="file" accept="image/*" onChange={onSelectFile} style={({ display: 'none' })} />
          <input type="button" value="사업자 등록증 선택" onClick={openBizImagePopup} />
        </div>
      );
      return fields1.map(renderField).concat([bizImageField]).concat(fields2.map(renderField));
    };
    const onSubmit = (e) => {
      e.preventDefault();
      const requiredFields = [
        { key: 'email', errorMsg: '이메일을 입력해 주세요' },
        { key: 'password', errorMsg: '비밀번호를 입력해 주세요' },
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
      if (this.state.password !== this.state.passwordConfirm) {
        window.alert('비밀번호가 일치하지 않습니다');
        return;
      }
      if (!this.state.bizImageUrl) {
        window.alert('사업자 등록증을 선택해 주세요');
        return;
      }
      if (!$('#terms_title').is(':checked')) {
        window.alert('이용약관에 동의해 주세요');
        return;
      }
      if (!$('#policies_title').is(':checked')) {
        window.alert('개인정보 수집방침에 동의해 주세요');
        return;
      }
      user.data.areaCode = '+82'; // TODO
      const cb = (result) => {
        user.data.bizImage = result;
        if (user.data.firstName && user.data.lastName) {
          user.name = `${user.data.lastName} ${user.data.firstName}`;
        }
        handleSubmit(user);
      };
      uploadUtil.uploadFile(this.state.bizImageUrl, cb);
    };
    const toggleNumberDropdown = () => {
      const target = $('.form-tel .dropdown-box');
      const display = target.css('display');
      if (display === 'none') {
        target.css('display', 'block');
      } else {
        target.css('display', 'none');
      }
    };
    const renderAreaCodeDropdown = (ac, index) => {
      if (index === activeAreaCodeIndex) {
        return null;
      }
      const onClick = () => {
        toggleNumberDropdown();
        this.setState({ activeAreaCodeIndex: index, data: _.merge(this.state.data || {}, { areaCode: areaCodes[index].number }) });
      };
      return (
        <div key={ac.name} onClick={onClick} className="dropdown-item">
          <img src={ac.img} /> {ac.name} <span className="number">{ac.number}</span>
        </div>
      );
    };
    return (
      <form onSubmit={onSubmit}>
        <Link to="/" className="signin-title">
          <img className="logo-img" src={`${constants.resourceRoot}/mobile/main/mobile_linkshops_logo.png`} />
        </Link>
        <div className="signup-form-section">
          {renderField({ name: '아이디(이메일)', type: 'email', key: 'email' })}
          {renderField({ name: '비밀번호', type: 'password', key: 'password' })}
          {renderField({ name: '비밀번호 확인', type: 'password', key: 'passwordConfirm' })}
        </div>
        <div className="signup-form-section">
          <div className="signup-input-line">
            {renderField({ name: '성', className: 'signup-input-lastName', key: 'data.lastName' })}
            {renderField({ name: '이름', className: 'signup-input-firstName', key: 'data.firstName' })}
          </div>
          <div className="form-tel">
            <div className="area-code" onClick={toggleNumberDropdown}>
              <img src={areaCodes[activeAreaCodeIndex].img} /> {areaCodes[activeAreaCodeIndex].number}
              <div className="arrow-down"></div>
            </div>
            <input
              id="tel"
              onChange={(e) => (
                onlyNumberFieldOnChange ? onlyNumberFieldOnChange(e, 'data.tel', 12) : onChange(e, 'data.tel')
              )}
              value={_.get(this.state, 'data.tel') || ''}
              type="text" placeholder="전화번호('-' 제외)"
            />
            <div className="dropdown-box">
              {areaCodes.map(renderAreaCodeDropdown)}
            </div>
          </div>
        </div>
        <div className="signup-form-section">
          {renderBizInfo()}
        </div>
        <div className="signup-form-section">
          <div className="signup-terms-policies-line">
            <input id="terms_title" type="checkbox" />
            <label onClick={() => $('#terms_title').click()}></label>
            이용약관 동의 <span>*</span>
            <Link to="/user/terms" className="show-detail">내용보기</Link>
          </div>
          <div className="signup-terms-policies-line">
            <input id="policies_title" type="checkbox" />
            <label onClick={() => $('#policies_title').click()}></label>
            개인정보 수집방침 동의 <span>*</span>
            <Link to="/user/policies" className="show-detail">내용보기</Link>
          </div>
        </div>
        <div className="container">
          <button type="submit" className="signin-button">회원가입하기</button>
        </div>
      </form>
    );
  },
});
