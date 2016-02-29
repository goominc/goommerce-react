import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { getProductMainImage, getProductMainPrice } from '../util';

export default React.createClass({
  propTypes: {
    products: PropTypes.array.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { products } = this.props;
    const { activeCurrency } = this.context;
    const itemsInRow = 3;
    const maxRowCount = 10;
    const renderItem = (item, index) => {
      return (
        <div key={item.id} className="product-list-item-wrap product-list-first-item">
          <div className="product-list-item-box">
            <div className="img-wrap">
              <Link to={`/products/${item.id}`}>
                <img src={getProductMainImage(item.topHit || item)} />
              </Link>
            </div>
            <div className="product-title">
              <Link to={`/products/${item.id}`}>Socone Mens Women Breathable Trail Running Shoes New 2015 Summer Mens Shoes Outdoor Water Shoe Athletic Sport Shoes Men Trainers</Link>
            </div>
            <div className="product-price">
              {activeCurrency} {getProductMainPrice(item, activeCurrency)}
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
