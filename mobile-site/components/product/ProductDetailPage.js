import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import ProductDetailBanner from 'components/product/ProductDetailBanner';
import ProductDetailCart from 'components/product/ProductDetailCart';

import brandUtil from 'commons/utils/brandUtil';
import productUtil from 'commons/utils/productUtil';
import numberUtil from 'commons/utils/numberUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
    product: PropTypes.object,
    images: PropTypes.array,
    variants: PropTypes.array,
    showCart: PropTypes.bool.isRequired,
    toggleCart: PropTypes.func.isRequired,
    colors: PropTypes.array,
    sizes: PropTypes.array,
    currentColor: PropTypes.string,
    currentSize: PropTypes.string,
    currentVariant: PropTypes.string,
    setColor: PropTypes.func.isRequired,
    setSize: PropTypes.func.isRequired,
    addCart: PropTypes.func.isRequired,
    buyNow: PropTypes.func.isRequired,
    addWish: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  getInitialState() {
    return {};
  },
  handleFavorite(brandId) {
    this.props.addFavorite(brandId);
    $('.add-favorite').addClass('active');
  },
  render() {
    const { auth, product, images, showCart, variants, colors, sizes,
      currentColor, currentSize, currentVariant } = this.props;
    const { activeCurrency, currencySign } = this.context;
    if (!product || !Object.keys(product).length) {
      return (
        <div />
        );
    }

    const renderBrand = () => {
      if (product && product.brand && product.brand.data) {
        if (!auth.id) {
          return (
            <section className="ms-detail-store">
              <p className="store-info">
                {i18n.get('mItemDetail.buildingInfoOnlySignup')}
              </p>
            </section>
          );
        }
        return (
          <section className="ms-detail-store">
            <Link to={`/brands/${product.brand.id}`}>
              <header className="store-title">{brandUtil.getName(product.brand)}</header>
              <p className="store-info">
                {_.get(product.brand, 'data.location.building.name.ko')}
              </p>
              { /* <p className="store-info">
                <img src="http://i01.i.aliimg.com/wimg/feedback/icon/25-s.gif" className="store-level" />
                <span className="store-postive">94.7% positive feedback the past</span>
              </p> */ }
            </Link>
            {<div className="add-favorite" onClick={() => this.handleFavorite(product.brand.id)}>{i18n.get('pcItemDetail.favoriteBrands')}</div>}
          </section>
        );
      }
      return null;
    };
    const setColor = (color) => {
      if (currentColor !== color.color) {
        (images || []).forEach((image, index) => {
          if (image.url === _.get(color.variant, 'appImages.default[0].url')) {
            // does not work
            // $('.owl-carousel').trigger('owl.goTo', index);
            // this.refs.carousel.goTo(3);
            // 2016. 06. 07. [heekyu] does not work without timeout
            setTimeout(() => {
              // this.refs.banner.goTo(index);
              $('.owl-carousel').trigger('owl.goTo', index);
            }, 100);
          }
        });
      }
      this.props.setColor(color.color);
    };

    return (
      <article className="ms-detail">
        <ProductDetailBanner ref="banner" images={images} addWish={this.props.addWish} />

        <p className="ms-detail-subject ms-pd-lr12">{productUtil.getName(product)}</p>

        <section className="ms-pd-lr12 ms-detail-price">
          <div className="detail-price-container">
            {auth.id &&
              <span className="price-span">{numberUtil.formatPrice(product[activeCurrency], activeCurrency, currencySign)}</span>
            }
            <span className="unit-span"></span>
          </div>
        </section>

        {renderBrand()}

        <ProductDetailCart show={showCart} toggle={this.props.toggleCart} images={images}
          currentColor={currentColor} currentSize={currentSize} currentVariant={currentVariant}
          variants={variants} colors={colors} sizes={sizes} setColor={setColor} setSize={this.props.setSize}
          addCart={this.props.addCart} buyNow={this.props.buyNow} product={product}
        />
      </article>
    );
  },
});
