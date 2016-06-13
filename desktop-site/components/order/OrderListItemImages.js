// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  getInitialState() {
    return {};
  },
  render() {
    const { order } = this.props;
    const itemInRow = 9;
    const renderProduct = (p) => (
      <div key={p.productVariant.id} className="img-wrap">
        <img src={_.get(p.productVariant, 'appImages.default[0].url') || ''} />
      </div>
    );
    if (order.orderProducts.length <= itemInRow) {
      return (
        <div>
          {order.orderProducts.map(renderProduct)}
        </div>
      );
    }
    order.orderProducts = order.orderProducts.slice(0, 9);
    return (
      <div>
        {order.orderProducts.map(renderProduct)}
        <div className="nav-wrap"></div>
      </div>
    );
  },
});
