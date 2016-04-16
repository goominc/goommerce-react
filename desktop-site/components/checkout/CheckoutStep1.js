// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import AddressEditForm from './AddressEditForm';
import AddressView from './AddressView';
import CartProduct from 'components/CartProduct';
import orderUtil from 'commons/utils/orderUtil';

export default React.createClass({
  propTypes: {
    order: PropTypes.object.isRequired,
    addressFields: PropTypes.array,
    activeAddressId: PropTypes.number,
    addresses: PropTypes.object,
    isEditMode: PropTypes.bool,
    checkoutNewAddress: PropTypes.func,
    saveAddress: PropTypes.func,
    setActiveAddressId: PropTypes.func,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
  },
  render() {
    const { order } = this.props;
    const { activeCurrency } = this.context;

/*
    const cartVariants = order.orderProducts.map((orderProduct) =>
      Object.assign({}, orderProduct.productVariant, { count: orderProduct.quantity }));
      */
    const brands = orderUtil.collectByBrands(order.orderProducts);
    return (
      <div>
        <div className="checkout-section-title">1. Please fill in your shipping address. </div>

        <div className="checkout-section-title">2. Review and confirm your order ({order.orderProducts.length} items):</div>
        <CartProduct brands={brands} />
        <div className="checkout-place-order">
          <span className="all-total-label">All Total:</span>
          <span className="all-total-value">{activeCurrency} {order[`total${activeCurrency}`]}</span>
          <br />
          <Link to={`/orders/${order.id}/checkout/payment`}>
            <button className="place-order-button">Place Order</button>
          </Link>
        </div>
      </div>
    );
  },
});
