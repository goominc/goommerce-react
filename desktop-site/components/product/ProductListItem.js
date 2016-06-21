// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import ResponsiveImage from 'components/snippet/ResponsiveImage';
import ProductListVariantImage from './ProductListVariantImage';

import productUtil, { getProductMainPrice, initColorsAndSizes } from 'commons/utils/productUtil';
import brandUtil from 'commons/utils/brandUtil';
import numberUtil from 'commons/utils/numberUtil';

export default React.createClass({
  propTypes: {
    isFirstRow: PropTypes.bool,
    isShowInfo: PropTypes.bool,
    item: PropTypes.object,
    rowSize: PropTypes.number,
    toggleWish: PropTypes.func,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  getInitialState() {
    return { variantImageIndex: 0, item: this.props.item };
  },
  render() {
    const { isFirstRow, toggleWish, rowSize = 4, isShowInfo = true } = this.props;
    const { item } = this.state;
    const { activeCurrency, currencySign } = this.context;
    const image = item.mainImage;
    const parsed = initColorsAndSizes(item.productVariants || []);
    const colors = _.get(parsed, 'variantAttributes.colors');
    const className = `product-list-item-wrap-${rowSize} ${isFirstRow ? 'product-list-first-item' : ''}`;

    const nameElem = isShowInfo ?
      <Link to={`/products/${item.id}`}>
        <div className="product-title">
          {productUtil.getName(item)} <br />
        </div>
      </Link>
      : null;
    const priceElem = isShowInfo ?
      <div className="product-price">
        <strong>{numberUtil.formatPrice(item[activeCurrency], activeCurrency, currencySign)}</strong>
      </div>
      : null;
    const wishElem = isShowInfo ?
      <div className={`heart-it ${item.wishId ? 'active' : ''}`} onClick={() => toggleWish(item)}></div>
      : null;
    return (
      <div key={item.id} className={className}>
        <div className="product-list-item-box">
          {wishElem}
          <ResponsiveImage image={image} link={`/products/${item.id}`} width={440} />
          {nameElem}
          {priceElem}
          <ProductListVariantImage
            colors={colors}
            isShowInfo={isShowInfo}
            product={item}
            selectImage={(image2) => {
              item.mainImage = image2;
              this.setState({ item });
            }}
          />
        </div>
      </div>
    );
  },
});
