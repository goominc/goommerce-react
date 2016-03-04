// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    menuName: PropTypes.string,
  },
  render() {
    const menus = [
      { key: 'pcMain.myMenu.myLinkshops', menuName: 'mypage' },
      { key: 'pcMain.myMenu.myOrders', menuName: 'my_orders' },
      { key: 'word.wishlist', menuName: 'wish_list' },
      { key: 'pcMain.myMenu.favoriteBrands', menuName: 'favorite_brands' },
    ];
    const renderMenu = (menu) => {
      let className = 'mypage-nav-menu';
      if (menu.menuName === this.props.menuName) {
        className += ' active';
        return (<div key={menu.key} className={className}>{i18n.get(menu.key)}</div>);
      }
      return (
        <Link key={menu.key} to={`/mypage/${menu.menuName}`}>
          <div className={className}>{i18n.get(menu.key)}</div>
        </Link>
      );
    };
    return (
      <div className="mypage-navigation">
        <div className="mypage-nav-container">
          {menus.map(renderMenu)}
        </div>
      </div>
    );
  },
});
