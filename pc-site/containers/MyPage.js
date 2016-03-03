// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import { connect } from 'react-redux';

import MyPageHeader from '../components/mypage/MyPageHeader';
import MyPageLeftbar from '../components/mypage/MyPageLeftbar';
import MyOrderContainer from './MyOrderContainer';
import WishListContainer from './WishListContainer';

const MyPage = React.createClass({
  render() {
    const renderSubmenu = () => {
      const menuName = _.get(this.props, 'params.menuName');
      if (menuName === 'my_orders') {
        return (<MyOrderContainer />);
      } else if (menuName === 'wish_list') {
        return (<WishListContainer />);
      }
      return (<div></div>);
    };
    const containerStyle = { backgroundColor: '#f2f2f2' };
    return (
      <div style={containerStyle}>
        <MyPageHeader menuName="My Orders" />
        <div className="mypage-contents-container">
          <MyPageLeftbar />
          {renderSubmenu()}
        </div>
      </div>
    );
  },
});

export default connect(
)(MyPage);
