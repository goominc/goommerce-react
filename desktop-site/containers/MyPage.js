// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import MyPageHeader from 'components/mypage/MyPageHeader';
import MyOrderContainer from 'containers/MyOrderContainer';
import WishListContainer from 'containers/WishListContainer';
import UserInfoContainer from 'containers/UserInfoContainer';
import Reorder from 'containers/Reorder';
import FavoriteBrandContainer from 'containers/FavoriteBrandContainer';

import roleUtil from 'commons/utils/roleUtil';

const _ = require('lodash');

const MyPage = React.createClass({
  propTypes: {
    auth: PropTypes.auth,
  },
  render() {
    const { auth } = this.props;
    let menuName = _.get(this.props, 'params.menuName');
    const menus = [
      { key: 'pcMain.myMenu.myOrders', menuName: 'my_orders' },
      { key: 'pcMain.myMenu.userInfo', menuName: 'user_info' },
      { key: 'word.wishList', menuName: 'wish_list' },
      { key: 'word.favoriteBrand', menuName: 'favorite_brands' },
    ];
    if (roleUtil.hasRole(auth, ['bigBuyer', 'admin'])) {
      menus.push({ key: 'word.reorder', menuName: 'reorder' });
    }

    const menuComponents = [
      <MyOrderContainer />,
      <UserInfoContainer />,
      <WishListContainer />,
      <FavoriteBrandContainer />,
      <Reorder />,
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
    return (
      <div>
        <MyPageHeader menus={menus} menuName={menuName} />
        {menuComponents[menuIndex]}
      </div>
    );
  },
});

export default connect(
  (state) => ({ auth: state.auth }),
)(MyPage);
