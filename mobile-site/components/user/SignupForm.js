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
    activeLocale: PropTypes.string,
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
    const { handleSubmit, activeLocale } = this.props;
    const { areaCodes } = constants;
    const activeAreaCodeIndex = this.state.activeAreaCodeIndex || 0;
    const t = (key) => i18n.get(`pcMain.signup.${key}`);

    const isChinaSignup = activeLocale === 'zh-cn' || activeLocale === 'zh-tw';

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
        className={`${field.className || 'signin-input'} ${field.isRequired ? 'required' : ''}`}
        value={_.get(this.state, field.key) || ''}
        type={field.type || 'text'}
        placeholder={field.name}
        onChange={(e) => (
          field.onChange ? field.onChange(e) : onChange(e, field.key)
        )}
      />;
    const renderBizImage = () => {
      const onSelectFile = (e) => {
        const r = new FileReader();
        const bizImageName = e.target.files[0].name;
        r.onload = (event) => {
          this.setState({ bizImageUrl: event.target.result, bizImageName });
        };
        r.readAsDataURL(e.target.files[0]);
      };
      const openBizImagePopup = (e) => {
        e.preventDefault();
        $('#biz-image-button').click();
      };
      if (this.state.bizImageUrl) {
        return (
          <div key="signup-biz-image" className="signup-biz-image-line">
            <input id="biz-image-button" type="file" accept="image/*,application/pdf" onChange={onSelectFile} style={({ display: 'none' })} />
            <img src={this.state.bizImageUrl} onClick={openBizImagePopup} />
          </div>
        );
      }
      return (
        <div key="signup-biz-image" className="signup-biz-image-line">
          <input id="biz-image-button" type="file" accept="image/*,application/pdf" onChange={onSelectFile} style={({ display: 'none' })} />
          <button className="biz-image-upload-button" style={({ margin: 0 })} onClick={openBizImagePopup}>
            {i18n.get('mSignup.bizImageUpload')}
          </button>
        </div>
      );
    };
    const renderBizInfoChina = () => {
      const fields1 = [
        { name: t('bizName'), placeholder: t('bizNamePlaceHolder'), key: 'data.bizName' },
        { name: i18n.get('mSignup.bizNumberOnlyNumbers'), placeholder: t('bizNumberPlaceHolder'), key: 'data.bizNumber',
          onChange: (e) => onlyNumberFieldOnChange(e, 'data.bizNumber', 16) },
      ];
      const bizImageField = renderBizImage();
      const res = fields1.map(renderField);
      res.push(bizImageField);
      res.push(
        <textarea className="signin-input" placeholder={i18n.get('word.etc')} rows="2" onChange={(e) => onChange(e, 'data.signupMemo')} />
      );
      return res;
    };
    const renderBizInfo = () => {
      if (isChinaSignup) {
        return renderBizInfoChina();
      }
      const fields1 = [
        { name: t('bizName'), placeholder: t('bizNamePlaceHolder'), key: 'data.bizName', isRequired: true },
        { name: i18n.get('mSignup.bizNumberOnlyNumbers'), placeholder: t('bizNumberPlaceHolder'), key: 'data.bizNumber', isRequired: true,
          onChange: (e) => onlyNumberFieldOnChange(e, 'data.bizNumber', 16) },
      ];
      const fields2 = [
        { name: t('returnAccountNumber'), placeholder: '123-456-123456', key: 'data.returnAccountNumber' }, // eslint-disable-line
        { name: t('returnAccountBank'), placeholder: t('returnAccountBankPlaceHolder'), key: 'data.returnAccountBank' }, // eslint-disable-line
        { name: t('returnAccountOwner'), placeholder: t('returnAccountOwnerPlaceHolder'), key: 'data.returnAccountOwner' }, // eslint-disable-line
      ];
      const bizImageField = renderBizImage();
      return fields1.map(renderField).concat([bizImageField]).concat(fields2.map(renderField));
    };
    const onSubmit = (e) => {
      e.preventDefault();
      const requiredFields = [
        { key: 'email', errorMsg: i18n.get('pcMain.signup.enterEmail') },
        { key: 'password', errorMsg: i18n.get('pcMain.signup.enterPassword') },
        { key: 'data.lastName', errorMsg: i18n.get('pcMain.signup.warningInputLastName') },
        { key: 'data.firstName', errorMsg: i18n.get('pcMain.signup.warningInputFirstName') },
        { key: 'data.tel', errorMsg: i18n.get('pcMain.signup.warningInputTel') },
      ];
      if (!isChinaSignup) {
        requiredFields.push({ key: 'data.bizName', errorMsg: i18n.get('pcMain.signup.warningInputBizName') });
        requiredFields.push({ key: 'data.bizNumber', errorMsg: i18n.get('pcMain.signup.warningInputBizNumber') });
      }
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
        window.alert(i18n.get('pcMain.signup.warningInputPasswordEqual'));
        return;
      }
      if (!isChinaSignup && !this.state.bizImageUrl) {
        window.alert(i18n.get('pcMain.signup.warningInputBizImage'));
        return;
      }
      if (!$('#terms_title').is(':checked')) {
        window.alert(i18n.get('pcMain.signup.pleaseAgreeTerms'));
        return;
      }
      if (!$('#policies_title').is(':checked')) {
        window.alert(i18n.get('pcMain.signup.pleaseAgreePolicy'));
        return;
      }
      if (user.data.firstName && user.data.lastName) {
        user.name = `${user.data.lastName} ${user.data.firstName}`;
      }
      const cb = (result) => {
        user.data.bizImage = result;
        handleSubmit(user);
      };
      if (this.state.bizImageUrl) {
        uploadUtil.uploadFile(this.state.bizImageUrl, cb);
      } else {
        handleSubmit(user);
      }
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
        <div className="signin-desc-bold">
          {i18n.get('pcMain.modalLogin.onlyRetailerLinkshopsService')}
        </div>
        <div className="signin-desc-light">
          {i18n.get('pcMain.modalLogin.signupPolicyDesc1')}<br />
          {i18n.get('pcMain.modalLogin.signupPolicyDesc2')}
        </div>
        <div className="signup-form-section">
          {renderField({ name: i18n.get('pcMain.signup.idEmail'), type: 'email', key: 'email', isRequired: true })}
          {renderField({ name: i18n.get('pcMain.signup.password'), type: 'password', key: 'password', isRequired: true })}
          {renderField({ name: i18n.get('pcMain.signup.passwordAgain'), type: 'password', key: 'passwordConfirm', isRequired: true })}
        </div>
        <div className="signup-form-section">
          <div className="signup-input-line">
            {renderField({ name: i18n.get('pcMain.signup.lastName'), className: 'signup-input-lastName', key: 'data.lastName', isRequired: true })}
            {renderField({ name: i18n.get('pcMain.signup.firstName'), className: 'signup-input-firstName', key: 'data.firstName', isRequired: true })}
          </div>
          <div className="form-tel">
            <div className="form-tel-line">
              <div className="area-code" onClick={toggleNumberDropdown}>
                <img src={areaCodes[activeAreaCodeIndex].img} /> {areaCodes[activeAreaCodeIndex].number}
                <div className="arrow-down"></div>
              </div>
              <input
                className="required"
                id="tel"
                onChange={(e) => (
                onlyNumberFieldOnChange ? onlyNumberFieldOnChange(e, 'data.tel', 15) : onChange(e, 'data.tel')
              )}
                value={_.get(this.state, 'data.tel') || ''}
                type="text" placeholder={i18n.get('mSignup.telOnlyNumbers')}
              />
            </div>
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
            {i18n.get('pcMain.signup.agreeToTermsOfUse')} <span>*</span>
            <Link to="/user/terms" className="show-detail">{i18n.get('mSignup.seeDetail')}</Link>
          </div>
          <div className="signup-terms-policies-line">
            <input id="policies_title" type="checkbox" />
            <label onClick={() => $('#policies_title').click()}></label>
            {i18n.get('pcMain.signup.agreeToPrivacyPolicy')} <span>*</span>
            <Link to="/user/policies" className="show-detail">{i18n.get('mSignup.seeDetail')}</Link>
          </div>
        </div>
        <div className="container">
          <button type="submit" className="signin-button">{i18n.get('mSignup.doSignup')}</button>
        </div>
      </form>
    );
  },
});
