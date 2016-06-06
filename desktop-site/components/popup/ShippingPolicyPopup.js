// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    cmsData: PropTypes.object,
    closePopup: PropTypes.func,
  },
  render() {
    const { cmsData, closePopup } = this.props;
    if (!cmsData) {
      return null;
    }
    return (
      <div>
        <div className="popup-overlay"></div>
        <div className="shipping-policy-container">
          <div className="popup-close-button" onClick={closePopup}></div>
          <div dangerouslySetInnerHTML={({ __html: cmsData.data })} />
          <div className="form-button-line">
            <button className="button-back" onClick={closePopup}>{i18n.get('word.confirm')}</button>
          </div>
        </div>
      </div>
    );
  },
});
