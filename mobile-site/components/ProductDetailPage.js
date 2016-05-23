import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ProductDetailBanner from 'components/ProductDetailBanner';
// import ProductDetailRelated from 'components/ProductDetailRelated';
import ProductDetailCart from 'components/ProductDetailCart';
import brandUtil from 'commons/utils/brandUtil';
import productUtil, { getProductMainPrice } from 'commons/utils/productUtil';

export default React.createClass({
  propTypes: {
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
  },
  handleFavorite(brandId) {
    this.props.addFavorite(brandId);
    $('.add-favorite').addClass('active');
  },
  render() {
    const { product, images, showCart, variants, colors, sizes,
      currentColor, currentSize, currentVariant } = this.props;
    const { activeCurrency } = this.context;
    if (!product || !Object.keys(product).length) {
      return (
        <div />
        );
    }

    const renderBrand = () => {
      if (product && product.brand && product.brand.data) {
        return (
        <section className="ms-detail-store">
          <Link to={`/brands/${product.brand.id}`}>
            <header className="store-title">{brandUtil.getName(product.brand)}</header>
            <p className="store-info">
              {brandUtil.getBuildingInfo(product.brand)}
            </p>
            { /* <p className="store-info">
              <img src="http://i01.i.aliimg.com/wimg/feedback/icon/25-s.gif" className="store-level" />
              <span className="store-postive">94.7% positive feedback the past</span>
            </p> */ }
          </Link>
          <div className="add-favorite" onClick={() => this.handleFavorite(product.brand.id)}>단골 브랜드</div>
        </section>
        );
      }
      return null;
    };

    return (
      <article className="ms-detail">
        <ProductDetailBanner images={images} addWish={this.props.addWish} />

        <p className="ms-detail-subject ms-pd-lr12">{productUtil.getName(product)}</p>

        { /* <section className="ms-product-datail-price-tag  ms-app-only-product-detail-price">
          <a className="ms-app-only-price-tag-wrapper j-price-tag">
            <div className="ms-price-tag">
              <span className="ms-price-tag-info"><i className="ms-icon icon-mobile"></i></span>
              <span className="ms-price-tag-price arrow-right">Price on the app: {product.price_app}
                <i className="ms-icon icon-dropright-android"></i>
              </span>
            </div>
          </a>
        </section> */ }

        <section className="ms-pd-lr12 ms-detail-price">
          <div className="detail-price-container">
            <span className="price-span">{activeCurrency} {getProductMainPrice(product, activeCurrency)}</span>
            <span className="unit-span"></span>
          </div>
          { /* <p className="detail-origin-price">
            <del>{activeCurrency} {getProductMainPrice(product, activeCurrency)} /piece</del>
          </p> */ }
        </section>

        { /* <section className="ms-pd-lr12 ms-detail-discount">
          <span className="discount-p">
            <span className="normal-discount-span">-49%</span>
            <span className="coupon-discount-span">
              <Link to="http://m.aliexpress.com/store/storeHome.htm?sellerAdminSeq=201507793">Get a Store Coupon
              </Link>
            </span>
            <p></p>
            <p className="bulk-price-p">Bulk Price: get an additional 5% off when you buy 10 piece or more</p>
            <div className="ms-arrow">
                <span className="ms-icon icon-arrow-down"></span>
            </div>
          </span>
        </section> */ }

        { /* <section className="ms-pd-lr12 ms-detail-orders-stars">
          <div className="orders-wrap">
            <span>Orders </span><span>818</span>
          </div>
          <div className="stars-wrap">
            <span className="rating-detail">  94.7%  Satisfied</span>
            <span className="rating-stars ms-star">
              <span className="ms-star-bottom"></span>
              <span className="ms-star-top" style={ { width: '94.7%' } }></span>
            </span>
          </div>
        </section> */ }

        {renderBrand()}

        <section className="ms-detail-sku ms-sku-row ms-color-second" onClick={this.props.toggleCart}>
          <p id="detail-sku-bar">
              Color
              Size
          </p>
          { /* <p id="detail-shipping-bar">
            <span>Shipping cost: </span>
            <span className="ms-color-ship" id="detail-shipping-cost">Free Shipping</span>
          </p> */ }
          <span className="ms-arrow">
            <span className="ms-icon icon-arrow-right"></span>
          </span>
        </section>

        <section className="ms-detail-btn-wrap ms-mrg-b12">
          <button className="ms-button-secondary" onClick={this.props.toggleCart}>Add to cart&nbsp;</button>
          <button className="ms-button-primary" onClick={this.props.toggleCart}>Buy now&nbsp;</button>
        </section>

        { /* <section className="ms-detail-description ms-detail-row ms-color-second">
          <Link to="/">
            <p>Description&nbsp;</p>
          </Link>
          <span className="ms-arrow">
            <span className="ms-icon icon-arrow-right"></span>
          </span>
        </section> */ }

        { /* <section className="ms-color-second ms-mrg-b12 ms-feedback">
          <header className="ms-detail-row">
            <Link to="/"">Feedback(164)</Link>
            <span className="ms-arrow">
              <span className="ms-icon icon-arrow-right"></span>
            </span>
          </header>
        </section> */ }

        { /* <section className="ms-detail-bp">
          <section className="ms-detail-row">
            <p><Link to="/">Buyer Protection</Link></p>
            <span className="ms-arrow">
                <span className="ms-icon icon-arrow-right"></span>
            </span>
          </section>
          <ul>
            <li className="bp-item">
              <p className="bp-title">Return Policy</p>
              <p className="bp-desc">
                Returns accepted if product not as described, buyer pays return shipping;
                or keep the product &amp; agree refund with seller.
              </p>
            </li>
            <li className="bp-item">
              <p className="bp-title">On-time Delivery <span className="ms-bp-days">60</span> days</p>
              <p className="bp-desc">
                Full refund if product isn't received in <span className="ms-bp-days">60</span> days
              </p>
            </li>
          </ul>
        </section> */ }

        { /* <ProductDetailRelated /> */ }

        <ProductDetailCart show={showCart} toggle={this.props.toggleCart} topImg={images}
          currentColor={currentColor} currentSize={currentSize} currentVariant={currentVariant}
          variants={variants} colors={colors} sizes={sizes} setColor={this.props.setColor} setSize={this.props.setSize}
          addCart={this.props.addCart} buyNow={this.props.buyNow} product={product}
        />

      </article>
    );
  },
});
