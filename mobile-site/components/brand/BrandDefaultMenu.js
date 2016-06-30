// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import _ from 'lodash';

import { getCategoryTree } from 'commons/utils/productUtil';
import i18n from 'commons/utils/i18n';
import { constants } from 'commons/utils/constants';
import { simulateOpen } from 'utils/eventUtil';

export default React.createClass({
  propTypes: {
    activeCategoryId: PropTypes.number,
    activeCurrency: PropTypes.string,
    activeLocale: PropTypes.string,
    aggs: PropTypes.object,
    auth: PropTypes.object,
    categoryRoot: PropTypes.object,
    loadProducts: PropTypes.func,
    pageLimit: PropTypes.number,
    toggleBrandPageMenu: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  render() {
    const { aggs, auth, activeLocale, activeCurrency } = this.props;
    const { categoryRoot, activeCategoryId } = this.props;
    const { toggleBrandPageMenu } = this.props;
    const { pageLimit } = this.props;
    const { ApiAction } = this.context;
    if (!aggs || !categoryRoot) {
      return null;
    }

    const loadProducts = (...args) => {
      this.props.loadProducts.apply(null, args).then(() => {
        toggleBrandPageMenu();
      });
    };
    const getLinkUrl = (categoryId, pageNum) => `${location.pathname}?pageNum=${pageNum}${categoryId ? `&categoryId=${categoryId}` : ''}`;
    const genLink = (elem, categoryId, pageNum) => (
      <Link
        key={`${categoryId}-${pageNum}`}
        onClick={() => loadProducts(categoryId, pageNum, pageLimit)}
        to={getLinkUrl(categoryId, pageNum)}
      >
        {elem}
      </Link>
    );
    const wrapLinkIfNotActive = (c, elem) => {
      if (activeCategoryId === c.id) {
        return elem;
      }
      return genLink(elem, c.id, 1);
    };
    const getCategoryName = (c) => `${_.get(c, `name.${activeLocale}`)} (${c.doc_count || 0})`;
    const getCategoryClassName =
      (c, className) => `${className}${activeCategoryId === c.id ? ' active' : ''}`;
    const renderTopCategory = (c1) => (
      <div key={c1.id} className="top-category">
        {wrapLinkIfNotActive(
          c1, <div className={getCategoryClassName(c1, 'category1-name')}>{getCategoryName(c1)}</div>
        )}
        {(c1.children || []).map((c2) =>
          wrapLinkIfNotActive(c2, <div key={c2.id} className={getCategoryClassName(c2, 'category2-name')}>{getCategoryName(c2)}</div>))}
      </div>
    );
    const renderBottom = () => {
      if (auth.id) {
        return (
          <div className="bottom-line">
            <a onClick={() => ApiAction.logout()}><span>{i18n.get('word.logout')}</span></a>
            <Link to="/myOrder">{i18n.get('pcMain.myMenu.myOrders')}</Link>
          </div>
        );
      }
      return (
        <div className="bottom-line">
          <Link to="/accounts/signin">{i18n.get('word.login')}</Link>
          <Link to="/accounts/signup">{i18n.get('word.register')}</Link>
        </div>
      );
    };
    const locales = {
      ko: { img: `${constants.resourceRoot}/header/flag-kor-rec.png`, name: '한국어' },
      en: { img: `${constants.resourceRoot}/header/flag-eng-rec.png`, name: 'ENGLISH' },
      'zh-cn': { img: `${constants.resourceRoot}/header/flag-chi-rec.png`, name: '简体' },
      'zh-tw': { img: `${constants.resourceRoot}/header/flag-tai-rec.png`, name: '繁體' },
    };
    const openLocaleSelector = () => {
      simulateOpen($('#locale_selector'));
    };
    const onChangeLocale = (e) => {
      ApiAction.changeLocale(e.target.value);
    };
    const openCurrencySelector = () => {
      simulateOpen($('#currency_selector'));
    };
    const onChangeCurrency = (e) => {
      ApiAction.changeCurrency(e.target.value);
    };
    return (
      <div className="brand-default-menu">
        <div className="top-line">
          <span className="left-item" onClick={openLocaleSelector}>{locales[activeLocale].name}</span>
          <select id="locale_selector" onChange={onChangeLocale} value={activeLocale}>
            {Object.keys(locales).map((locale) =>
            <option key={locale} value={locale}>{locales[locale].name}</option>
            )}
          </select>
          <span className="left-item" onClick={openCurrencySelector}>{activeCurrency}</span>
          <select id="currency_selector" onChange={onChangeCurrency} value={activeCurrency}>
            <option value="KRW">KRW</option>
            <option value="USD">USD</option>
            <option value="CNY">CNY</option>
          </select>
          <Link to="/"><img className="logo" src={`${constants.resourceRoot}/mobile/main/brand-linkshops-logo.png`} /></Link>
        </div>
        {(getCategoryTree(aggs, categoryRoot).children || []).map(renderTopCategory)}
        {renderBottom()}
      </div>
    );
  },
});
