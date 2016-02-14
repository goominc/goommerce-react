import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import i18n from '../../commons/utils/i18n';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired,
  },
  renderAccount() {
    const { auth } = this.props;
    if (auth.bearer) {
      return (
        <div className="account-menus-wrap">
          <span>Hi, </span>
          <div className="my-linkshops">
            <span>{auth.email}</span>
          </div>
        </div>
      );
    }
    return (
      <div className="account-menus-wrap">
        <Link to="/accounts/signin"><span>Sign In</span></Link>
        <span className="ua-line">|</span>
        <Link to="/accounts/signup"><span>Join</span></Link>
        <div className="my-linkshops">
          <span>My Linkshops</span>
        </div>
      </div>
    );
  },
  render() {
    const { handleSearch, cart } = this.props;
    let cartCount = 0;
    if (cart && cart.productVariants) {
      cartCount = cart.productVariants.length;
    }
    return (
      <div className="header-wide-container">
        <div className="top-helper-bar">
          <div className="container">
            <div className="right-menus">
              <div className="right-menu-item">
                Language
                <div className="dropdown-box">
                  <div className="dropdown-menu">한국어</div>
                  <div className="dropdown-menu">English</div>
                  <div className="dropdown-menu">쭝꿔</div>
                </div>
              </div>
              <div className="right-menu-divider"></div>
              <div className="right-menu-item">
                Currency
                <div className="dropdown-box">
                  <div className="dropdown-menu">KRW</div>
                  <div className="dropdown-menu">USD</div>
                </div>
              </div>
              <div className="right-menu-divider"></div>
            </div>
          </div>
        </div>
        <div className="container header">
          <div className="header-wrap">
            <Link className="header-item" to="/">
              <img className="header-logo" src="http://www.linkshops.com/skin/frontend/linkshops2nd/default/images/logo.png" alt="Linkshops"/>
            </Link>
            <div className="header-search-box">
              <input ref="searchQuery" placeholder="I'm shopping for..." />
              <div className="header-search-category-box">
                <div className="search-divider"></div>
                <div className="arrow-down"></div>
                All Categories
                <div className="search-dropdown-box">
                  <div className="search-dropdown-item">C1</div>
                </div>
              </div>
              <button className="header-search-button" onClick={handleSearch}>
              </button>
            </div>
            <div className="header-mymenu-wrap">
              <Link className="header-item" to="/cart">
                <div className="header-mymenu-cart">
                  <div className="cart-icon"></div>
                  <span className="cart-count">{cartCount}</span>
                  <span>Cart</span>
                </div>
              </Link>
              <div className="header-mymenu-account">
                <div className="account-icon"></div>
                {this.renderAccount()}
                <div className="dropdown-box">
                  <div className="dropdown-menu">{i18n.get('pcMain.myMenu.logout')}</div>
                  <div className="dropdown-menu"><Link to="/mypage">{i18n.get('pcMain.myMenu.myLinkshops')}</Link></div>
                  <div className="dropdown-menu"><Link to="/mypage">{i18n.get('pcMain.myMenu.myOrder')}</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
