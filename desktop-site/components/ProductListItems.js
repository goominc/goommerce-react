import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';

import { getProductMainImage, getProductMainPrice } from 'util';

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

    const renderItem = (item) => {
      const image = getProductMainImage(item.topHit || item);
      const renderImage = () => {
        if (!image) {
          return (<img />);
        }
        if (!image.publicId) {
          return (<img src={image.url} />);
        }
        return (
          <CloudinaryImage publicId={image.publicId}
            version={image.version}
            options={ { width: 220, height: 330 } }
          />
        );
      };
      return (
        <div key={item.id} className="product-list-item-wrap product-list-first-item">
          <div className="product-list-item-box">
            <div className="img-wrap">
              <Link to={`/products/${item.id}`}>
                {renderImage()}
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
