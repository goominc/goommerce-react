import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getProductThumbnail } from '../util';

export default React.createClass({
  propTypes: {
    product: PropTypes.object.isRequired,
  },
  render() {
    const { product } = this.props;
    const thumbnail = getProductThumbnail(product) || {};
    return (
      <div className="col-xs-6 col-md-3">
        <Link to={`/products/${product.id}`}>
          <div className="thumbnail">
            <img src={thumbnail.url}/>
          </div>
          <div className="caption">
            {product.name.ko}
          </div>
        </Link>
      </div>
    );
  },
});
