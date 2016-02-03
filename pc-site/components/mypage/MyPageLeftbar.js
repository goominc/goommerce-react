// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="mypage-leftbar-box">
        <div className="mypage-leftbar-title">
          Manage Orders
        </div>
        <div className="mypage-leftbar-item"><span>All Orders</span></div>
        <div className="mypage-leftbar-item"><span>Shipping Address</span></div>
      </div>
    );
  },
});
