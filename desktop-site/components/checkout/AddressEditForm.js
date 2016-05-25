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
  render() {
    // TODO defaults with auth values
    const { addressForEdit, submitAddress, cancelEditAddress } = this.props;
    const renderFormField = (obj) => (
      <div key={obj.objKey} className="form-box">
        <div className="form-label">{`${obj.text}`}</div>
        <div className="form-control">
          <input
            id={obj.objKey}
            type="text"
            defaultValue={_.get(addressForEdit, obj.key)}
            ref={obj.objKey}
            placeholder={obj.placeholder}
            readOnly={obj.isReadOnly}
          />
        </div>
      </div>
    );
    const addressFields = [
      { key: 'detail.alias', objKey: 'alias', text: i18n.get('pcPayment.title'), placeholder: '주소 별명' },
      { key: 'detail.name', objKey: 'name', text: i18n.get('pcPayment.fullName'), placeholder: '이름' },
      { key: 'detail.tel', objKey: 'tel', text: i18n.get('pcPayment.phoneNumber'), placeholder: '01012345678' },
      { key: 'detail.postalCode', objKey: 'postalCode', text: i18n.get('pcPayment.zipCode'), isReadOnly: true, placeholder: '00000' },
      { key: 'detail.address.base', objKey: 'address1', text: i18n.get('pcPayment.address'), isReadOnly: true, placeholder: '도로명주소' },
      { key: 'detail.address.detail', objKey: 'address2', text: '상세 주소', placeholder: '상세주소' },
    ];
    const handleSubmitAddress = (e) => {
      e.preventDefault();
      const addressForSave = { countryCode: 'KR' };
      if (addressForEdit.id) {
        addressForSave.id = addressForEdit.id;
      }
      for (let i = 0; i < addressFields.length; i++) {
        const field = addressFields[i];
        const value = _.get(this.refs, `${field.objKey}.value`);
        if (!value) {
          window.alert(`${field.text}를 입력해 주세요`);
          $(`${field.objKey}`).focus();
          return;
        }
        _.set(addressForSave, field.key, value);
      }
      submitAddress(addressForSave);
    };
    const openPostalCodePopup = (e) => {
      e.preventDefault();
      execDaumPostcode($('#postalCode'), $('#address1'));
    };
    const renderPostalCodeRow = (obj) => (
      <div key={obj.objKey} className="form-box">
        <div className="form-label">{`${obj.text}`}</div>
        <div className="form-control">
          <input
            className="input-postal-code"
            type="text"
            defaultValue={_.get(addressForEdit, obj.key)}
            ref={obj.objKey}
            placeholder={obj.placeholder}
            id={obj.objKey}
            readOnly={obj.isReadOnly}
          />
          <button className="btn-postal-code" onClick={openPostalCodePopup}>우편번호 찾기</button>
        </div>
      </div>
    );
    return (
      <form className="form-address-edit" onSubmit={handleSubmitAddress}>
        {addressFields.map((field) => {
          if (field.key === 'detail.postalCode') {
            return renderPostalCodeRow(field);
          }
          return renderFormField(field);
        })}
        <div className="form-box">
          <div className="form-label"></div>
          <div className="form-control">
            <button className="save-button" type="submit">등록</button>
            <button className="cancel-button" type="reset" onClick={cancelEditAddress}>취소</button>
          </div>
        </div>
      </form>
    );
  },
});
