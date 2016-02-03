// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import { connect } from 'react-redux';

import MyPageHeader from '../components/mypage/MyPageHeader';
import MyPageLeftbar from '../components/mypage/MyPageLeftbar';

const MyPage = React.createClass({
  render() {
    const containerStyle = { backgroundColor: '#f2f2f2' };
    return (
      <div style={containerStyle}>
        <MyPageHeader menuName="My Orders" />
        <div className="mypage-contents-container">
          <MyPageLeftbar />
          <div className="mypage-right-box">
            <h2>Orders</h2>
            <div className="order-status-bar">
              <span>Before Payment</span>
              <span className="active">Before shipping</span>
              <span>On Delivery</span>
              <span>Complete</span>
            </div>
            <div className="order-search-bar">
              Order Number:  <input type="text" />
              Product:  <input type="text" />
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default connect(
)(MyPage);
