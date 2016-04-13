// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import ProductListItem from './product/ProductListItem';

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
          {products.map((product) => (<ProductListItem item={product} changeMainImage={changeMainImage} />))}
        </div>
      </div>
    );
  },
});
