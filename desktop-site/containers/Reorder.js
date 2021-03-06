// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import loadEntities from 'commons/redux/util/loadEntities';
import MyPageLeftbar from 'components/mypage/MyPageLeftbar';
import ReorderComponent from 'components/order/ReorderComponent';
import orderUtil from 'commons/utils/orderUtil';
import { setReorderBrand, setReorderProduct } from 'redux/actions';

const Reorder = React.createClass({
  propTypes: {
    cart: PropTypes.object,
    orders: PropTypes.array,
    setReorderBrand: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.context.ApiAction.loadMyOrders();
    this.context.ApiAction.loadCart();
  },
  render() {
    const { ApiAction } = this.context;
    const orders = this.props.orders || [];
    const yesterdayOrderInfo = orderUtil.getInfoFromOrdersNotInCart(orders, this.props.cart);
    const createOrder = (isYesterday) => {
      $('#reorder-do-order').prop('disabled', true);
      const options = { paymentStatus: 200 };
      if (isYesterday) {
        options.skipNotification = true;
        options.processedDate = moment().format('YYYY-MM-DD');
      }
      ApiAction.createOrderFromCart()
        .then((order) => ApiAction.startOrderProcessing(order.id, options),
        // .then((order) => ApiAction.startOrderProcessing(order.id, { paymentStatus: 200, skipNotification: true, processedDate: '2015-06-20' }),
          () => {
            window.alert('Failed to Create ReOrder');
            $('#reorder-do-order').prop('disabled', false);
          })
        .then((order) => this.context.router.push(`/mypage/orders/${order.id}`));
    };
    return (
      <div className="mypage-contents-container">
        <ReorderComponent
          {...this.props}
          createOrder={createOrder}
          loadCart={ApiAction.loadCart}
          addCartProductOnReorder={ApiAction.addCartProductOnReorder}
          addCartProducts={ApiAction.addCartProducts}
          updateCartProduct={ApiAction.updateCartProduct}
          deleteCartProduct={ApiAction.deleteCartProduct}
          deleteCartAllProduct={ApiAction.deleteCartAllProduct}
          updateBrandAdjustment={ApiAction.updateBrandAdjustment}
          yesterdayOrderInfo={yesterdayOrderInfo}
        />
      </div>
    );
  },
});

export default connect(
  (state) => ({
    activeProduct: _.get(state, 'reorder.product'),
    brand: _.get(state, 'reorder.brand'),
    cart: state.cart,
    ...loadEntities(state, 'myOrders', 'orders'),
    activeCurrency: _.get(state, 'currency.activeCurrency'),
  }),
  { setReorderBrand, setReorderProduct }
)(Reorder);
