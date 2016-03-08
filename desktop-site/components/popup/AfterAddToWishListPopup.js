// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    closePopup: PropTypes.func,
  },
  render() {
    const { closePopup } = this.props;
    return (
      <div>
        <div className="popup-overlay" onClick={closePopup}></div>
        <div className="add-wish-popup">
          <div className="popup-title">
            <span>Added to Wish List</span>
            <Link to="/mypage/wish_list" onClick={closePopup}>
              <button className="visit-wish-list-button">Visit Wish List</button>
            </Link>
            <button onClick={closePopup}>Continue Shopping</button>
          </div>
          <div className="popup-close-button" onClick={closePopup}>X</div>
        </div>
      </div>
    );
  },
});
