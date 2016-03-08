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
        <div className="add-cart-popup">
          <div className="popup-title">
            <span>A new item has been added to your Shopping Cart. You now have 1 items in your Shopping Cart.</span>
            <div className="button-line">
              <Link to="/cart" onClick={closePopup}><button>View Shopping Cart</button></Link>
              <Link to="/categories/all" onClick={closePopup}><button>Continue Shopping</button></Link>
            </div>
            <div className="popup-close-button" onClick={this.props.closePopup}>X</div>
          </div>
        </div>
      </div>
    );
  },
});
