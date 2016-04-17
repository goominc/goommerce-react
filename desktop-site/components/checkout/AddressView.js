// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    address: PropTypes.object,
    editAddress: PropTypes.func,
    isActive: PropTypes.bool,
    onClickMe: PropTypes.func,
  },
  render() {
    const { address, editAddress, isActive, onClickMe } = this.props;
    const renderEditButton = () => {
      if (isActive) {
        return (<div className="edit-box"><a onClick={() => editAddress(address)}>Edit</a></div>);
      }
      return null;
    };
    const onClick = () => {
      if (!isActive) {
        onClickMe(address);
      }
    };
    const fields = [
      { label: '받는 분', value: _.get(address, 'detail.name') },
      { label: '연락처', value: _.get(address, 'detail.tel') },
      { label: '우편번호', value: _.get(address, 'detail.postalCode') },
      { label: '주소', value: [_.get(address, 'detail.address.base') || '', _.get(address, 'detail.address.detail') || ''] },
    ];
    const renderValue = (value) => {
      if (value instanceof Array) {
        return value.map((v) => (<span key={v}>{v} <br /></span>));
      }
      return value;
    };
    return (
      <div className={`item ${isActive ? 'active' : ''}`}>
        <div className="title title-address">
          <input type="radio" checked={isActive} onClick={onClick} readOnly />
          {_.get(address, 'detail.alias') || '주소'}
        </div>
        <div className="add-address-box">
          {fields.map((field) => (
            <div key={field.label} className="row">
              <div className="label">{field.label}</div>
              <div className="control">{renderValue(field.value)}</div>
            </div>
          ))}
        </div>
        {/*
         <div onClick={onClick} className={`checkout-address-box${isActive ? ' selected' : ''}`}>
         <div className="field-box">
         <div className="field-label">name</div>
         <div className="field-text">{address.detail.name}</div>
         </div>
         <div className="field-box">
         <div className="field-label">C.C.</div>
         <div className="field-text">{address.countryCode}</div>
         </div>
         <div className="field-box">
         <div className="field-label">A.D.</div>
         <div className="field-text">{address.detail.streetAddress}</div>
         </div>
         <div className="field-box">
         <div className="field-label"></div>
         <div className="field-text">{address.detail.city}</div>
         </div>
         {renderEditButton()}
         </div>
         */}
      </div>
    );
  },
});
