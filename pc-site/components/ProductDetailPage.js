import React, { PropTypes } from 'react';

import { getProductMainImage, getProductMainPrice } from '../util';

import BreadCrumb from '../components/BreadCrumb';

export default React.createClass({
  propTypes: {
    product: PropTypes.object.isRequired,
    addCartProduct: PropTypes.func,
  },
  renderVariant(variant) {
    const { addCartProduct } = this.props;
    return (
      <li key={variant.sku}>
        {variant.sku}
        <button onClick={() => addCartProduct(variant.id)}>add to cart</button>
      </li>
    );
  },
  render() {
    const { product } = this.props;
    if (!product) {
      return (
        <div></div>
      );
    }

    const mainImage = getProductMainImage(product) || {};
    const variants = product.productVariants || [];

    const path = [
      { link: '/', name: 'Home' },
      { name: product.sku },
    ];
    const price = getProductMainPrice(product, 'KRW');
    return (
      <div className="container">
        <BreadCrumb path={path} />
        <div clssName="container-table">
          <div className="product-detail-left">
            <div className="left-thumbnail-container">
              <span>
                <img src={mainImage} />
              </span>
              <span>
                <img src={mainImage} />
              </span>
            </div>
            <div className="main-image-box">
              <img src={mainImage} />
            </div>
            <div className="enlarge-image-box">
              <img src={mainImage} />
            </div>
          </div>
          <div className="product-detail-right">
            <span className="product-title">2015 New Autumn Fashion Brand Men Clothes Slim Fit Men Long Sleeve Shirt Men Plaid Cotton Casual Men Shirt Social Plus Size 5XL</span>
            <div className="divider"></div>
            <div className="price-info-box">
              <div className="field-label">Price: </div>
              <div className="field-content price-value"><b>KRW ₩{price}</b> / pieces</div>
            </div>
            <div className="normal-field-box">
              <div className="field-label">Color: </div>
              <div className="field-content">Color</div>
            </div>
            <ul>
              {variants.map(this.renderVariant)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
