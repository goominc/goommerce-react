// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import * as _ from 'lodash';

export default React.createClass({
  propTypes: {
    addressForEdit: PropTypes.object,
    addressFields: PropTypes.array,
    submitAddress: PropTypes.func,
  },
  render() {
    const { addressForEdit, addressFields, submitAddress, cancelEditAddress } = this.props;
    const renderFormField = (obj) => (
      <div key={obj.objKey} className="form-box">
        <div className="form-label">{`${obj.text}`}</div>
        <div className="form-control">
          <input type="text" defaultValue={_.get(addressForEdit, obj.key)} ref={obj.objKey} />
        </div>
      </div>
    );
    const handleSubmitAddress = (e) => {
      e.preventDefault();
      const addressForSave = { countryCode: 'KR' };
      if (addressForEdit.id) {
        addressForSave.id = addressForEdit.id;
      }
      addressFields.forEach((field) => {
        _.set(addressForSave, field.key, _.get(this.refs, `${field.objKey}.value`));
      });
      submitAddress(addressForSave);
    };
    return (
      <form className="form-address-edit" onSubmit={handleSubmitAddress}>
        {addressFields.map((field) => renderFormField(field))}
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
