// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import AddressEditForm from './AddressEditForm';
import AddressView from './AddressView';
import SellerBox from 'components/CartSellerBox';

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
    const { order, activeAddressId, addresses, isEditMode,
      checkoutNewAddress, setActiveAddressId } = this.props;
    const { activeCurrency } = this.context;

    const renderAddresses = () => {
      if (isEditMode) {
        return (
          <AddressEditForm {...this.props} />
        );
      }
      const renderNewAddressButton = () => (
        <div className="checkout-address-action-line">
          <a onClick={() => checkoutNewAddress()}>Add a New Address</a>
        </div>
      );
      const renderAddress = (address) => (
        <AddressView key={address.id}
          {...this.props}
          address={address}
          isActive={activeAddressId === address.id}
          onClickMe={(address2) => setActiveAddressId(address2.id)}
        />
      );
      const addressIds = Object.keys(addresses);
      for (let i = 0; i < addressIds.length; i++) {
        const addressId = addressIds[i];
        if (addressId.toString() === activeAddressId.toString()) {
          for (let j = i - 1; j >= 0; j--) {
            addressIds[j + 1] = addressIds[j];
          }
          addressIds[0] = addressId;
          break;
        }
      }
      return (
        <div>
          {addressIds.map((addressId) => renderAddress(addresses[addressId]))}
          {renderNewAddressButton()}
        </div>
      );
    };
    // FIXME
    const cartVariants = order.orderProducts.map((orderProduct) =>
      Object.assign({}, orderProduct.productVariant, { count: orderProduct.orderedCount }));
    return (
      <div>
        <div className="checkout-section-title">1. Please fill in your shipping address. </div>
        {renderAddresses()}

        <div className="checkout-section-title">2. Review and confirm your order (3 items):</div>
        <SellerBox productVariants={cartVariants} />
        <div className="checkout-place-order">
          <span className="all-total-label">All Total:</span>
          <span className="all-total-value">{activeCurrency} {order[`totalEstimation${activeCurrency}`]}</span>
          <br />
          <Link to={`/orders/${order.id}/checkout/payment`}>
            <button className="place-order-button">Place Order</button>
          </Link>
        </div>
      </div>
    );
  },
});
