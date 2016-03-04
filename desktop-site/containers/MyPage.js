// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import MyPageHeader from 'components/mypage/MyPageHeader';
import MyPageLeftbar from 'components/mypage/MyPageLeftbar';
import MyOrderContainer from 'containers/MyOrderContainer';
import WishListContainer from 'containers/WishListContainer';
import FavoriteBrandContainer from 'containers/FavoriteBrandContainer';

export default React.createClass({
  render() {
    const menuName = _.get(this.props, 'params.menuName');
    const renderSubmenu = () => {
      if (menuName === 'my_orders') {
        return (<MyOrderContainer />);
      } else if (menuName === 'wish_list') {
        return (<WishListContainer />);
      } else if (menuName === 'favorite_brands') {
        return (<FavoriteBrandContainer />);
      }
      return (<div></div>);
    };
    const containerStyle = { backgroundColor: '#f2f2f2' };
    return (
      <div style={containerStyle}>
        <MyPageHeader menuName={menuName} />
        <div className="mypage-contents-container">
          <MyPageLeftbar />
          {renderSubmenu()}
        </div>
      </div>
    );
  },
});
