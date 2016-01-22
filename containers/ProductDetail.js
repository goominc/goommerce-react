import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getProductMainImage } from '../util';
import { loadProduct, addToCart } from '../redux/actions';

const ProductDetail = React.createClass({
  propTypes: {
    productId: PropTypes.string.isRequired,
    product: PropTypes.object,
    loadProduct: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadProduct(this.props.productId);
  },
  addToCart(variant) {
    this.props.addToCart(variant.id);
  },
  renderVariant(variant) {
    return (
      <li key={variant.sku}>
        {variant.sku}
        <button onClick={() => this.addToCart(variant)}>add to cart</button>
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
    return (
      <div className="row">
        <img src={mainImage.url}/>
        <div>
          {product && product.sku}
        </div>
        <div>
          options:
          <ul>
            {variants.map(this.renderVariant)}
          </ul>
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
  { loadProduct, addToCart }
)(ProductDetail);
