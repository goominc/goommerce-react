// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import stringUtil from 'commons/utils/stringUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    address: PropTypes.object,
    editAddress: PropTypes.func,
    deleteAddress: PropTypes.func,
    isActive: PropTypes.bool,
    onClickMe: PropTypes.func,
  },
  render() {
    const { address, editAddress, deleteAddress, isActive, onClickMe } = this.props;
    const renderEditButton = () => {
      if (isActive) {
        return (<a className="edit-box" onClick={() => editAddress(address)}>{i18n.get('pcPayment.edit')}</a>);
      }
      return null;
    };
    const onClick = () => {
      if (!isActive) {
        onClickMe(address);
      }
    };
    const getString = (key) => stringUtil.shorten(_.get(address, key) || '', 13);
    const fields = [
      { label: i18n.get('pcPayment.contactName'), value: _.get(address, 'detail.name') },
      { label: i18n.get('pcPayment.phoneNumber'), value: _.get(address, 'detail.tel') },
      { label: i18n.get('pcPayment.zipCode'), value: _.get(address, 'detail.postalCode') },
      { label: i18n.get('pcPayment.address'), value: [getString('detail.address.base'), getString('detail.address.detail')] },
    ];
    const renderValue = (value) => {
      if (value instanceof Array) {
        return value.map((v, index) => (<span key={`val-${index}`}>{v} <br /></span>));
      }
      return value;
    };
    const onDelete = () => {
      if (window.confirm(`(${_.get(address, 'detail.alias') || '주소'}) 을/를 삭제하시겠습니까?`)) {
        deleteAddress(address);
      }
    };
    return (
      <div className={`item ${isActive ? 'active' : ''}`}>
        <div className="title-address">
          <input type="radio" checked={isActive} onClick={onClick} readOnly />
          {_.get(address, 'detail.alias') || '주소'}
          <div className="action-line">
            {renderEditButton()}
            <a key={`delete-address-${address.id}`} className="edit-box" onClick={onDelete}>{i18n.get('pcPayment.remove')}</a>
          </div>
        </div>
        <div className="add-address-box">
          {fields.map((field) => (
            <div key={field.label} className="row">
              <div className="label">{field.label}</div>
              <div className="control">{renderValue(field.value)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
