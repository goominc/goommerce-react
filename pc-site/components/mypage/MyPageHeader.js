// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    menuName: PropTypes.string,
  },
  render() {
    const menus = [
      { title: 'My Linkshops', menuName: 'mypage' },
      { title: 'My Orders', menuName: 'my_orders' },
      { title: 'Wish List', menuName: 'wish_list' },
      { title: 'My Favorite Brands', menuName: 'favorite_brands' },
    ];
    const renderMenu = (menu) => {
      let className = 'mypage-nav-menu';
      if (menu.menuName === this.props.menuName) {
        className += ' active';
        return (<div key={menu.title} className={className}>{menu.title}</div>);
      }
      return (
        <Link key={menu.title} to={`/mypage/${menu.menuName}`}>
          <div className={className}>{menu.title}</div>
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
