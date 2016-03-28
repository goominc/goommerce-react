// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MyPageLeftbar from 'components/mypage/MyPageLeftbar';
import ReorderComponent from 'components/order/ReorderComponent';
import { setReorderBrandId } from 'redux/actions';

const Reorder = React.createClass({
  propTypes: {
    brandId: PropTypes.number,
    cart: PropTypes.object,
    setReorderBrandId: PropTypes.func,
  },
  contextTypes: {
    ApiAction: PropTypes.object,
  },
  /*
  componentDidMount() {
    const product = {
      brand: { id: 29 },
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
    const { cart, brandId, setReorderBrandId } = this.props; // no-shadow
    const createMerchandiseProduct = (product) => ApiAction.createMerchandiseProductAndAddToCart(product);
    return (
      <div className="mypage-contents-container">
        <MyPageLeftbar />
        <ReorderComponent
          cart={cart}
          brandId={brandId}
          createMerchandiseProduct={createMerchandiseProduct}
          setBrandId={setReorderBrandId}
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
    brandId: _.get(state, 'reorder.brandId'),
  }),
  { setReorderBrandId }
)(Reorder);
