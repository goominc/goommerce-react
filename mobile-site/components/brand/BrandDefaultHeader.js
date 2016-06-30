// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    isOpenMenu: PropTypes.bool,
    toggleBrandPageMenu: PropTypes.func,
  },
  render() {
    const { isOpenMenu, toggleBrandPageMenu } = this.props;
    return (
      <div className="brand-default-header">
        <span className={`menu${isOpenMenu ? ' active' : ''}`} onClick={toggleBrandPageMenu}>MENU</span>
        <div className="right-box">
          <Link to="/wishlist"><i className="icon-heart-red_brand1"></i></Link>
          <Link to="/cart"><i className="icon-cart_brand1"></i></Link>
        </div>
      </div>
    );
  },
});
