// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    orders: PropTypes.array.isRequired,
  },
  render() {
    function formatDate(date) {
      return new Date(date).toString();
    }
    const { orders = [] } = this.props;

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
          <div className="order-box">
            <div className="order-head">
              Order Id: 1
            </div>
            <div className="order-product-box"></div>
          </div>
          <div className="order-box">
            <div className="order-head">
              Order Id: 2
            </div>
          </div>
          <div>
            <ul>
              {orders.map(order => <Link to={`/orders/${order.id}`} key={order.id}><li>{order.id}, KWR{order.total.KRW}, {formatDate(order.createdAt)}</li></Link>)}
            </ul>
          </div>
        </div>
      </div>
    );
  },
});
