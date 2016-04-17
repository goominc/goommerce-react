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
    let menuName = _.get(this.props, 'params.menuName');
    const menus = [
      { key: 'pcMain.myMenu.myOrders', menuName: 'my_orders' },
      { key: 'word.wishList', menuName: 'wish_list' },
      { key: 'word.favoriteBrand', menuName: 'favorite_brands' },
      { key: 'word.reorder', menuName: 'reorder' },
    ];
    let menuIndex = 0;
    for (let i = 1; i < menus.length; i++) {
      if (menuName === menus[i].menuName) {
        menuIndex = i;
        break;
      }
    }
    // 2016. 04. 17. [heekyu] handle when default
    menuName = menus[menuIndex].menuName;
    const menuComponents = [
      <MyOrderContainer />,
      <WishListContainer />,
      <FavoriteBrandContainer />,
      <Reorder />,
    ];
    return (
      <div>
        <MyPageHeader menus={menus} menuName={menuName} />
        {menuComponents[menuIndex]}
      </div>
    );
  },
});
