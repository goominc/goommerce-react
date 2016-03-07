// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

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
    return (
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
    );
  },
});
