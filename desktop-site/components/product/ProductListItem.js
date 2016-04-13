// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import ResponsiveImage from 'components/snippet/ResponsiveImage';
import productUtil, { getProductMainPrice, initColorsAndSizes } from 'commons/utils/productUtil';
import brandUtil from 'commons/utils/brandUtil';

export default React.createClass({
  propTypes: {
    item: PropTypes.object,
    changeMainImage: PropTypes.func,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { item, changeMainImage } = this.props;
    const { activeCurrency, currencySign } = this.context;
    const image = item.mainImage;
    const renderVariantImages = () => {
      const parsed = initColorsAndSizes(item.productVariants || []);
      const colors = _.get(parsed, 'variantAttributes.colors');
      const renderColorImage = (color) => (
        <div key={color} className="variant-item" onClick={() => changeMainImage(item.id, colors[color].img)}>
          <ResponsiveImage image={colors[color].img} width={220} />
        </div>
      );
      return Object.keys(colors).map((color) => renderColorImage(color));
    };
    return (
      <div key={item.id} className="product-list-item-wrap product-list-first-item">
        <div className="product-list-item-box">
          <ResponsiveImage image={image} link={`/products/${item.id}`} width={220} />
          <Link to={`/products/${item.id}`}>
            <div className="product-title">
              {productUtil.getName(item)} <br />
            </div>
          </Link>
          <div className="product-price">
            <strong>{currencySign[activeCurrency]} {getProductMainPrice(item, activeCurrency)}</strong>
          </div>
          <div className="variant-image-container">
            <div>{brandUtil.getName(item.brand)}</div>
            <div className="arrow-left"></div>
            {renderVariantImages()}
            <div className="arrow-right"></div>
          </div>
        </div>
      </div>
    );
  },
});
