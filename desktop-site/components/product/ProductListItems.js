// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import ProductListItem from './ProductListItem';

export default React.createClass({
  propTypes: {
    products: PropTypes.array.isRequired,
    rowSize: PropTypes.number,
  },
  render() {
    const { products, rowSize = 4 } = this.props;

    return (
      <div className="container no-padding">
        <div className="product-list-item-row">
          {products.map((product, index) => (
            <ProductListItem
              key={product.id}
              {...this.props}
              item={product}
              isFirstRow={index < rowSize}
              toggleWish={this.props.toggleWish} // eslint-disable-line
            />
          ))}
        </div>
      </div>
    );
  },
});
