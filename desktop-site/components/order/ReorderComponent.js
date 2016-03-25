// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import ReorderCart from './ReorderCart';
import ReorderPastOrders from './ReorderPastOrders';
import ReorderNewOrders from './ReorderNewOrders';

export default React.createClass({
  propTypes: {
    cart: PropTypes.array,
    reorderTab: PropTypes.string,
  },
  render() {
    const currentTab = this.props.reorderTab;
    let currentIndex = 0; // default is Cart
    const reorderTabs = ['Cart', 'PastOrder', 'NewOrder'];
    const components = [<ReorderCart />, <ReorderPastOrders />, <ReorderNewOrders />];
    for (let i = 1; i < reorderTabs.length; i++) {
      if (currentTab === reorderTabs[i]) {
        currentIndex = i;
        break;
      }
    }
    return (
      <div className="mypage-right-box">
        <h2>ReOrder</h2>
        <div className="order-status-bar">
          {reorderTabs.map((tab, index) => (<span className={currentIndex === index ? 'active' : ''}>{tab}</span>))}
        </div>
        <div className="order-list-container">
          {components[currentIndex]}
        </div>
      </div>
    );
  },
});
