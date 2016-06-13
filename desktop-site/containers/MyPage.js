// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CsvOrderUploadContainer from 'containers/CsvOrderUploadContainer';
import MyPageHeader from 'components/mypage/MyPageHeader';
import MyPageDashboard from 'components/mypage/MyPageDashboard';
import MyOrderContainer from 'containers/MyOrderContainer';
import Reorder from 'containers/Reorder';
import UserInfoContainer from 'containers/UserInfoContainer';

import roleUtil from 'commons/utils/roleUtil';

const _ = require('lodash');

const MyPage = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    menuName: PropTypes.string,
    orderSummary: PropTypes.array,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  componentDidMount() {
    this.context.ApiAction.loadMyOrderSummary();
  },
  render() {
    const { auth, children, menuName } = this.props;
    const menus = [
      { key: 'pcMain.myMenu.myOrders', menuName: 'orders' },
      { key: 'pcMain.myMenu.userInfo', menuName: 'user_info' },
      // { key: 'word.wishList', menuName: 'wish_list' },
      // { key: 'word.favoriteBrand', menuName: 'favorite_brands' },
    ];
    if (roleUtil.hasRole(auth, ['bigBuyer', 'admin'])) {
      menus.push({ key: 'word.reorder', menuName: 'reorder' });
      // menus.push({ key: 'pcMain.myMenu.cvsOrderUpload', menuName: 'csv_order_upload' });
    }
/*
    const menuComponents = [
      <MyOrderContainer />,
      <UserInfoContainer />,
      // <WishListContainer />,
      // <FavoriteBrandContainer />,
      <Reorder />,
      <CsvOrderUploadContainer />,
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
    */
    return (
      <div>
        <MyPageDashboard {...this.props} />
        <div className="mypage-contents-container">
          <MyPageHeader menus={menus} menuName={menuName} />
          {/* menuComponents[menuIndex] */}
          {children && React.cloneElement(children, {
            auth,
          })}
        </div>
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    auth: state.auth,
    menuName: state.mypage.menuName,
    orderSummary: state.order.summary,
  }),
)(MyPage);
