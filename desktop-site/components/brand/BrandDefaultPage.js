// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Breadcrumb from 'components/Breadcrumb';
import BrandProductItem from './BrandProductItem';

import { getBuildingInfo } from 'commons/utils/brandUtil';
import { formatPrice } from 'commons/utils/numberUtil';
import storeUtil from 'commons/utils/storeUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    activeCategoryId: PropTypes.number,
    aggs: PropTypes.object,
    auth: PropTypes.object,
    categoryRoot: PropTypes.object,
    brand: PropTypes.object,
    isLikeBrand: PropTypes.bool,
    loadProducts: PropTypes.func,
    location: PropTypes.object,
    searchResult: PropTypes.object,
    products: PropTypes.array,
    pageTotal: PropTypes.number,
    pageCurrent: PropTypes.number,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { auth, categoryRoot, brand, location, searchResult, aggs } = this.props;
    const { isLikeBrand } = this.props;
    const { activeCategoryId } = this.props;
    const { pageCurrent } = this.props;
    const { ApiAction, activeLocale, activeCurrency, currencySign } = this.context;
    if (!categoryRoot || !brand || !searchResult) {
      return <div></div>;
    }
    const loadProducts = (...args) => {
      // $('.right-container .item img').attr('src', '');
      this.props.loadProducts.apply(null, args);
    };
    const getCategoryTree = () => {
      if (!aggs || !aggs.categories || !aggs.categories[categoryRoot.id]) {
        return {};
      }
      const dfs = (root) => {
        if (aggs.categories[root.id]) {
          const res = Object.assign({}, root, aggs.categories[root.id]);
          res.children = res.children.map(dfs).filter((r) => !!r);
          return res;
        }
        return null;
      };
      return dfs(categoryRoot);
    };
    const getLinkUrl = (categoryId, pageNum) => `${location.pathname}?pageNum=${pageNum}${categoryId ? `&categoryId=${categoryId}` : ''}`;
    const genLink = (elem, categoryId, pageNum) => (
      <Link
        key={`${categoryId}-${pageNum}`}
        onClick={() => loadProducts(categoryId, pageNum)}
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
      <div key={c1.id}>
        {wrapLinkIfNotActive(
          c1, <div className={getCategoryClassName(c1, 'category1-name')}>{getCategoryName(c1)}</div>
        )}
        <div className="category2-wrap">
          {(c1.children || []).map((c2) =>
            wrapLinkIfNotActive(c2, <div key={c2.id} className={getCategoryClassName(c2, 'category2-name')}>{getCategoryName(c2)}</div>))}
        </div>
      </div>
    );
    const path = storeUtil.getCategoryBreadcrumbPath(activeCategoryId);
    const renderProducts = (products) => {
      products.forEach((product) => {
        product.wishId = storeUtil.getWishId(product);
      });
      const renderProductBottom = (product) => {
        if (auth.id) {
          return (
            <div className="item-desc-box">
              <div className="product-name">{_.get(product, `name.${activeLocale}`)}</div>
              <div className="price">
                {formatPrice(product[activeCurrency] || 0, activeCurrency, currencySign)}
              </div>
              {product.wishId ?
                <i className="bs bs-icon-heart-red" onClick={() => ApiAction.deleteWish(product.wishId)}></i> :
                <i className="bs bs-icon-heart-white" onClick={() => ApiAction.addWish(product.id)}></i>
              }
            </div>
          );
        }
        return null;
      };
      const res = [];
      let p = 0;
      while (p < products.length) {
        const row = [];
        for (let i = 0; i < 3; i++) {
          const product = products[p++];
          row.push(
            <BrandProductItem
              key={product.id}
              product={product}
              auth={auth}
            />
          );
          if (p === products.length) {
            break;
          }
        }
        res.push(
          <div key={`brand-product-${p}`} className="item-row">
            {row}
          </div>
        );
      }
      return res;
    };
    const renderPageLine = () => {
      const pageTotal = Math.floor((searchResult.pagination.total + 29) / 30);
      const res = [];
      for (let i = 1; i <= pageTotal; i++) {
        const elem = <div className={`page-item${i === pageCurrent ? ' active' : ''}`} key={`brand-page-${i}`}>{i}</div>;
        if (i === pageCurrent) {
          res.push(elem);
          continue;
        }
        res.push(genLink(elem, activeCategoryId, i));
      }
      return <div className="page-line">{res}</div>;
    };
    return (
      <div style={({ backgroundColor: '#fff' })}>
        <div className="brand-default-container">
          <div className="name">
            <Link to={location.pathname} onClick={() => loadProducts(null, 1)}>{_.get(brand, `name.${activeLocale}`)}</Link>
          </div>
          <div className="buillding">{getBuildingInfo(brand)}</div>
          <div className="top-right">
            <Link to="/mypage/wish_list"><span><i className="bs bs-icon-heart-red"></i> {i18n.get('word.wishList')}</span></Link>
            <Link to="/cart"><span><i className="bs bs-icon-cart"></i> {i18n.get('word.cart')}</span></Link>
          </div>
          <div className="title-line">
            {isLikeBrand ?
              <i className="bs bs-icon-star-yellow" onClick={() => ApiAction.deleteFavoriteBrand(brand.id)}></i> :
              <i className="bs bs-icon-star-white" onClick={() => ApiAction.addFavoriteBrand(brand.id)}></i>
            }
            {i18n.get('pcItemDetail.favoriteBrands')}
          </div>
          <div className="content-container">
            <div className="left-container">
              {(getCategoryTree().children || []).map(renderTopCategory)}
            </div>
            <div className="right-container">
              <Breadcrumb path={path} />
              {renderProducts(searchResult.products)}
              {renderPageLine()}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
