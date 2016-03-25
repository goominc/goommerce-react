// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import MyPageHeader from 'components/mypage/MyPageHeader';
import MyPageLeftbar from 'components/mypage/MyPageLeftbar';
import MyOrderContainer from 'containers/MyOrderContainer';
import WishListContainer from 'containers/WishListContainer';
import Reorder from 'containers/Reorder';
import FavoriteBrandContainer from 'containers/FavoriteBrandContainer';

const _ = require('lodash');

export default React.createClass({
  render() {
    const menuName = _.get(this.props, 'params.menuName');
    const menus = [
      { key: 'pcMain.myMenu.myLinkshops', menuName: 'mypage' },
      { key: 'pcMain.myMenu.myOrders', menuName: 'my_orders' },
      { key: 'word.wishlist', menuName: 'wish_list' },
      { key: 'pcMain.myMenu.favoriteBrands', menuName: 'favorite_brands' },
      { key: 'pcMain.myMenu.reorder', menuName: 'reorder' },
    ];
    let menuIndex = 0;
    for (let i = 1; i < menus.length; i++) {
      if (menuName === menus[i].menuName) {
        menuIndex = i;
        break;
      }
    }
    const menuComponents = [
      <div></div>,
      <MyOrderContainer />,
      <WishListContainer />,
      <FavoriteBrandContainer />,
      <Reorder />,
    ];
    const containerStyle = { backgroundColor: '#f2f2f2' };
    return (
      <div style={containerStyle}>
        <MyPageHeader menus={menus} menuName={menuName} />
        {menuComponents[menuIndex]}
      </div>
    );
  },
});
