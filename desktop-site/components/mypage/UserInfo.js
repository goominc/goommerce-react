// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import InputPersonalInfo from 'components/user/InputPersonalInfo';
import ChangePasswordPopup from 'components/popup/ChangePasswordPopup';
import i18n from 'commons/utils/i18n';
import { constants } from 'commons/utils/constants';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    cancel: PropTypes.func,
    onChange: PropTypes.func,
    onlyNumberFieldOnChange: PropTypes.func,
    save: PropTypes.func,
  },
  getInitialState() {
    const state = { isShowChangePasswordPopup: false };
    const areaCode = _.get(this.props, 'auth.data.areaCode');
    if (areaCode) {
      const { areaCodes } = constants;
      for (let i = 0; i < areaCodes.length; i++) {
        if (areaCodes[i].number === areaCode) {
          state.activeAreaCodeIndex = i;
          break;
        }
      }
    }
    return state;
  },
  render() {
    const { auth, onChange, onlyNumberFieldOnChange, save, cancel } = this.props;
    if (!auth || !auth.id) {
      return null;
    }
    const { isShowChangePasswordPopup } = this.state;
    const renderPopup = () => {
      if (isShowChangePasswordPopup) {
        return <ChangePasswordPopup closePopup={() => this.setState({ isShowChangePasswordPopup: false })} />;
      }
      return null;
    };

    const openChangePasswordPopup = () => {
      this.setState({ isShowChangePasswordPopup: true });
    };

    const { areaCodes } = constants;
    const activeAreaCodeIndex = this.state.activeAreaCodeIndex || 0;
    const toggleNumberDropdown = () => {
      const target = $('table .form-tel .dropdown-box');
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
        this.setState({ activeAreaCodeIndex: index });
        onChange({ target: { value: areaCodes[index].number } }, 'data.areaCode');
      };
      return (
        <div key={ac.name} onClick={onClick} className="dropdown-item">
          <img src={ac.img} /> {ac.name} <span className="number">{ac.number}</span>
        </div>
      );
    };

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
        <tr key={field.name}>
          <td className="label">{field.name}</td>
          <td>
            <input
              onChange={(e) => onChange(e, field.key)}
              type="text" placeholder={field.placeholder}
              readOnly={field.isReadOnly}
              value={_.get(auth, field.key)}
            />
          </td>
        </tr>
      );
      return (
        <div>
          <div className="title-line">
            <div className="title">{i18n.get('pcMain.signup.businessInformation')}</div>
          </div>
          <table>
            <tbody>
            {fields1.map(renderField)}
            {fields2.map(renderField)}
            </tbody>
          </table>
        </div>
      );
    };
    return (
      <div className="user-info-container">
        {renderPopup()}
        <div className="title-line">
          <div className="title">{i18n.get('pcMypage.idPassword')}</div>
        </div>
        <table>
          <tbody>
          <tr>
            <td className="label">{i18n.get('pcMain.signup.id')}</td>
            <td><input type="text" value={auth.email} readOnly /></td>
          </tr>
          <tr>
            <td className="label">{i18n.get('pcMain.signup.password')}</td>
            <td>
              <button className="user-info-change-password" onClick={openChangePasswordPopup}>
                {i18n.get('pcMypage.changePassword')}
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <div className="title-line">
          <div className="title">{i18n.get('pcMain.signup.personalInformation')}</div>
        </div>
        <table>
          <tbody>
          <tr>
            <td className="label">{i18n.get('pcMypage.name')}</td>
            <td>
              <input
                id="lastName" onChange={(e) => onChange(e, 'data.lastName')}
                defaultValue={auth ? _.get(auth, 'data.lastName') : ''}
                type="text" placeholder={i18n.get('pcMypage.lastName')}
              />
              <input
                id="firstName" onChange={(e) => onChange(e, 'data.firstName')}
                defaultValue={auth ? _.get(auth, 'data.firstName') : ''}
                type="text" placeholder={i18n.get('pcMypage.firstName')}
              />
            </td>
          </tr>
          <tr>
            <td className="label">{i18n.get('pcMypage.phoneNumber')}</td>
            <td>
              <div className="form-tel">
                <div className="area-code" onClick={toggleNumberDropdown}>
                  <img src={areaCodes[activeAreaCodeIndex].img} /> {areaCodes[activeAreaCodeIndex].number}
                  <div className="arrow-down"></div>
                </div>
                <input
                  id="tel"
                  onChange={(e) => (
                    onlyNumberFieldOnChange ? onlyNumberFieldOnChange(e, 'data.tel', 15) : onChange(e, 'data.tel')
                  )}
                  value={auth ? _.get(auth, 'data.tel') || '' : ''}
                  type="text" placeholder={i18n.get('pcMain.signup.pleaseEnterOnlyNumbersExcept')}
                />
                <div className="dropdown-box">
                  {areaCodes.map(renderAreaCodeDropdown)}
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        {renderBizInfo()}
        <div className="button-line">
          <button className="button-modify" onClick={() => save().then(() => window.alert('저장되었습니다'))}>{i18n.get('pcMypage.edit')}</button>
          <button className="button-cancel" onClick={cancel}>{i18n.get('pcMypage.cancel')}</button>
        </div>
      </div>
    );
  },
});
