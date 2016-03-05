import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';

import * as _ from 'lodash';

import { getProductMainPrice } from 'util';
import { initColorsAndSizes } from 'commons/utils/productUtil';

export default React.createClass({
  propTypes: {
    products: PropTypes.array.isRequired,
    changeMainImage: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { products, changeMainImage } = this.props;
    const { activeLocale, activeCurrency } = this.context;

    const renderItem = (item) => {
      // 2016. 03. 05. [heekyu] calc mainImage in parent Container
      // const image = getProductMainImage(item.topHit || item);
      const image = item.mainImage;
      const renderImage = (image2) => {
        if (!image2) {
          return (<img />);
        }
        if (!image2.publicId) {
          return (<img src={image2.url} />);
        }
        return (
          <CloudinaryImage publicId={image2.publicId}
            version={image2.version}
            options={ { width: 220, height: 330 } }
          />
        );
      };
      const renderVariantImages = () => {
        const parsed = initColorsAndSizes(item.productVariants || []);
        const colors = _.get(parsed, 'variantAttributes.colors');
        const renderColorImage = (color) => (
          <div key={color} className="variant-item" onClick={() => changeMainImage(item.id, colors[color].img)}>
            <div className="img-wrap">
              {renderImage(colors[color].img)}
              {color}
            </div>
          </div>
        );
        return Object.keys(colors).map((color) => renderColorImage(color));
      };
      return (
        <div key={item.id} className="product-list-item-wrap product-list-first-item">
          <div className="product-list-item-box">
            <div className="img-wrap">
              <Link to={`/products/${item.id}`}>
                {renderImage(image)}
              </Link>
            </div>
            <Link to={`/products/${item.id}`}>
              <div className="product-title">
                {item.id} <br />
                Brand: {_.get(item, `brand.data.name.${activeLocale}`)}
              </div>
            </Link>
            <div className="variant-image-container">
              {renderVariantImages()}
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
