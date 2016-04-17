// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    const addressString = `${_.get(order, 'address.detail.address.base') || ''} ${_.get(order, 'address.detail.address.detail') || ''}`;
    const addressFields = [
      { label: '받는 분', value: _.get(order, 'address.detail.name') || '' },
      { label: '연락처', value: _.get(order, 'address.detail.tel') || '' },
      { label: '우편번호', value: _.get(order, 'address.detail.postalCode') || '' },
      { label: '주소', value: addressString },
    ];
    const renderField = (field) => (
      <div key={field.label} className="row">
        <div className="label">{field.label}</div>
        <div className={`control ${field.className || ''}`}>{field.value || '&'}</div>
      </div>
    );
    return (
      <div className="simple-key-value-container">
        {addressFields.map(renderField)}
      </div>
    );
  },
});
