// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import ResponsiveImage from 'components/snippet/ResponsiveImage';
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
    const colorKeys = Object.keys(colors);
    const imageCount = Math.min(colorKeys.length, 3);
    const renderVariantImages = () => {
      const renderColorImage = (color) => {
        const onClick = () => {
          item.mainImage = colors[color].img;
          this.setState({ item });
        };
        return (
          <div key={color} className="variant-item" onClick={onClick}>
            <ResponsiveImage image={colors[color].img} width={440}/>
          </div>
        );
      };
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
      <div className={`heart-it ${item.wish ? 'active' : ''}`} onClick={() => toggleWish(item)}></div>
      : null;
    return (
      <div key={item.id} className={className}>
        <div className="product-list-item-box">
          {wishElem}
          <ResponsiveImage image={image} link={`/products/${item.id}`} width={440} />
          {nameElem}
          {priceElem}
          <div className="variant-image-container">
            {isShowInfo ? <div>{brandUtil.getName(item.brand)}</div> : null}
            {renderArrowLeft()}
            {renderVariantImages()}
            {renderArrowRight()}
          </div>
        </div>
      </div>
    );
  },
});
