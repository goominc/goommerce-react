import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ProductDetailBanner from './ProductDetailBanner';
import ProductDetailRelated from './ProductDetailRelated';

export default React.createClass({
  /*propTypes: {

  },*/
  render() {
    const product = {
      'id': 1,
      'title': '2015 New Autumn Women Dress Zipper Off Shoulder Long Sleeve Dresses Sexy Club Evening Party Bodycon Mini Dresses Black White',
      'price_app': 'US $8.82',
      'price': 'US $8.99',
      'origin_price': 'US $17.63',
    };
    return (
      <article className="ms-detail">
        <ProductDetailBanner />
        <p className="ms-detail-subject ms-pd-lr12">{product.title}</p>

        <section className="ms-product-datail-price-tag  ms-app-only-product-detail-price">
          <a className="ms-app-only-price-tag-wrapper j-price-tag">
            <div className="ms-price-tag">
              <span className="ms-price-tag-info"><i className="ms-icon icon-mobile"></i></span>
              <span className="ms-price-tag-price arrow-right">Price on the app: {product.price_app}<i className="ms-icon icon-dropright-android"></i></span>
            </div>
          </a>
        </section>

        <section className="ms-pd-lr12 ms-detail-price">
          <div className="detail-price-container">
            <span className="price-span">{product.price}</span>
            <span className="unit-span">  /piece</span>
          </div>
          <p className="detail-origin-price">
            <del>{product.origin_price}  /piece</del>
          </p>
        </section>

        <section className="ms-pd-lr12 ms-detail-discount">
          <span className="discount-p">
            <span className="normal-discount-span">-49%</span>
            <span className="coupon-discount-span"><Link to="http://m.aliexpress.com/store/storeHome.htm?sellerAdminSeq=201507793">Get a Store Coupon</Link></span>
            <p></p>
            <p className="bulk-price-p">Bulk Price: get an additional 5% off when you buy 10 piece or more</p>
            <div className="ms-arrow">
                <span className="ms-icon icon-arrow-down"></span>
            </div>
          </span>
        </section>

        <section className="ms-pd-lr12 ms-detail-orders-stars">
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
        </section>

        <section className="ms-detail-sku ms-sku-row ms-color-second">
          <p id="detail-sku-bar">
              Color
              Size
          </p>
          <p id="detail-shipping-bar">
            <span>Shipping cost: </span>
            <span className="ms-color-ship" id="detail-shipping-cost">Free Shipping</span>
          </p>
          <span className="ms-arrow">
            <span className="ms-icon icon-arrow-right"></span>
          </span>
        </section>

        <section className="ms-detail-btn-wrap ms-mrg-b12">
          <button className="ms-button-secondary" data-role="add-cart">Add to cart&nbsp;</button>
          <button className="ms-button-primary" data-role="buy-now">Buy now&nbsp;</button>
        </section>

        <section className="ms-detail-description ms-detail-row ms-color-second">
          <Link to="http://m.aliexpress.com/item-desc/32490813821.html">
            <p>Description&nbsp;</p>
          </Link>
          <span className="ms-arrow">
            <span className="ms-icon icon-arrow-right"></span>
          </span>
        </section>

        <section className="ms-color-second ms-mrg-b12 ms-feedback">
          <header className="ms-detail-row">
            <Link to="http://m.aliexpress.com/getSiteProductEvaluation.htm?productId=32490813821&amp;page=1">Feedback(164)</Link>
            <span className="ms-arrow">
              <span className="ms-icon icon-arrow-right"></span>
            </span>
          </header>
        </section>

        <section className="ms-detail-bp">
          <section className="ms-detail-row">
            <p><Link to="http://activities.aliexpress.com/adcms/www-aliexpress-com/buyerprotection/index.php">Buyer Protection</Link></p>
            <span className="ms-arrow">
                <span className="ms-icon icon-arrow-right"></span>
            </span>
          </section>
          <ul>
            <li className="bp-item">
                <p className="bp-title">Return Policy</p>
                <p className="bp-desc">Returns accepted if product not as described, buyer pays return shipping; or keep the product &amp; agree refund with seller.</p>
            </li>
            <li className="bp-item">
                <p className="bp-title">On-time Delivery <span className="ms-bp-days">60</span> days</p>
                <p className="bp-desc">Full refund if product isn't received in <span className="ms-bp-days">60</span> days</p>
            </li>
          </ul>
        </section>

        <section className="ms-mrg-b12 ms-detail-store">
          <Link to="http://m.aliexpress.com/store/storeHome.htm?sellerAdminSeq=201507793">
            <header className="store-title">Sammydress Group Co. Ltd</header>
            <p className="store-info">
              <img src="http://i01.i.aliimg.com/wimg/feedback/icon/25-s.gif" className="store-level" />
              <span className="store-postive">94.7% positive feedback the past</span>
            </p>
            <span className="ms-arrow">
              <span className="ms-icon icon-arrow-right"></span>
            </span>
          </Link>
        </section>

        <ProductDetailRelated />

      </article>
    );
  },
});