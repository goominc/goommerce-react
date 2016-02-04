// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import { connect } from 'react-redux';

import MyPageHeader from '../components/mypage/MyPageHeader';
import MyPageLeftbar from '../components/mypage/MyPageLeftbar';
import MyOrderContainer from './MyOrderContainer';

const MyPage = React.createClass({
  render() {
    const containerStyle = { backgroundColor: '#f2f2f2' };
    return (
      <div style={containerStyle}>
        <MyPageHeader menuName="My Orders" />
        <div className="mypage-contents-container">
          <MyPageLeftbar />
          <MyOrderContainer />
        </div>
      </div>
    );
  },
});

export default connect(
)(MyPage);
