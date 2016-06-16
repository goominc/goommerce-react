// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import * as _ from 'lodash';

import { execDaumPostcode } from 'commons/utils/addressUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    addressForEdit: PropTypes.object,
    submitAddress: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
  },
  getInitialState() {
    const { addressForEdit } = this.props;
    if (addressForEdit && addressForEdit.id) {
      return addressForEdit;
    }
    const localeToCountryCode = {
      ko: 'KR',
      // en: '',
      'zh-cn': 'CN',
      'zh-tw': 'TW',
    };
    return {
      countryCode: localeToCountryCode[this.context.activeLocale] || 'ETC',
      data: {},
    };
  },
  render() {
    // TODO defaults with auth values
    const { submitAddress, cancelEditAddress } = this.props;

    const addressForEdit = this.state;

    const onChange = (e, key) => {
      const nextState = {};
      _.set(nextState, key, e.target.value);
      this.setState(_.merge(this.state, nextState));
    };
    const renderFormField = (obj) => (
      <div key={obj.objKey} className="form-box">
        <div className="form-label">{`${obj.text}`}</div>
        <div className="form-control">
          {obj.enums ?
            <select onChange={(e) => onChange(e, obj.key)} value={_.get(addressForEdit, obj.key) || obj.enums[0]}>
              {obj.enums.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
            :
            <input
              id={obj.objKey}
              type="text"
              value={_.get(addressForEdit, obj.key)}
              onChange={(e) => onChange(e, obj.key)}
              placeholder={obj.placeholder}
              readOnly={obj.isReadOnly}
            />
          }
        </div>
      </div>
    );
    const addressFields = [
      { key: 'detail.alias', objKey: 'alias', text: i18n.get('pcPayment.alias'), placeholder: i18n.get('mOrder.addressAliasPlaceHolder') },
      { key: 'detail.name', objKey: 'name', text: i18n.get('pcPayment.contactName'), placeholder: i18n.get('word.name') },
      { key: 'detail.tel', objKey: 'tel', text: i18n.get('pcPayment.phoneNumber'), placeholder: '01012345678' },
      { key: 'detail.postalCode', objKey: 'postalCode', text: i18n.get('pcPayment.zipCode'), isReadOnly: true, placeholder: '00000' },
      { key: 'detail.address.base', objKey: 'address1', text: i18n.get('pcPayment.address'), isReadOnly: true, placeholder: i18n.get('mOrder.addressRoadPlaceHolder') },
      { key: 'detail.address.detail', objKey: 'address2', text: i18n.get('mOrder.addressDetailPlaceHolder'), placeholder: i18n.get('mOrder.addressDetailPlaceHolder') },
    ];
    // 2016. 05. 30. [heekyu] 'KR' is not oversea country code
    const countryCodes = ['CN', 'TW', 'HK', 'MO', 'ETC'];
    const addressFieldsOversea = [
      { key: 'countryCode', objKey: 'countryCode', text: 'country code', placeholder: '', enums: countryCodes },
      { key: 'detail.alias', objKey: 'alias', text: i18n.get('pcPayment.alias'), placeholder: i18n.get('mOrder.addressAliasPlaceHolder') },
      { key: 'detail.name', objKey: 'name', text: i18n.get('pcPayment.contactName'), placeholder: i18n.get('word.name') },
      { key: 'detail.tel', objKey: 'tel', text: i18n.get('pcPayment.phoneNumber'), placeholder: '01012345678' },
      { key: 'detail.address.base', objKey: 'address1', text: i18n.get('mOrder.address1PlaceHolder'), placeholder: i18n.get('mOrder.address1PlaceHolder') },
      { key: 'detail.address.detail', objKey: 'address2', text: i18n.get('mOrder.address2PlaceHolder'), placeholder: i18n.get('mOrder.address2PlaceHolder') },
      { key: 'detail.address.city', objKey: 'city', text: i18n.get('mOrder.cityPlaceHolder'), placeholder: i18n.get('mOrder.cityPlaceHolder') },
      { key: 'detail.postalCode', objKey: 'postalCode', text: i18n.get('mOrder.zipCodePlaceHolder'), placeholder: i18n.get('mOrder.zipCodePlaceHolder') },
    ];
    const { countryCode } = this.state;
    const handleSubmitAddress = (e) => {
      e.preventDefault();
      const addressForSave = { countryCode };
      if (addressForEdit.id) {
        addressForSave.id = addressForEdit.id;
      }
      for (let i = 0; i < addressFields.length; i++) {
        const field = addressFields[i];
        let value = _.get(this.state, field.key);
        if (!value) {
          value = $(`#${field.objKey}`).val();
        }
        if (!value) {
          window.alert(`${field.text}를 입력해 주세요`);
          $(`#${field.objKey}`).focus();
          return;
        }
        _.set(addressForSave, field.key, value);
      }
      submitAddress(addressForSave);
    };
    const openPostalCodePopup = (e) => {
      e.preventDefault();
      const cb = (postalCode, address1) => {
        onChange({ target: { value: postalCode } }, 'detail.postalCode');
        onChange({ target: { value: address1 } }, 'detail.address.base');
      };
      execDaumPostcode(cb);
    };
    const renderPostalCodeRow = (obj) => (
      <div key={obj.objKey} className="form-box">
        <div className="form-label">{`${obj.text}`}</div>
        <div className="form-control">
          <input
            className="input-postal-code"
            type="text"
            value={_.get(addressForEdit, obj.key)}
            onChange={(e) => onChange(e, obj.key)}
            placeholder={obj.placeholder}
            id={obj.objKey}
            readOnly={obj.isReadOnly}
          />
          <button className="btn-postal-code" onClick={openPostalCodePopup}>우편번호 찾기</button>
        </div>
      </div>
    );
    const isDefaultCountryCode = countryCode !== 'KR';
    const changeCountryCode = (code) => {
      if (addressForEdit.id) {
        // 2016. 05. 30. [heekyu] when modifing, cannot change KR -> OTHER or OTHER -> KR
        if (addressForEdit.countryCode === 'KR' && code !== 'KR') {
          window.alert(i18n.get('mOrder.denyDomesticToOverseas'));
          return;
        }
        if (addressForEdit.countryCode !== 'KR' && code === 'KR') {
          window.alert(i18n.get('mOrder.denyOverseasToDomestic'));
          return;
        }
      }
      if (code !== countryCode) {
        this.setState({ countryCode: code });
      }
    };
    const renderAllFields = () => {
      if (countryCode === 'KR') {
        return addressFields.map((field) => {
          if (field.key === 'detail.postalCode') {
            return renderPostalCodeRow(field);
          }
          return renderFormField(field);
        });
      }
      return addressFieldsOversea.map(renderFormField);
    };
    return (
      <form className="form-address-edit" onSubmit={handleSubmitAddress}>
        <div className="tab-line">
          <div
            className={`item ${countryCode === 'KR' ? 'active' : ''}`}
            onClick={() => (countryCode !== 'KR' ? changeCountryCode('KR') : null)}
          >
            {i18n.get('word.domestic')}
          </div>
          <div
            className={`item ${isDefaultCountryCode ? 'active' : ''}`}
            onClick={() => (!isDefaultCountryCode ? changeCountryCode('ETC') : null)}
          >
            {i18n.get('word.overseas')}
          </div>
        </div>
        {renderAllFields()}
        <div className="form-box">
          <div className="form-label"></div>
          <div className="form-control">
            <button className="save-button" type="submit">{i18n.get('word.save')}</button>
            <button className="cancel-button" type="reset" onClick={cancelEditAddress}>{i18n.get('word.cancel')}</button>
          </div>
        </div>
      </form>
    );
  },
});
