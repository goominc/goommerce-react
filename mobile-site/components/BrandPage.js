import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';
import { getProductMainImage, getProductMainPrice } from '../../desktop-site/util';
import brandUtil from 'commons/utils/brandUtil';

export default React.createClass({
  propTypes: {
    brand: PropTypes.object.isRequired,
    products: PropTypes.array,
    addFavoriteBrand: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  handleFavorite() {
    const { brand } = this.props;
    this.props.addFavoriteBrand(brand.id);
  },
  render() {
    const { brand, products } = this.props;
    const { activeCurrency } = this.context;

    const prodDivs = products.map((prod) => {
      const image = getProductMainImage(prod.topHit || prod);
      const renderImage = () => {
        if (!image) {
          return (<img />);
        }
        return (<img src={image.url} />);

        /* if (!image.publicId) {
          return (<img src={image.url} />);
        }
        return (
          <CloudinaryImage publicId={image.publicId}
            version={image.version}
            options={ { width: 220, height: 330 } }
          />
        ); */
      };

      return (
          <li className="ms-gallery-item" key={prod.id}>
            <div className="ms-gallery-inner">
              <Link to={`/products/${prod.id}`}>
                <div className="ms-gallery-pic">
                  {renderImage()}
                </div>
                <div className="ms-gallery-info">
                  <span className="ms-gallery-price">{activeCurrency} {getProductMainPrice(prod, activeCurrency)}</span>
                  <span className="ms-gallery-discount">-31%</span>
                </div>
              </Link>
            </div>
            <div className="ms-space">
            </div>
          </li>
        );
    });

    return (
      <div className="ms-wrap ms-android-style">
        <section className="ms-store-header">
          <div>
            <div className="ms-store-header-wrap">
              <p className="ms-store-name">{brandUtil.getName(brand)}</p>
              { /*
              <p className="ms-store-rank">
                <img src="http:///i01.i.aliimg.com/wimg/feedback/icon/21-s.gif" />
              </p>
              <p className="ms-store-feedback">
                95.6% <span className="ms-store-feedback-text">Positive feedback</span>
              </p> */ }
            </div>
          </div>

        </section>
        <section className="ms-store-stats ms-store-flex">
          <div className="ms-store-stats-item ms-store-flex-item">
            <a href="http://m.aliexpress.com/search.htm?sellerAdminSeq=224815799&amp;sortType=TC3_D">
              <p className="ms-store-stats-item-number">417</p>
              <p className="ms-store-stats-item-name">Items</p>
            </a>
          </div>
          <div className="ms-store-stats-item-separation">
          </div>
          <div className="ms-store-stats-item ms-store-flex-item">
            <a href="http://m.aliexpress.com/store/sellerInfo.htm?sellerAdminSeq=224815799" title="Feedback">
              <p className="ms-store-stats-item-number">636</p>
              <p className="ms-store-stats-item-name">Feedbacks</p>
            </a>
          </div>
          <div className="ms-store-stats-item-separation">
          </div>
          <div className="ms-store-stats-item ms-store-flex-item">
            <p className="ms-store-stats-item-number">65</p>
            <p className="ms-store-stats-item-name">Wish List</p>
          </div>
        </section>

        <section className="ms-store-operation ms-store-flex">
          <div className="ms-store-operation-item">
            <button className="ms-button-secondary ms-text-change-by-client" id="ms-store-contact-seller">
              Contact Seller
            </button>
          </div>
          <div className="ms-store-operation-item">
            <button className="ms-button-secondary j-add-wish-list ms-text-change-by-client"
              onClick={this.handleFavorite}
            >
              Add to Wish List
            </button>
          </div>
        </section>
        <section className="ms-space">
        </section>

        <section className="ms-space">
        </section>

        <section className="ms-store-searchinstore">
          <div>
            <span className="ms-store-searchinstore-text">Search in Store</span>
            <i className="ms-icon icon-search-android ms-store-searchinstore-icon"></i>
          </div>
        </section>
        <section className="ms-space">
        </section>

        { /*
        <section className="ms-store-fixed-bar">
          <a href="/store/StoreCategory.htm?sellerAdminSeq=224815799" className="ms-button-secondary ms-store-fixed-item ms-text-change-by-client" data-target="blank" title="Store Categories">Store Categories</a>
          <a href="/search.htm?sellerAdminSeq=224815799" className="ms-button-secondary ms-store-fixed-item ms-text-change-by-client">View All Products</a>
        </section> */ }

        { /* discount area
        <header className="ms-store-title">
          <a href="http://m.aliexpress.com/store/storeDiscount.htm?sellerAdminSeq=224815799" data-target="blank" title="Store Discounts">
            <span className="ms-store-title-text">Store Discounts (<span className="ms-store-title-num">1</span>)</span>
            <i className="ms-store-more ms-icon icon-more-android"></i>
          </a>
        </header>
        <section className="ms-store-discount">
          <a href="http://m.aliexpress.com/store/storeDiscount.htm?sellerAdminSeq=224815799" data-target="blank" title="Store Discounts">
            <div className="ms-store-discount-wrap ms-store-flex">
              <span className="ms-store-discount-text ms-store-discount-text-large ms-store-flex-item">
                            Get US $1.00 off on orders over US $19.00
                <p className="ms-store-discount-text-small">
                            Seller Discount On all products
                          </p>
              </span>
            </div>
          </a>
        </section>
        <section className="ms-space">
        </section> */ }

        { /* coupon area
        <header className="ms-store-title">
          <a href="http://m.aliexpress.com/store/storeCoupon.htm?sellerAdminSeq=224815799" data-target="blank" className="j-has-login" title="Store Coupons">
            <span className="ms-store-title-text">Store Coupons (<span className="ms-store-title-num">1</span>)</span>
            <i className="ms-store-more ms-icon icon-more-android"></i>
          </a>
        </header>
        <section className="ms-store-coupon-list">
          <a href="http://m.aliexpress.com/store/storeCoupon.htm?sellerAdminSeq=224815799" data-target="blank" className="j-has-login" title="Store Coupons">
            <div className="ms-store-coupon-wrap ms-store-flex">
              <span className="ms-store-coupon-item">
                    <span className="ms-store-coupon-text ms-store-coupon-text-large">
                      US $2.00
                      <p className="ms-store-coupon-text-small">Get it Now</p>
                    </span>
              </span>
            </div>
          </a>
        </section>
        <section className="ms-space">
        </section> */ }

        { /* new Arrivals or Sale or etc..
        <header className="ms-store-title">
          <a href="http://m.aliexpress.com/store/newArrival.htm?sellerAdminSeq=224815799" data-target="blank" title="New Arrivals">
            <span className="ms-store-title-text">New Arrivals (<span className="ms-store-title-num">33</span>)</span>
            <i className="ms-store-more ms-icon icon-more-android"></i>
          </a>
        </header>
        <section className="ms-store-product-list">
          <a href="http://m.aliexpress.com/store/newArrival.htm?sellerAdminSeq=224815799" data-target="blank" title="New Arrivals">
            <div className="ms-store-product-wrap ms-store-flex">
              <div className="ms-store-product-item ">
                <div className="ms-store-product-inner">
                  <img className="ms-store-product-pic" src="http://g03.a.alicdn.com/kf/HTB1wEHmLVXXXXXZXXXXq6xXFXXXx/2016-Summer-Womens-Short-Sleeve-White-Chiffon-Blouse-Shirt-Ladies-Elegant-Sexy-V-Neck-Blouses-Female.jpg_350x350.jpg" />
                  <span className="ms-store-product-text">US $8.37</span>
                </div>
              </div>
              <div className="ms-store-product-item ">
                <div className="ms-store-product-inner">
                  <img className="ms-store-product-pic" src="http://g02.a.alicdn.com/kf/HTB12Eu6LVXXXXafXpXXq6xXFXXXO/ZANZEA-2016-Summer-Women-Bohemia-Casual-Loose-Dress-Short-Sleeve-Irregular-Collar-Long-Party-Solid-Dress.jpg_350x350.jpg" />
                  <span className="ms-store-product-text">US $9.76</span>
                </div>
              </div>
            </div>
          </a>
        </section>
        <section className="ms-space">
        </section> */ }

        <header className="ms-store-title">
          <a href="http://m.aliexpress.com/store/customModule.htm?sellerAdminSeq=224815799&amp;moduleIndex=1" data-target="blank" title="2016 NEW ">
            <span className="ms-store-title-text">2016 NEW  (<span className="ms-store-title-num">417</span>)</span>
            <i className="ms-store-more ms-icon icon-more-android"></i>
          </a>
        </header>
        <section className="ms-store-product-list">
          <a href="http://m.aliexpress.com/store/customModule.htm?sellerAdminSeq=224815799&amp;moduleIndex=1" data-target="blank" title="2016 NEW ">
            <div className="ms-store-product-wrap ms-store-flex">
              <div className="ms-store-product-item ">
                <div className="ms-store-product-inner">
                  <img className="ms-store-product-pic" src="http://g03.a.alicdn.com/kf/HTB1wEHmLVXXXXXZXXXXq6xXFXXXx/2016-Summer-Womens-Short-Sleeve-White-Chiffon-Blouse-Shirt-Ladies-Elegant-Sexy-V-Neck-Blouses-Female.jpg_350x350.jpg" />
                  <span className="ms-store-product-text">US $8.37</span>
                </div>
              </div>
              <div className="ms-store-product-item ">
                <div className="ms-store-product-inner">
                  <img className="ms-store-product-pic" src="http://g02.a.alicdn.com/kf/HTB12Eu6LVXXXXafXpXXq6xXFXXXO/ZANZEA-2016-Summer-Women-Bohemia-Casual-Loose-Dress-Short-Sleeve-Irregular-Collar-Long-Party-Solid-Dress.jpg_350x350.jpg" />
                  <span className="ms-store-product-text">US $9.76</span>
                </div>
              </div>
            </div>
          </a>
        </section>
        <section className="ms-space">
        </section>

        <section className="ms-store-selling-table">
          <header className="ms-store-selling-table-title">
            <div className="ms-store-flex">
              <div className="ms-store-flex-item ms-store-selling-table-title-line"></div>
              <span className="ms-store-flex-item ms-store-selling-table-title-text">&nbsp;Top Selling&nbsp;</span>
              <div className="ms-store-flex-item ms-store-selling-table-title-line"></div>
            </div>
          </header>
          <div className="content ms-store-gallery">
            <ul className="ms-gallery">
              {prodDivs}
            </ul>
          </div>
        </section>
      </div>
    );
  },
});
