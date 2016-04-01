// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MyPageLeftbar from 'components/mypage/MyPageLeftbar';
import ReorderComponent from 'components/order/ReorderComponent';
import { setReorderBrand } from 'redux/actions';

const Reorder = React.createClass({
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  /*
  componentDidMount() {
    const product = {
      brandId: 2038,
      name: 'heekyu',
      price: 121912121232,
      color: 'Red',
      size: 'XL',
    };
    this.context.ApiAction.createMerchandiseProductAndAddToCart(product);
  },
  */
  render() {
    const { ApiAction } = this.context;
    const addCartProduct = (product) => {
      ApiAction.addCartProductOnReorder(product);
    };
    return (
      <div className="mypage-contents-container">
        <MyPageLeftbar />
        <ReorderComponent
          {...this.props}
          loadCart={ApiAction.loadCart}
          addCartProduct={addCartProduct}
          updateCartProduct={ApiAction.updateCartProduct}
          deleteCartProduct={ApiAction.deleteCartProduct}
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
  }),
  { setReorderBrand }
)(Reorder);
