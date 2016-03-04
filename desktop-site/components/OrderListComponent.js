// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { getProductThumbnail } from 'util';

export default React.createClass({
  propTypes: {
    orders: PropTypes.array.isRequired,
  },
  render() {
    function formatDate(date) {
      return new Date(date).toString();
    }
    const { orders } = this.props;

    const renderOrderProduct = (product) => {
      const variant = product.productVariant;
      const thumbnail = getProductThumbnail(variant) || getProductThumbnail(product.product);
      return (
        <div key={product.id} className="order-product-item">
          <div className="thumbnail-box"><img src={thumbnail} /></div>
          <div className="content-box">
            {variant.sku} <br />
            Price / piece : {product.KRW} <br />
            Count: {product.orderedCount} <br />
            Total Price : {product.totalKRW} <br />
          </div>
        </div>
      );
    };
    const renderOrder = (order) => (
      <div key={order.id} className="order-box">
        <div className="order-head">
          <span>Order Id: {order.id} </span> <Link to={`/orders/${order.id}`} >View Detail</Link> <br />
          <span>Total Price: KWR {order.totalKRW}</span> <br />
          <span>Order Date: {formatDate(order.createdAt)}</span> <br />
          <span>Seller: Mola</span>
        </div>
        <div className="order-product-box">
          {(order.orderProducts || []).map(renderOrderProduct)}
        </div>
        <div className="order-action-box">
          Status : {order.status}
        </div>
      </div>
    );

    return (
      <div className="mypage-right-box">
        <h2>Orders</h2>
        <div className="order-status-bar">
          <span>Before Payment</span>
          <span className="active">Before shipping</span>
          <span>On Delivery</span>
          <span>Complete</span>
        </div>
        <div className="order-search-bar">
          Order Number: <input type="text" />
          Product: <input type="text" />
          <button>Search</button>
        </div>
        <div className="order-list-container">
          {orders.map(renderOrder)}
        </div>
      </div>
    );
  },
});
