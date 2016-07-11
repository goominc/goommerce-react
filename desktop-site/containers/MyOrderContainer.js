// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import loadEntities from 'commons/redux/util/loadEntities';
import i18n from 'commons/utils/i18n';

import OrderListComponent from 'components/order/OrderListComponent';
import PageButton from 'components/PageButton';

const MyOrderContainer = React.createClass({
  propTypes: {
    location: PropTypes.object,
    orders: PropTypes.array,
    pagination: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
    router: PropTypes.object,
  },
  componentDidMount() {
    this.loadOrders(_.get(this.props, 'location.query'));
  },
  componentWillReceiveProps(nextProps) {
    const oldParams = _.get(this.props, 'location.query');
    const newParams = _.get(nextProps, 'location.query');
    if (!_.isEqual(oldParams, newParams)) {
      this.loadOrders(newParams);
    }
  },
  loadOrders(params) {
    const { status = '', pageNum = 1 } = params;
    const limit = 10;
    const offset = (pageNum - 1) * limit;
    const pagination = { offset, limit };
    const filters = this.filters();
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].status === status) {
        this.context.ApiAction.loadMyOrders(status, pagination);
        return;
      }
    }
    this.context.ApiAction.loadMyOrders('', pagination);
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
    const { location, orders, pagination } = this.props;
    if (!orders) {
      return (<div></div>);
    }
    const urlStatus = _.get(this.props, 'location.query.status');
    const changeStatus = (status) => {
      if (status !== urlStatus) {
        // this.context.ApiAction.loadMyOrders(status);
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
    const genLink = (pageNum) => `${location.pathname}?status=${location.query.status || ''}&pageNum=${pageNum}`;
    return (
      <div>
        <div className="order-list-status-filter-line">
          {this.filters().map(renderFilter)}
        </div>
        <OrderListComponent orders={orders} />
        <PageButton
          className="mypage-page-line"
          genLink={genLink}
          pagination={pagination}
        />
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    ...loadEntities(state, 'myOrders', 'orders'),
    pagination: state.entities.orders.pagination,
  })
)(MyOrderContainer);
