// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

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
  },
  render() {
    const { ApiAction } = this.context;
    const orders = this.props.orders || [];
    const yesterdayOrderInfo = orderUtil.getInfoFromOrdersNotInCart(orders, this.props.cart);
    const createOrder = () => {
      ApiAction.createOrderFromCart().then((order) => this.context.router.push(`/orders/${order.id}`));
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
          yesterdayOrderInfo={yesterdayOrderInfo}
        />
      </div>
    );
  },
});

export default connect(
  (state) => ({
    cart: state.cart,
    brand: _.get(state, 'reorder.brand'),
    activeProduct: _.get(state, 'reorder.product'),
    ...loadEntities(state, 'myOrders', 'orders'),
  }),
  { setReorderBrand, setReorderProduct }
)(Reorder);
