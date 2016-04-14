// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import ProductListItem from './ProductListItem';

export default React.createClass({
  propTypes: {
    products: PropTypes.array.isRequired,
    changeMainImage: PropTypes.func,
  },
  render() {
    const { products, changeMainImage } = this.props;

    return (
      <div className="container no-padding">
        <div className="product-list-item-row">
          {products.map((product, index) => (
            <ProductListItem
              key={product.id}
              changeMainImage={changeMainImage}
              item={product}
              firstRow={index < 4}
              toggleWish={this.props.toggleWish} // eslint-disable-line
            />
          ))}
        </div>
      </div>
    );
  },
});
