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
    toggleWish: PropTypes.func,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  getInitialState() {
    return { variantImageIndex: 0 };
  },
  render() {
    const { item, changeMainImage, toggleWish } = this.props;
    const { activeCurrency, currencySign } = this.context;
    const image = item.mainImage;
    const parsed = initColorsAndSizes(item.productVariants || []);
    const colors = _.get(parsed, 'variantAttributes.colors');
    const colorKeys = Object.keys(colors);
    const imageCount = Math.min(colorKeys.length, 3);
    const renderVariantImages = () => {
      const renderColorImage = (color) => (
        <div key={color} className="variant-item" onClick={() => changeMainImage(item.id, colors[color].img)}>
          <ResponsiveImage image={colors[color].img} width={220} />
        </div>
      );
      const res = [];
      for (let i = 0; i < imageCount; i++) {
        const idx = this.state.variantImageIndex + i;
        res.push(renderColorImage(colorKeys[idx]));
      }
      return res;
    };
    const plusImageIndex = () => {
      if (this.state.variantImageIndex >= colors.length - imageCount) {
        return;
      }
      this.setState({ variantImageIndex: this.state.variantImageIndex + 1 });
    };
    const minusImageIndex = () => {
      if (this.state.variantImageIndex < 1) {
        return;
      }
      this.setState({ variantImageIndex: this.state.variantImageIndex - 1 });
    };
    const renderArrowLeft = () => {
      if (this.state.variantImageIndex > 0) {
        return (<div onClick={minusImageIndex} className="arrow-left-wrap"><div className="arrow"></div></div>);
      }
      return null;
    };
    const renderArrowRight = () => {
      if (this.state.variantImageIndex + imageCount < colorKeys.length) {
        return (<div onClick={plusImageIndex} className="arrow-right-wrap"><div className="arrow"></div></div>);
      }
      return null;
    };
    const className = 'product-list-item-box';
    return (
      <div key={item.id} className="product-list-item-wrap product-list-first-item">
        <div className={className}>
          <div className={`heart-it ${item.wish ? 'active' : ''}`} onClick={() => toggleWish(item)}></div>
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
            {renderArrowLeft()}
            {renderVariantImages()}
            {renderArrowRight()}
          </div>
        </div>
      </div>
    );
  },
});
