import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getProductMainImage, getProductMainPrice } from '../util';
import { loadProduct, addCartProduct } from '../redux/actions';

import BreadCrumb from '../components/BreadCrumb';

const ProductDetail = React.createClass({
  propTypes: {
    productId: PropTypes.string.isRequired,
    product: PropTypes.object,
    loadProduct: PropTypes.func.isRequired,
    addCartProduct: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadProduct(this.props.productId);
  },
  addCartProduct(variant) {
    this.props.addCartProduct(variant.id);
  },
  renderVariant(variant) {
    return (
      <li key={variant.sku}>
        {variant.sku}
        <button onClick={() => this.addCartProduct(variant)}>add to cart</button>
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
  },
});

export default connect(
  (state, ownProps) => ({
    productId: ownProps.params.productId,
    product: state.entities.products[ownProps.params.productId],
  }),
  { loadProduct, addCartProduct }
)(ProductDetail);
