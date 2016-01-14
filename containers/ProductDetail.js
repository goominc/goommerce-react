import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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
    return (
      <div>
        <img src="//res.cloudinary.com/seokgyo/image/upload/v1452739897/test_c9fs0n.jpg"/>
        <div>
          {product && product.data.ko}
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
