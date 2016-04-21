// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import brandUtil from 'commons/utils/brandUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    aggs: PropTypes.object,
    brandIds: PropTypes.array,
    genLink: PropTypes.func,
    KRW: PropTypes.string,
  },
  renderBrands() {
    const { aggs: { brands = [] }, genLink } = this.props;
    const filterBrands = new Set();
    (this.props.brandIds || []).forEach((b) => filterBrands.add(+b));
    const brandLink = (brandId) => genLink(Object.assign(_.pick(this.props, ['query', 'categoryId', 'sorts', 'KRW']), { brandId }));

    const renderBrand = (brand) => {
      if (filterBrands.has(+brand.id)) {
        return (
          <Link key={brand.id} to={brandLink(null)} className="button-item active">
            {brandUtil.getName(brand)} ({brand.doc_count})
          </Link>
        );
      }
      return (
        <Link key={brand.id} to={brandLink(brand.id)} className="button-item">
          {brandUtil.getName(brand)} ({brand.doc_count})
        </Link>
      );
    };

    return (
      <div>
        {brands.map(renderBrand)}
      </div>
    );
  },
  render() {
    const { genLink, KRW } = this.props;
    const t = (key) => i18n.get(`pcMain.productList.${key}`);
    const sortItems = [
      { name: i18n.get('pcMain.productList.sortLowPrice'), sorts: 'KRW.num' },
      { name: i18n.get('pcMain.productList.sortHighPrice'), sorts: '-KRW.num' },
      { name: i18n.get('pcMain.productList.sortLatest'), sorts: '-id' },
    ];
    const renderPriceFilters = () => {
      const priceLink = (nextKRW) =>
        genLink(Object.assign(_.pick(this.props, ['query', 'categoryId', 'sorts', 'brandId']), { KRW: nextKRW }));
      const filterPrices = [
        { name: t('filterUnder10000'), filter: '0:10000' },
        { name: t('filterOver10000'), filter: '10000:20000' },
        { name: t('filterOver20000'), filter: '20000:30000' },
        { name: t('filterOver30000'), filter: '30000' },
      ];
      const renderFilter = (f) => (
        <Link key={f.filter}
          className={`button-item ${f.filter === KRW ? 'active' : ''}`}
          to={priceLink(f.filter === KRW ? null : f.filter)}
        >
          {f.name}
        </Link>
      );
      return filterPrices.map(renderFilter);
    };
    const sorts = this.props.sorts || '-id';
    const sortItemViews = sortItems.map((item) => {
      if (sorts === item.sorts) {
        return (
          <a className="sort-item" key={item.sorts}>
            <strong className="sort-item active">
              {item.name}
            </strong>
          </a>
        );
      }
      return (
        <Link key={item.sorts} to={genLink({ ...this.props, sorts: item.sorts, pageNum: 1 })} className="sort-item">
          {item.name}
        </Link>
      );
    });
    return (
      <div className="product-list-search-box">
        <div className="search-row">
          <div className="search-label">{i18n.get('word.price')}</div>
          <div className="search-control">
            {renderPriceFilters()}
          </div>
        </div>
        <div className="search-row">
          <div className="search-label">{i18n.get('word.brands')}</div>
          <div className="search-control">
            {this.renderBrands()}
          </div>
        </div>
        <div className="search-row">
          {/*<select>
            <option>20개씩</option>
            <option>40개씩</option>
            <option>60개씩</option>
            <option>80개씩</option>
          </select>*/}
          <div className="sort-item-box">
            {sortItemViews}
          </div>
        </div>
      </div>
    );
  },
});
