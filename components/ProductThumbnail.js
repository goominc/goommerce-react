import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    product: PropTypes.object.isRequired,
  },
  render() {
    const { product } = this.props;
    return (
      <div className="col-xs-6 col-md-3">
        <Link to={`/products/${product.id}`}>
          <div className="thumbnail">
            <img src="//res.cloudinary.com/seokgyo/image/upload/v1452739897/test_c9fs0n.jpg"/>
          </div>
          <div className="caption">
            {product.data.ko}
          </div>
        </Link>
      </div>
    );
  },
});
