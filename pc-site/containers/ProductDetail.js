import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductDetailPage from '../components/ProductDetailPage';

import { ApiAction } from '../redux/actions';
const { loadProduct, addCartProduct } = ApiAction;

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
  render() {
    const { product, addCartProduct } = this.props;
    return (
      <ProductDetailPage product={product} addCartProduct={addCartProduct} />
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
