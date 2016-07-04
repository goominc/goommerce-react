// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';

import i18n from 'commons/utils/i18n';
import { getBuildingInfo } from 'commons/utils/brandUtil';
import { formatPrice } from 'commons/utils/numberUtil';
import { getProductMainImage } from 'commons/utils/productUtil';
import storeUtil from 'commons/utils/storeUtil';
import scrollUtil from 'utils/scrollUtil';

export default React.createClass({
  propTypes: {
    activeCategoryId: PropTypes.number,
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    brand: PropTypes.object,
    isLikeBrand: PropTypes.bool,
    loadProducts: PropTypes.func,
    pageLimit: PropTypes.number,
    searchResult: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    currencySign: PropTypes.object,
  },
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll() {
    scrollUtil.incrementalFetch(this.fnIncrementalFetch);
  },
  fnIncrementalFetch() {
    const { searchResult, pageLimit, activeCategoryId, loadProducts } = this.props;
    if (!searchResult || !searchResult.pagination) {
      return;
    }
    const nextOffset = searchResult.pagination.offset + pageLimit;
    const nextPage = Math.floor(nextOffset / pageLimit) + 1;
    if (nextOffset < searchResult.pagination.total) {
      const loadingElem = $('.content-box .loading');
      const loadingDisplay = loadingElem.css('display');
      if (loadingDisplay === 'block') {
        // 2016. 06. 20. [heekyu] do not fetch when already loading
        return;
      }
      loadingElem.show();
      loadProducts(activeCategoryId, nextPage, pageLimit, true).then(() => {
        loadingElem.hide();
      });
    }
  },
  render() {
    const { activeLocale, activeCurrency, activeCategoryId } = this.props;
    const { brand, isLikeBrand } = this.props;
    const { searchResult, pageLimit } = this.props;
    const { ApiAction, currencySign } = this.context;
    if (!brand || !searchResult) {
      return null;
    }

    const loadProducts = (...args) => this.props.loadProducts.apply(null, args);
    const getLinkUrl = (categoryId) => `${location.pathname}${categoryId ? `?categoryId=${categoryId}` : ''}`;
    const genLink = (elem, categoryId) => (
      <Link
        className="parent"
        key={categoryId}
        onClick={() => loadProducts(categoryId, 1, pageLimit)}
        to={getLinkUrl(categoryId)}
      >
        {elem}
      </Link>
    );
    const timestamp = new Date().getTime();

    const path = storeUtil.getCategoryBreadcrumbPath(activeCategoryId, getLinkUrl);
    const renderBreadcrumb = () => (
      <div className="breadcrumb">
        {path.map((item, index) => {
          if (index < path.length - 1) {
            return (
              <span key={item.name[activeLocale]}>
                {genLink(item.name[activeLocale], item.category.id)}
                <i className="icon-navi-arrow-right_brand1"></i>
              </span>
            );
          }
          return (
            <span key={item.name[activeLocale]} className="leaf">{item.name[activeLocale]}</span>
          );
        })}
      </div>
    );
    // TODO export to common
    const products = searchResult.products;
    const prodDiv = products.map((product) => {
      const img = getProductMainImage(product);
      product.wishId = storeUtil.getWishId(product);
      const renderImage = () => {
        if (!img) {
          return <img />;
        }
        if (!img.publicId) {
          return (<img src={img.url} />);
        }
        return (
          <CloudinaryImage
            publicId={img.publicId}
            version={img.version}
            options={ { width: 220 } }
          />
        );
      };
      if (img) {
        return (
          <div className="product-item" key={`${product.id}-${timestamp}`}>
            <Link className="mobile-product-image" to={`/products/${product.id}`}>
              <div className="inner-wrap">
                {renderImage()}
              </div>
            </Link>
            <div className="product-detail">
              <div className="product-name">{product.name[activeLocale]}</div>
              <div className="product-price">{formatPrice(product[activeCurrency], activeCurrency, currencySign)}</div>
              <div className="product-wish">
                {product.wishId ?
                  <i className="icon-heart-red_brand1" onClick={() => ApiAction.deleteWish(product.wishId)}></i> :
                  <i className="icon-heart-gray_brand1" onClick={() => ApiAction.addWish(product.id)}></i>
                }
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="product-item" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className="mobile-product-image">
              <img />
            </div>
          </Link>
        </div>
      );
    });
    const onClickFavoriteBrand = () => {
      if (isLikeBrand) {
        ApiAction.deleteFavoriteBrand(brand.id);
      } else {
        ApiAction.addFavoriteBrand(brand.id);
      }
    };
    return (
      <div className="brand-default-container">
        <div className="title-box">
          <div className="title">
            {brand.name[activeLocale]}
          </div>
          <div>
            <span className="building-info">{getBuildingInfo(brand)}</span>
            <div className="right-wrap" onClick={onClickFavoriteBrand}>
              {isLikeBrand ?
                <i className="icon-star-yellow_brand1"></i> :
                <i className="icon-star-gray_brand1"></i>
              }
              <span className="favorite-brand">
                {i18n.get('word.favoriteBrand')}
              </span>
            </div>
          </div>
        </div>
        <div className="content-box">
          {renderBreadcrumb()}
          {prodDiv}
          <div className="loading"></div>
        </div>
      </div>
    );
  },
});
