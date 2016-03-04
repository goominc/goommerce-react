// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import loadEntities from 'commons/redux/util/loadEntities';

import OrderListComponent from 'components/OrderListComponent';

import { ApiAction } from 'redux/actions';
const { loadMyOrders } = ApiAction;

const MyOrderContainer = React.createClass({
  propTypes: {
    orders: PropTypes.array,
    loadMyOrders: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.props.loadMyOrders();
  },
  render() {
    const { orders } = this.props;
    if (!orders) {
      return (<div></div>);
    }
    return (
      <OrderListComponent orders={orders} />
    );
  },
});

export default connect(
  (state) => loadEntities(state, 'myOrders', 'orders'),
  { loadMyOrders }
)(MyOrderContainer);
