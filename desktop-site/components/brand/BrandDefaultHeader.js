// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { constants } from 'commons/utils/constants';
import stringUtil from 'commons/utils/stringUtil';
import { setAfterLoginPage } from 'commons/utils/routerUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    location: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    router: PropTypes.object,
  },
  render() {
    const { auth, location } = this.props;
    const { ApiAction, activeLocale, activeCurrency, router } = this.context;
    const { changeLocale, changeCurrency, logout } = ApiAction;
    const locales = {
      ko: { name: '한국어' },
      en: { name: 'ENGLISH' },
      'zh-cn': { name: '简体' },
      'zh-tw': { name: '繁體' },
    };
    const renderLocales = () => (
      <div className="dropdown-box">
        {Object.keys(locales).map((key) => (
          <div
            key={key} className={`dropdown-menu ${key === activeLocale ? 'active' : ''}`}
            onClick={() => {
              changeLocale(key);
            }}
          >
            <span>{locales[key].name}</span>
            {key === activeLocale ? <i className="bs bs-icon-dot-orange"></i> : ''}
          </div>
        ))}
      </div>
    );
    const currencies = constants.currencies;
    const renderCurrencies = () => {
      return (
        <div className="dropdown-box">
          {currencies.map((obj) => (
            <div
              key={obj.name} className={`dropdown-menu ${obj.name === activeCurrency ? 'active' : ''}`}
              onClick={() => {
                changeCurrency(obj.name);
              }}
            >
              <span>{obj.name}</span>
              {obj.name === activeCurrency ? <i className="bs bs-icon-dot-orange"></i> : ''}
            </div>
          ))}
        </div>
      );
    };
    const toggleDropdown = (e) => {
      const elem = $(e.target).closest('.left-menu-item');
      if (elem.hasClass('open')) {
        elem.removeClass('open');
      } else {
        $('.left-menu-item').removeClass('open');
        elem.addClass('open');
      }
    };
    const renderRight = () => {
      if (auth.id) {
        return (
          <div className="right">
            <a onClick={() => logout()}><span>{i18n.get('word.logout')}</span></a>
            <Link to="/mypage/orders">
              <span>{i18n.get('word.hi')} {stringUtil.getUserName(auth)}{i18n.get('pcMain.myMenu.userHi')}</span>
            </Link>
          </div>
        );
      }
      return (
        <div className="right">
          <Link to="/accounts/signin" onClick={() => setAfterLoginPage(location.pathname)}><span>{i18n.get('word.login')}</span></Link>
          <Link to="/accounts/signup"><span>{i18n.get('word.register')}</span></Link>
        </div>
      );
    };
    return (
      <div className="brand-default-header">
        <div className="inner">
          <div className="left">
            <div className="left-menu-item" onClick={toggleDropdown}>
              {locales[activeLocale].name} &nbsp; <i className="bs bs-arrow-down"></i>
              {renderLocales()}
              <div className="popup-overlay transparent"></div>
            </div>
            <div className="left-menu-item" onClick={toggleDropdown}>
              {activeCurrency} &nbsp; <i className="bs bs-arrow-down"></i>
              {renderCurrencies()}
              <div className="popup-overlay transparent"></div>
            </div>
          </div>
          <span onClick={() => router.push('/')}>LinkShops</span>
          {renderRight()}
        </div>
      </div>
    );
  },
});
