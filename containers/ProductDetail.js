import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getProductMainImage } from '../util';
import { loadProduct } from '../redux/actions';

const ProductDetail = React.createClass({
  propTypes: {
    productId: PropTypes.string.isRequired,
    product: PropTypes.object,
    loadProduct: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadProduct(this.props.productId);
  },
  render() {
    const { product } = this.props;
    const mainImage = getProductMainImage(product) || {};
    return (
      <div className="row">
        <img src={mainImage.url}/>
        <div>
          {product && product.sku}
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
  { loadProduct }
)(ProductDetail);
