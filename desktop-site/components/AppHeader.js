// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import orderUtil from 'commons/utils/orderUtil';
import roleUtil from 'commons/utils/roleUtil';
import stringUtil from 'commons/utils/stringUtil';
import i18n from 'commons/utils/i18n';
import { constants } from 'commons/utils/constants';

import FakeLoginContainer from 'containers/FakeLoginContainer';

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
    isLogin: PropTypes.func,
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.query !== this.props.params.query) {
      this.refs.searchQuery.value = nextProps.params.query || '';
    }
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
      let allCategoriesClassName = 'search-dropdown-item';
      if (!activeCategory) {
        allCategoriesClassName += ' active';
      }
      return (
        <div className="search-dropdown-box" onMouseLeave={() => $('.helper-menu-item').removeClass('open')}>
          <div className="popup-overlay transparent"></div>
          <div onClick={() => selectSearchDropdown(null)} className={allCategoriesClassName}>
            {i18n.get('word.allCategories')}
          </div>
          {renderSearchDropdownItems()}
        </div>
      );
    };
    const locales = {
      ko: { img: `${constants.resourceRoot}/header/flag-kor.png`, name: '한국어' },
      en: { img: `${constants.resourceRoot}/header/flag-eng.png`, name: 'ENGLISH' },
      'zh-cn': { img: `${constants.resourceRoot}/header/flag-chi.png`, name: '简体' },
      'zh-tw': { img: `${constants.resourceRoot}/header/flag-tai.png`, name: '繁體' },
    };
    const renderLocales = () => (
      <div className="dropdown-box">
        {Object.keys(locales).map((key) => (
          <div key={key} className={`dropdown-menu ${key === activeLocale ? 'active' : ''}`}
            onClick={() => {
              changeLocale(key);
              $('.left-menu-item').removeClass('open');
            }}
          ><img src={locales[key].img} /> <span>{locales[key].name}</span></div>
        ))}
      </div>
    );
    const currencies = constants.currencies;
    const renderCurrencies = () => {
      return (
        <div className="dropdown-box">
          {currencies.map((obj) => (
            <div key={obj.name} className={`dropdown-menu ${obj.name === activeCurrency ? 'active' : ''}`}
              onClick={() => {
                changeCurrency(obj.name);
                $('.left-menu-item').removeClass('open');
              }}
            >
              <img src={obj.img} /> <span>{obj.name}</span>
            </div>
          ))}
        </div>
      );
    };
    const getLocaleImg = () => {
      return locales[activeLocale].img;
    };
    const getCurrencyImg = () => {
      for (let i = 0; i < currencies.length; i++) {
        if (currencies[i].name === activeCurrency) {
          return currencies[i].img;
        }
      }
      return '';
    };
    const renderMypageMenus = () => {
      const menus = [
        { link: '/mypage/orders', text: i18n.get('pcMain.myMenu.myOrders') },
        { link: '/mypage/user_info', text: i18n.get('pcMain.myMenu.userInfo') },
      ];
      if (roleUtil.hasRole(auth, ['bigBuyer', 'admin'])) {
        menus.push({ link: '/mypage/reorder', text: i18n.get('word.reorder') });
      }
      const renderMenu = (menu) => (
        <div key={menu.link}
          className="dropdown-menu"
          onClick={() => {
            $('.helper-menu-item').removeClass('open');
          }}
        >
          <Link to={menu.link}>{menu.text}</Link>
        </div>
      );
      return (
        <div className="dropdown-box">
          {menus.map(renderMenu)}
          <FakeLoginContainer />
        </div>
      );
    };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      handleSearch(this.refs.searchQuery.value, activeCategory && activeCategory.id);
    };

    const brandId = roleUtil.getBrandIdIfSeller(auth);
    const renderTopHelperRightMenus = () => {
      if (brandId) {
        // seller does not need my page
        return (
          <div key="app-header-logout" className="helper-menu-item" onClick={handleLogout}>
            {i18n.get('word.logout')}
          </div>
        );
      }
      if (this.context.isLogin()) {
        return [
          <div key="app-header-hi" className="helper-menu-item">
            <Link to="/mypage/orders">{i18n.get('word.hi')} {stringUtil.getUserName(auth)}{i18n.get('pcMain.myMenu.userHi')}</Link>
          </div>,
          <div key="app-header-mypage" className="helper-menu-item"
            onMouseEnter={(e) => $(e.target).addClass('open')}
            onMouseLeave={(e) => $(e.target).closest('.helper-menu-item').removeClass('open')}
          >
            <Link to="/mypage/orders">{i18n.get('word.myPage')}</Link>
            {renderMypageMenus()}
          </div>,
          <div key="app-header-logout" className="helper-menu-item" onClick={handleLogout}>
            {i18n.get('word.logout')}
          </div>,
          <div key="app-header-customer1" className="helper-menu-item">
            <Link to="/service/info/customer_center">{i18n.get('word.customerCenter')}</Link>
          </div>,
        ];
      }
      return [
        <Link key="app-header-signin" to="/accounts/signin">
          <div className="helper-menu-item">{i18n.get('word.login')}</div>
        </Link>,
        <Link key="app-header-signup" to="/accounts/signup">
          <div className="helper-menu-item">{i18n.get('word.register')}</div>
        </Link>,
        <Link key="app-header-customer2" to="/service/info/customer_center">
          <div className="helper-menu-item">{i18n.get('word.customerCenter')}</div>
        </Link>,
      ];
    };

    const headerRightMenuItemClassName = `menu-item ${activeLocale}`;
    const leftMenuItemClassName = 'left-menu-item';

    const renderMyMenus = () => {
      if (brandId) {
        return (
          <Link to={`/brands/${brandId}`}>
            <div className={headerRightMenuItemClassName}>상품 조회</div>
          </Link>
        );
      }
      return [
        <Link key="mypage_wish_list" to="/mypage/wish_list">
          <div className={headerRightMenuItemClassName}>{i18n.get('word.wishList')}</div>
        </Link>,
        <Link key="mypage_favorite_brands" to="/mypage/favorite_brands">
          <div className={headerRightMenuItemClassName}>{i18n.get('word.favoriteBrand')}</div>
        </Link>,
        <Link key="mypage_cart" to="/cart">
          <div className={headerRightMenuItemClassName}>
            <span>{i18n.get('word.cart')}</span>
            <img src={`${constants.resourceRoot}/header/ico_cart.png`} />
            <span className="cart-count">{cartCount}</span>
          </div>
        </Link>,
      ];
    };
    const renderTopBanner = () => {
      if (activeLocale.startsWith('zh-')) {
        const style = { backgroundImage: `url("${constants.resourceRoot}/banner/desktop_top_banner_${activeLocale}_20160603.gif")` };
        return (
          <div className="img-top-banner">
            <div
              style={style}
              className="inner"
            ></div>
          </div>
        );
      }
      return <div className="top-banner"></div>;
    };

    return (
      <div className="header-wide-container">
        {renderTopBanner()}
        <div className="top-helper-bar">
          <div className="container no-padding">
            <div className="left-menus">
              <div className={leftMenuItemClassName}
                onMouseEnter={(e) => $(e.target).addClass('open')}
                onMouseLeave={(e) => $(e.target).closest(`.${leftMenuItemClassName}`).removeClass('open')}
              >
                <img src={getLocaleImg()} /> <span>{i18n.get('word.language')}</span>
                {renderLocales()}
              </div>
              <div className={leftMenuItemClassName}
                onMouseEnter={(e) => $(e.target).addClass('open')}
                onMouseLeave={(e) => $(e.target).closest(`.${leftMenuItemClassName}`).removeClass('open')}
              >
                <img src={getCurrencyImg()} /> <span>{i18n.get('word.currency')}</span>
                {renderCurrencies()}
              </div>
            </div>
            <div className="right-menus">
              {renderTopHelperRightMenus()}
            </div>
          </div>
        </div>
        <div className="container no-padding">
          <div className="header-wrap">
            <Link className="header-item" to="/">
              <img className="header-logo"
                src={`${constants.resourceRoot}/header/logo.png`} alt="Linkshops"
              />
            </Link>
            <div className="header-search-box">
              <form onSubmit={handleSearchSubmit}>
              <div className="header-search-category-box" onClick={toggleSearchDropdown}>
                <div className="search-divider"></div>
                <div className="arrow-down"></div>
                {activeCategory ? activeCategory.name[activeLocale] : i18n.get('word.allCategories')}
                {renderSearchDropdown()}
              </div>
              <input ref="searchQuery" placeholder={i18n.get('pcMain.search.placeHolder')}
                defaultValue={params.query || ''}
              />
              <button className="header-search-button" type="submit"></button>
              </form>
            </div>
            <div className="header-right-menus">
              {renderMyMenus()}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
