// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import orderUtil from 'commons/utils/orderUtil';
import i18n from 'commons/utils/i18n';

const _ = require('lodash');

export default React.createClass({
  propTypes: {
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    categories: PropTypes.object,
    activeCategory: PropTypes.object,
    showSearchDropdown: PropTypes.bool,
    toggleSearchDropdown: PropTypes.func.isRequired,
    selectSearchDropdown: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    changeLocale: PropTypes.func.isRequired,
    changeCurrency: PropTypes.func.isRequired,
    params: PropTypes.object,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.query !== this.props.params.query) {
      this.refs.searchQuery.value = nextProps.params.query || '';
    }
  },
  renderAccount() {
    const { auth } = this.props;
    const getName = (email) => {
      const idx = email.indexOf('@');
      if (idx > 0) {
        return email.substring(0, idx);
      }
      return email;
    };
    if (auth.bearer) {
      return (
        <div className="account-menus-wrap">
          <span>{i18n.get('word.hi')} </span>
          <div className="my-linkshops">
            <span>{getName(auth.email)}</span>
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
    const { auth, handleLogout, handleSearch, cart, categories, changeLocale, changeCurrency } = this.props;
    const { toggleSearchDropdown, selectSearchDropdown, showSearchDropdown, activeCategory, params } = this.props;
    const { activeLocale, activeCurrency } = this.context;
    const cartCount = orderUtil.getProductVariantsFromCart(cart).length;
    const renderSearchDropdownItems = () => {
      const items = _.get(categories, 'tree.children') || [];
      return items.map((item, index) => {
        let className = 'search-dropdown-item';
        if (activeCategory && activeCategory.id === item.id) {
          className += ' active';
        }
        return (
          <div onClick={() => selectSearchDropdown(item)} key={index} className={className}>
            {item.name[activeLocale]}
          </div>
        );
      });
    };
    const renderSearchDropdown = () => {
      if (!showSearchDropdown) {
        return (<div></div>);
      }
      let notSelectedClassName = 'search-dropdown-item';
      if (!activeCategory) {
        notSelectedClassName += ' active';
      }
      const overlayStyle = { backgroundColor: 'transparent', cursor: 'default' };
      return (
        <div className="search-dropdown-box" onMouseLeave={() => $('.right-menu-item').removeClass('open')}>
          <div className="popup-overlay transparent"></div>
          <div onClick={() => selectSearchDropdown(null)} className={notSelectedClassName}>
            {i18n.get('word.allCategories')}
          </div>
          {renderSearchDropdownItems()}
        </div>
      );
    };
    const locales = {
      ko: '한국어',
      en: 'English',
      'zh-cn': '简体',
      'zh-tw': '繁體',
    };
    const renderLocales = () => (
      <div className="dropdown-box">
        {Object.keys(locales).map((key) => (
          <div key={key} className={`dropdown-menu ${key === activeLocale ? 'active' : ''}`}
            onClick={() => {
              changeLocale(key);
              $('.right-menu-item').removeClass('open');
            }}
          >{locales[key]}</div>
        ))}
      </div>
    );
    const renderCurrencies = () => {
      const currencies = ['KRW', 'USD', 'CNY'];
      return (
        <div className="dropdown-box">
          {currencies.map((obj) => (
            <div key={obj} className={`dropdown-menu ${obj === activeCurrency ? 'active' : ''}`}
              onClick={() => {
                changeCurrency(obj);
                $('.right-menu-item').removeClass('open');
              }}
            >{obj}</div>
          ))}
        </div>
      );
    };
    const dropDown = (
      <div className="dropdown-box">
        <div className="dropdown-menu" onClick={handleLogout}>{i18n.get('pcMain.myMenu.logout')}</div>
        <div className="dropdown-menu"><Link to="/mypage">{i18n.get('pcMain.myMenu.myLinkshops')}</Link></div>
        <div className="dropdown-menu"><Link to="/mypage/my_orders">{i18n.get('pcMain.myMenu.myOrders')}</Link></div>
        <div className="dropdown-menu">
          <Link to="/mypage/favorite_brands">{i18n.get('pcMain.myMenu.favoriteBrands')}</Link>
        </div>
      </div>
    );

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      handleSearch(this.refs.searchQuery.value);
    };

    return (
      <div className="header-wide-container">
        <div className="top-banner"></div>
        <div className="top-helper-bar">
          <div className="container">
            <div className="right-menus">
              <div className="right-menu-item"
                onMouseEnter={(e) => $(e.target).addClass('open')}
                onMouseLeave={(e) => $(e.target).closest('.right-menu-item').removeClass('open')}
              >
                Language <b>({locales[activeLocale]})</b>
                {renderLocales()}
              </div>
              <div className="right-menu-divider"></div>
              <div className="right-menu-item"
                onMouseEnter={(e) => $(e.target).addClass('open')}
                onMouseLeave={(e) => $(e.target).closest('.right-menu-item').removeClass('open')}
              >
                Currency <b>({activeCurrency})</b>
                {renderCurrencies()}
              </div>
              <div className="right-menu-divider"></div>
            </div>
          </div>
        </div>
        <div className="container header">
          <div className="header-wrap">
            <Link className="header-item" to="/">
              <img className="header-logo"
                src="http://www.linkshops.com/skin/frontend/linkshops2nd/default/images/logo.png" alt="Linkshops"
              />
            </Link>
            <form onSubmit={handleSearchSubmit}>
              <div className="header-search-box">
                <input ref="searchQuery" placeholder={i18n.get('pcMain.search.placeHolder')}
                  defaultValue={params.query || ''}
                />
                <div className="header-search-category-box" onClick={toggleSearchDropdown}>
                  <div className="search-divider"></div>
                  <div className="arrow-down"></div>
                  {activeCategory ? activeCategory.name[activeLocale] : i18n.get('word.allCategories')}
                  {renderSearchDropdown()}
                </div>
                <button className="header-search-button" type="submit"></button>
              </div>
            </form>
            <div className="header-mymenu-wrap">
              <Link className="header-item" to="/cart">
                <div className="header-mymenu-cart">
                  <div className="cart-icon"></div>
                  <span className="cart-count">{cartCount}</span>
                  <span>{i18n.get('word.cart')}</span>
                </div>
              </Link>
              <Link className="header-item" to="/mypage/wish_list">
                <div className="header-mymenu-cart">
                  <div className="wishlist-icon"></div>
                  <span className="wishlist-text">{i18n.get('word.wishlist')}</span>
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
