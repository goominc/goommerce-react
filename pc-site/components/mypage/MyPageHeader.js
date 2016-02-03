// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    menuName: PropTypes.string,
  },
  render() {
    const menus = ['My Linkshops', 'My Orders', 'My Favourite Sellers'];
    const renderMenu = (menu) => {
      let className = 'mypage-nav-menu';
      if (menu === this.props.menuName) {
        className += ' active';
      }
      return (<div key={menu} className={className}>{menu}</div>);
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
