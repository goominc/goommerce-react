// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import ResponsiveImage from 'components/snippet/ResponsiveImage';
import ProductListVariantImage from 'components/product/ProductListVariantImage';

import { getProductMainImage, initColorsAndSizes } from 'commons/utils/productUtil';
import { formatPrice } from 'commons/utils/numberUtil';
import storeUtil from 'commons/utils/storeUtil';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    product: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  getInitialState() {
    const { product } = this.props;
    product.wishId = storeUtil.getWishId(product);
    product.mainImage = getProductMainImage(product);
    return { product };
  },
  render() {
    const { auth } = this.props;
    const { product } = this.state;
    const { ApiAction, activeLocale, activeCurrency, currencySign } = this.context;
    const parsed = initColorsAndSizes(product.productVariants || []);
    const colors = _.get(parsed, 'variantAttributes.colors');
    const renderProductBottom = () => {
      if (auth && auth.id) {
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
    return (
      <div key={product.id} className="item">
        <Link to={`/products/${product.id}`}>
          <ResponsiveImage image={product.mainImage} width={440} />
        </Link>
        {renderProductBottom(product)}
        {/*
        <ProductListVariantImage
          colors={colors}
          isShowInfo={false}
          product={product}
          selectImage={(image2) => {
            product.mainImage = image2;
            this.setState({ product });
          }}
        />
         */}
      </div>
    );
  },
});
