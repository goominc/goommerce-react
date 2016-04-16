// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import brandUtil from 'commons/utils/brandUtil';
import numberUtil from 'commons/utils/numberUtil';
import productUtil from 'commons/utils/productUtil';

import ResponsiveImage from 'components/snippet/ResponsiveImage';

export default React.createClass({
  propTypes: {
    brands: PropTypes.array,
    removeProduct: PropTypes.func,
    updateCount: PropTypes.func,
    canUpdate: PropTypes.bool,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
  },
  render() {
    const { brands, removeProduct, updateCount, canUpdate } = this.props;
    const { activeCurrency } = this.context;

    const renderBrand = (brand) => {
      const renderVariant = (product, variant, index) => {
        const pricePerUnit = +variant.productVariant[activeCurrency];
        const changeQuantity = (quantity) => {
          if (quantity < 1) {
            return;
          }
          updateCount(variant.productVariant, quantity);
        };
        const renderQuantity = () => {
          if (canUpdate) {
            return (
              <div className="quantity">
                <div className="input-number-count-box-center">
                  <input className="input-number-nospin" min="1" type="number"
                    value={variant.count}
                    onChange={(e) => changeQuantity(e.target.value)}
                  />
                <span>
                  <div className="up" onClick={() => changeQuantity(+variant.count + 1)}></div>
                  <div className="down" onClick={() => changeQuantity(+variant.count - 1)}></div>
                </span>
                </div>
              </div>
            );
          }
          return (
            <div className="quantity">{variant.count}</div>
          );
        };
        const renderDeleteButton = () => {
          if (canUpdate) {
            return (
              <div className="action-column">
                <img onClick={() => removeProduct(variant.productVariant)}
                  src="//s3.ap-northeast-2.amazonaws.com/linkshops/front/resource/main/cart-delete-button.png"
                />
              </div>
            );
          }
          return null;
        };
        return (
          <div key={variant.productVariant.id} className={index === 0 ? 'product-row' : 'variant-row'}>
            <div className="product-info-content">
              <div className="img-box">
                <ResponsiveImage image={_.get(variant.productVariant, 'appImages.default[0]')} width={60} />
              </div>
              <div className="content-wrap">
                <div className="item"><strong>{productUtil.getName(product)}</strong></div>
                <div className="item">{_.get(variant.productVariant, 'data.color')}</div>
                <div className="item">{_.get(variant.productVariant, 'data.size')}</div>
              </div>
            </div>
            <div className="quantity">{numberUtil.format(pricePerUnit)}</div>
            {renderQuantity()}
            <div className="price">{numberUtil.format(+variant.count * pricePerUnit)}</div>
            {renderDeleteButton()}
          </div>
        );
      };
      return (
        <div key={brand.brand.id} className="row">
          <div className="brand"><div className="centered">{brandUtil.getName(brand.brand)}</div></div>
          <div className="product-container">
            {(brand.products || []).map((p) =>
              p.productVariants.map((variant, index) => renderVariant(p.product, variant, index)))}
          </div>
        </div>
      );
    };

    return (
      <div className="cart-info-container">
        <div className="title-row">
          <div className="brand">브랜드</div>
          <div className="product-info-title">상품내용</div>
          <div className="quantity">단가</div>
          <div className="quantity">수량</div>
          <div className="price">가격</div>
        </div>
        {(brands || []).map(renderBrand)}
      </div>
    );
  },
});
