// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import ResponsiveImage from 'components/snippet/ResponsiveImage';

import brandUtil from 'commons/utils/brandUtil';

export default React.createClass({
  propTypes: {
    colors: PropTypes.object,
    isShowInfo: PropTypes.bool,
    product: PropTypes.object,
    selectImage: PropTypes.func,
  },
  getInitialState() {
    return { variantImageIndex: 0 };
  },
  render() {
    const { colors, isShowInfo, product, selectImage } = this.props;
    if (!colors) {
      return null;
    }
    const colorKeys = Object.keys(colors);
    const imageCount = Math.min(colorKeys.length, 3);
    const renderVariantImages = () => {
      const renderColorImage = (color) => {
        const onClick = () => {
          selectImage(colors[color].img);
        };
        return (
          <div key={color} className="variant-item" onClick={onClick}>
            <ResponsiveImage image={colors[color].img} width={440} />
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
    return (
      <div className="variant-image-container">
        {isShowInfo ? <div>{brandUtil.getName(product.brand)}</div> : null}
        {renderArrowLeft()}
        {renderVariantImages()}
        {renderArrowRight()}
      </div>
    );
  },
});
