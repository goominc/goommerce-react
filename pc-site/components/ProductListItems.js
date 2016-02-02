import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { getProductMainImage, getProductMainPrice } from '../util';

export default React.createClass({
  propTypes: {
    products: PropTypes.object.isRequired,
  },
  render() {
    const { products } = this.props;
    const itemsInRow = 3;
    const maxRowCount = 10;
    const renderItem = (item, index) => {
      return (
        <div key={item.id} className="product-list-item-wrap product-list-first-item">
          <div className="product-list-item-box">
            <img src={getProductMainImage(item)} />
            <div className="product-title">
              <Link to={`/products/${item.id}`}>Socone Mens Women Breathable Trail Running Shoes New 2015 Summer Mens Shoes Outdoor Water Shoe Athletic Sport Shoes Men Trainers</Link>
            </div>
            <div className="product-price">
              KRW {getProductMainPrice(item, 'KRW')}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="container">
        <div className="product-list-item-row">
          {products.map(renderItem)}
        </div>
      </div>
    );
  },
});
