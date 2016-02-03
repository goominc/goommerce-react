import React, { PropTypes } from 'react';

import { getProductMainImage, getProductMainPrice } from '../util';

import BreadCrumb from '../components/BreadCrumb';

export default React.createClass({
  propTypes: {
    product: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired,
    addCartProduct: PropTypes.func,
    activeImageUrl: PropTypes.string,
    setActiveImage: PropTypes.func,
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
  handleMouseEnterThumbnail(image) {
    this.props.setActiveImage(image.url);
  },
  handleMouseEnterMainImage() {
    // TODO make this to external state
    $('.enlarge-image-box').css('display', 'block');
  },
  handleMouseMoveMainImage(e) {
    // TODO make this to external state
    const width = 50; // TODO
    const height = width / 2 * 3;
    const offset = $(e.target).offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;
    const left = Math.max(x - width, 0);
    const top = Math.max(y - height, 0);
    const zoomElem = $('.enlarge-image-box img');
    zoomElem.css('margin-left', `-${left}px`);
    zoomElem.css('margin-top', `-${top}px`);
  },
  handleMouseLeaveMainImage() {
    // TODO make this to external state
    $('.enlarge-image-box').css('display', 'none');
  },
  render() {
    const { product, images, activeImageUrl } = this.props;
    const renderThumbnail = (image) => {
      let className = '';
      if (image.url === activeImageUrl) {
        className = 'image-active';
      }
      return (
        <span className={className} key={image.url} onMouseEnter={() => this.handleMouseEnterThumbnail(image)}>
          <img src={image.url} />
        </span>
      );
    };

    const mainImage = getProductMainImage(product) || {};
    const variants = product.productVariants || [];

    const path = [
      { link: '/', name: 'Home' },
      { link: '/products', name: 'Product List'},
      { name: product.sku },
    ];
    const price = getProductMainPrice(product, 'KRW');
    return (
      <div className="container">
        <BreadCrumb path={path} />
        <div clssName="container-table">
          <div className="product-detail-left">
            <div className="left-thumbnail-container">
              {images.map(renderThumbnail)}
            </div>
            <div onMouseMove={this.handleMouseMoveMainImage}
                 onMouseEnter={this.handleMouseEnterMainImage}
                 onMouseLeave={this.handleMouseLeaveMainImage}
                 className="main-image-box">
              <img src={activeImageUrl} />
            </div>
            <div className="enlarge-image-box">
              <img src={activeImageUrl} />
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
