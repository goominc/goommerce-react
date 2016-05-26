// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    closePopup: PropTypes.func,
  },
  render() {
    const { closePopup } = this.props;
    return (
      <div>
        <div className="popup-overlay" onClick={closePopup}></div>
        <div className="add-cart-popup">
          <div className="popup-title">
            <span>{i18n.get('pcCart.popupProductAdded')}</span>
            <div className="button-line">
              <Link to="/cart" onClick={closePopup}><button>{i18n.get('pcCart.popupGoCart')}</button></Link>
              <button onClick={closePopup}>{i18n.get('pcCart.popupContinueShopping')}</button>
            </div>
            <div className="popup-close-button" onClick={this.props.closePopup}></div>
          </div>
        </div>
      </div>
    );
  },
});
