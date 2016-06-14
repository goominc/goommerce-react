// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import loadEntities from 'commons/redux/util/loadEntities';
import i18n from 'commons/utils/i18n';

import OrderListComponent from 'components/order/OrderListComponent';

const MyOrderContainer = React.createClass({
  propTypes: {
    orders: PropTypes.array,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    router: PropTypes.object,
  },
  componentDidMount() {
    const urlStatus = _.get(this.props, 'location.query.status');
    const filters = this.filters();
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].status === urlStatus) {
        this.context.ApiAction.loadMyOrders(urlStatus);
        return;
      }
    }
    this.context.ApiAction.loadMyOrders();
  },
  filters() {
    return [
      { text: i18n.get('word.seeAll'), status: null },
      { text: i18n.get('enum.order.paymentStatus.200'), status: '0' },
      { text: i18n.get('enum.order.status.100'), status: '100,101,102' },
      { text: i18n.get('enum.order.status.200'), status: '200,202' },
      { text: i18n.get('enum.order.status.201'), status: '201,203' },
    ];
  },
  render() {
    const { orders } = this.props;
    if (!orders) {
      return (<div></div>);
    }
    const urlStatus = _.get(this.props, 'location.query.status');
    const changeStatus = (status) => {
      if (status !== urlStatus) {
        this.context.ApiAction.loadMyOrders(status);
        this.context.router.push(`/mypage/orders${status ? `?status=${status}` : ''}`);
      }
    };
    const renderFilter = (filter, index) => (
      <div
        key={`mypage-summary-${index}`}
        className={`item${(urlStatus === filter.status || (!urlStatus && !filter.status)) ? ' active' : ''}`}
        onClick={() => changeStatus(filter.status)}
      >
        {filter.text}
      </div>
    );
    return (
      <div>
        <div className="order-list-status-filter-line">
          {this.filters().map(renderFilter)}
        </div>
        <OrderListComponent orders={orders} />
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    ...loadEntities(state, 'myOrders', 'orders'),
  })
)(MyOrderContainer);
