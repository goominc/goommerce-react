import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';

import { getProductMainPrice } from 'util';

import Breadcrumb from 'components/Breadcrumb';

const _ = require('lodash');

export default React.createClass({
  propTypes: {
    product: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired,
    variantAttributes: PropTypes.object,
    attributes: PropTypes.array,
    selectedVariant: PropTypes.object,
    addCartProduct: PropTypes.func,
    buyNow: PropTypes.func,
    addWish: PropTypes.func,
    addFavoriteBrand: PropTypes.func,
    activeImage: PropTypes.object,
    setActiveImage: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  handleMouseEnterThumbnail(image) {
    this.props.setActiveImage(image);
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
    const { product, images, activeImage, variantAttributes, attributes, selectedVariant,
      addCartProduct, buyNow, addWish, addFavoriteBrand } = this.props;
    if (!product || !variantAttributes) {
      return (<div></div>);
    }
    const brand = product.brand;
    const { activeCurrency, activeLocale } = this.context;
    const renderImage = (image) => {
      if (!image) {
        return (<img />);
      }
      if (!image.publicId) {
        return (<img src={image.url} />);
      }
      return (
        <CloudinaryImage publicId={image.publicId}
          options={ { crop: 'scale', width: 50, height: 75 } }
        />
      );
    };
    const renderThumbnail = (image) => {
      let className = '';
      if (activeImage && image.url === activeImage.url) {
        className = 'image-active';
      }
      return (
        <span className={className} key={image.url} onMouseEnter={() => this.handleMouseEnterThumbnail(image)}>
          {renderImage(image)}
        </span>
      );
    };

    const renderPath = (categoryPath, index) => {
      const crumbPath = [{ link: '/', name: 'Home' }];
      for (let i = 0; i < categoryPath.ko.length; i++) {
        crumbPath.push({ link: 'products', name: categoryPath.ko[i] });
      }
      crumbPath.push({ name: product.sku });
      return (<Breadcrumb key={`breadcrumb-${index}`} path={crumbPath} />);
    };

    const renderAttributes = (attrName, attrObj, selectFunc) => {
      const renderItem = (key, obj) => {
        let className = '';
        if (!obj.enable) {
          className += ' disable-item';
        }
        if (obj.selected) {
          className += ' active';
        }
        if (obj.img) {
          if (obj.img.publicId) {
            return (<CloudinaryImage
              className={className}
              key={key}
              onClick={() => selectFunc(key)}
              publicId={obj.img.publicId}
              options={{ width: 50, height: 75, crop: 'scale' }}
            />);
          }
          return (<img className={className} key={key} onClick={() => selectFunc(key)} src={obj.img.url} />);
        }
        return (
          <div key={key} onClick={() => selectFunc(key)} className={`attribute-item-text${className}`}>{key}</div>
        );
      };
      const keys = Object.keys(attrObj);
      return (
        <div key={attrName} className="normal-field-box">
          <div className="field-label">{attrName}: </div>
          <div className="field-content">
            {keys.map((key) => renderItem(key, attrObj[key]))}
          </div>
        </div>
      );
    };

    const buttonClassName = !!selectedVariant ? '' : 'button-disabled';

    const path = [
      { link: '/', name: { en: 'Home', ko: '홈' } },
      { link: '/products', name: { en: 'Product List', ko: '상품목록' } },
      { name: { en: product.sku, ko: product.sku } },
    ];
    let price = 0;
    if (selectedVariant) {
      price = selectedVariant[activeCurrency];
    } else {
      price = getProductMainPrice(product, activeCurrency);
    }

    const renderBrand = () => {
      if (brand) {
        return (
          <div className="normal-field-box">
            <div className="field-label">Seller: </div>
            <div className="field-content">
              <span>{_.get(brand, ['data', 'name', activeLocale])}</span> <br />
              <Link to={`/brands/${brand.id}`}>Products this seller provide</Link> <br />
              <a onClick={() => addFavoriteBrand(brand.id)}>Add Favorite Brand</a>
            </div>
          </div>
        );
      }
      return '';
    };

    return (
      <div className="container">
        <Breadcrumb key="breadcrumb-default" path={path} />
        {product.data && product.data.categoryPath ? product.data.categoryPath.map(renderPath) : []}
        <div clssName="container-table">
          <div className="product-detail-left">
            <div className="left-thumbnail-container">
              {images.map(renderThumbnail)}
            </div>
            <div onMouseMove={this.handleMouseMoveMainImage}
              onMouseEnter={this.handleMouseEnterMainImage}
              onMouseLeave={this.handleMouseLeaveMainImage}
              className="main-image-box"
            >
              <img src={activeImage.url} />
            </div>
            <div className="enlarge-image-box">
              <img src={activeImage.url} />
            </div>
          </div>
          <div className="product-detail-right">
            <span className="product-title">
              2015 New Autumn Fashion Brand Men Clothes Slim Fit Men Long Sleeve Shirt Men Plaid Cotton Casual Men Shirt
              Social Plus Size 5XL
            </span>
            <div className="divider"></div>
            <div className="price-info-box">
              <div className="field-label">Price: </div>
              <div className="field-content price-value"><b>{activeCurrency} {price}</b> / pieces</div>
            </div>
            {attributes.map((attr) => renderAttributes(attr.attrName, variantAttributes[attr.key], attr.select))}
            <div className="normal-field-box">
              <div className="field-label">Quantity: </div>
              <div className="field-content"><input type="number" defaultValue="1" min="1" ref="quantity" /></div>
            </div>
            {renderBrand()}
            <div className="normal-field-box">
              <div className="field-label"></div>
              <div className="field-content">
                <button className={`product-buy-now-button ${buttonClassName}`}
                  disabled={!selectedVariant}
                  onClick={() => buyNow(selectedVariant.id, this.refs.quantity.value)}
                >
                  Buy Now
                </button>
                <button className={`product-add-to-cart-button ${buttonClassName}`}
                  disabled={!selectedVariant}
                  onClick={() => addCartProduct(selectedVariant.id, this.refs.quantity.value)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="normal-field-box">
              <div className="field-label"></div>
              <div className="field-content">
                <a onClick={() => addWish(product.id)}>Add to Wish List</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
