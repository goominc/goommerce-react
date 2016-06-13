// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import loadEntities from 'commons/redux/util/loadEntities';
import i18n from 'commons/utils/i18n';

import OrderListComponent from 'components/order/OrderListComponent';

const MyOrderContainer = React.createClass({
  propTypes: {
    orders: PropTypes.array,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  getInitialState() {
    return { activeFilterIndex: 0 };
  },
  componentDidMount() {
    this.context.ApiAction.loadMyOrders();
  },
  render() {
    const { orders } = this.props;
    if (!orders) {
      return (<div></div>);
    }
    const changeStatus = (status, index) => {
      this.context.ApiAction.loadMyOrders(status).then(() => {
        this.setState({ activeFilterIndex: index });
      });
    };
    const filters = [
      { text: i18n.get('word.seeAll'), status: null },
      { text: i18n.get('enum.order.paymentStatus.200'), status: '0' },
      { text: i18n.get('enum.order.status.100'), status: '100,101,102' },
      { text: i18n.get('enum.order.status.200'), status: '200,202' },
      { text: i18n.get('enum.order.status.201'), status: '201,203' },
    ];
    const renderFilter = (filter, index) => (
      <div
        className={`item${index === this.state.activeFilterIndex ? ' active' : ''}`}
        onClick={() => changeStatus(filter.status, index)}
      >
        {filter.text}
      </div>
    );
    return (
      <div>
        <div className="order-list-status-filter-line">
          {filters.map(renderFilter)}
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
