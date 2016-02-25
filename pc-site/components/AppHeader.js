import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import i18n from '../../commons/utils/i18n';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    changeLocale: PropTypes.func.isRequired,
    changeCurrency: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
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
    const { auth, handleLogout, handleSearch, cart, changeLocale, changeCurrency } = this.props;
    const { activeLocale, activeCurrency } = this.context;
    let cartCount = 0;
    if (cart && cart.productVariants) {
      cartCount = cart.productVariants.length;
    }
    const renderLocales = () => {
      const locales = [
        { locale: 'ko', text: '한국어' },
        { locale: 'en', text: 'English' },
        { locale: 'zh_cn', text: '쭝꿔' },
      ];
      return (
        <div className="dropdown-box">
          {locales.map((obj) => {
            return (<div key={obj.locale} className={`dropdown-menu ${obj.locale === activeLocale ? 'active' : ''}`}
                         onClick={() => changeLocale(obj.locale)}>{obj.text}</div>);
          })}
        </div>
      );
    };
    const renderCurrencies = () => {
      const currencies = ['KRW', 'USD', 'CNY', 'RMB'];
      return (
        <div className="dropdown-box">
          {currencies.map((obj) => {
            return (<div key={obj} className={`dropdown-menu ${obj === activeCurrency ? 'active': ''}`}
                         onClick={() => changeCurrency(obj)}>{obj}</div>);
          })}
        </div>
      );
    };
    const dropDown = (
      <div className="dropdown-box">
        <div className="dropdown-menu" onClick={handleLogout}>{i18n.get('pcMain.myMenu.logout', activeLocale)}</div>
        <div className="dropdown-menu"><Link to="/mypage">{i18n.get('pcMain.myMenu.myLinkshops', activeLocale)}</Link></div>
        <div className="dropdown-menu"><Link to="/mypage">{i18n.get('pcMain.myMenu.myOrder', activeLocale)}</Link></div>
      </div>
    );

    return (
      <div className="header-wide-container">
        <div className="top-banner"></div>
        <div className="top-helper-bar">
          <div className="container">
            <div className="right-menus">
              <div className="right-menu-item">
                Language
                {renderLocales()}
              </div>
              <div className="right-menu-divider"></div>
              <div className="right-menu-item">
                Currency
                {renderCurrencies()}
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
              <button className="header-search-button" onClick={() => handleSearch(this.refs.searchQuery.value)}>
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
                {auth.bearer && dropDown}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
