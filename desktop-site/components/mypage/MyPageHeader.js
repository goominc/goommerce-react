// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    menus: PropTypes.array,
    menuName: PropTypes.string,
  },
  render() {
    const { menus } = this.props;
    const renderMenu = (menu) => {
      let className = 'mypage-nav-menu';
      if (menu.menuName === this.props.menuName) {
        className += ' active';
        return (<div key={menu.key} className={className}><span>{i18n.get(menu.key)}</span></div>);
      }
      return (
        <Link key={menu.key} to={`/mypage/${menu.menuName}`}>
          <div className={className}>{i18n.get(menu.key)}</div>
        </Link>
      );
    };
    return (
      <div>
        <div className="mypage-nav-container">
          {menus.map(renderMenu)}
        </div>
      </div>
    );
  },
});
