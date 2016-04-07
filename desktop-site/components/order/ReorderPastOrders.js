// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    orders: PropTypes.array,
  },
  render() {
    const { orders } = this.props;
    // B brands, P products, V variants
    // TODO statistic datas in state
    const allInfo = {
      brands: new Set(),
      products: new Set(),
      variantCount: 0,
      totalPieces: 0,
    };
    orders.forEach((order) => {
      allInfo.variantCount += order.orderProducts.length;
      (order.orderProducts || []).forEach((orderProduct) => {
        allInfo.totalPieces += orderProduct.quantity;
        const brandId = _.get(orderProduct, 'brand.id');
        const productId = _.get(orderProduct, 'product.id');
        if (!brandId) {
          allInfo.brands.add(brandId);
        }
        if (!productId) {
          allInfo.products.add(productId);
        }
      });
    });

    return (
      <div></div>
    );
  },
});
