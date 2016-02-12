// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { getProductThumbnail } from '../util';

export default React.createClass({
  propTypes: {
    orders: PropTypes.array.isRequired,
  },
  render() {
    function formatDate(date) {
      return new Date(date).toString();
    }
    const { orders } = this.props;
    console.log(orders);

    const renderProductVariant = (variant) => {
      return (
        <div key={variant.id} className="order-product-item">
          <div className="thumbnail-box"><img src={getProductThumbnail(variant)} /></div>
          <div className="content-box">
            {variant.sku} <br/>
            Price / piece : {variant.price.KRW} <br/>
            Count: {variant.count} <br/>
            Total Price : {variant.total.KRW} <br/>
          </div>
        </div>
      );
    };
    const renderOrder = (order) => {
      return (
        <div key={order.id} className="order-box">
          <div className="order-head">
            <span>Order Id: {order.id} </span> <Link to={`/orders/${order.id}`} >View Detail</Link> <br/>
            <span>Total Price: KWR {order.total.KRW}</span> <br/>
            <span>Order Date: {formatDate(order.createdAt)}</span> <br/>
            <span>Seller: Mola</span>
          </div>
          <div className="order-product-box">
            {order.productVariants.map(renderProductVariant)}
          </div>
          <div className="order-action-box">
            Status : {order.status}
          </div>
        </div>
      );
    };

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
          Order Number:  <input type="text" />
          Product:  <input type="text" />
          <button>Search</button>
        </div>
        <div className="order-list-container">
          {orders.map(renderOrder)}
        </div>
      </div>
    );
  },
});
