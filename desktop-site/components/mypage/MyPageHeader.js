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
        <div key={menu.key} className={className}>
          <Link to={`/mypage/${menu.menuName}`}>{i18n.get(menu.key)}</Link>
        </div>
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
