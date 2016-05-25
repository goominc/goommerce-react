// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    const addressString = `${_.get(order, 'address.detail.address.base') || '&'} ${_.get(order, 'address.detail.address.detail') || ''}`;
    const addressFields = [
      { label: i18n.get('pcMypage.fullName'), value: _.get(order, 'address.detail.name') || '' },
      { label: i18n.get('pcMypage.phoneNumber'), value: _.get(order, 'address.detail.tel') || '' },
      { label: i18n.get('pcMypage.zipCode'), value: _.get(order, 'address.detail.postalCode') || '' },
      { label: i18n.get('pcMypage.address'), value: addressString },
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
