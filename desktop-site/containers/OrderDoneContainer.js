// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import OrderDone from 'components/checkout/OrderDone';

const OrderDoneContainer = React.createClass({
  propTypes: {
    orderId: PropTypes.string,
    order: PropTypes.object,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  componentDidMount() {
    this.context.ApiAction.loadOrder(this.props.orderId);
  },
  render() {
    return (
      <OrderDone {...this.props} />
    );
  },
});

export default connect(
  (state, ownProps) => ({
    orderId: ownProps.params.orderId,
    order: state.entities.orders[ownProps.params.orderId],
  })
)(OrderDoneContainer);
