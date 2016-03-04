// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import SellerBox from 'components/CartSellerBox';

export default React.createClass({
  propTypes: {
    order: PropTypes.object.isRequired,
    addressFields: PropTypes.array,
    activeAddress: PropTypes.object,
    addresses: PropTypes.object,
    saveAddress: PropTypes.func,
    setActiveAddress: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  getInitialState() {
    return {};
  },
  render() {
    const { order, addressFields, activeAddress } = this.props;
    const { activeCurrency } = this.context;

    const renderFormField = (obj) => {
      return (
        <div key={obj.key} className="form-box">
          <div className="form-label">{`${obj.text}: `}</div>
          <input type="text"
                 value={_.get(activeAddress, obj.key)}
                 onChange={(e) => { _.set(activeAddress, obj.key, e.target.value ); this.setState({ activeAddress }) } } />
        </div>
      );
    };
    const handleSubmitAddress = (e) => {
      e.preventDefault();
      const activeAddressInState = this.state.activeAddress;
      if (activeAddressInState) {
        this.props.saveAddress(activeAddressInState).then(
          (address) => this.props.setActiveAddress(address.id));
      }
      this.setState({ editMode: false });
    };
    let editMode = !!this.state.editMode;
    if (!activeAddress || !activeAddress.id) {
      editMode = true;
    }
    const renderAddress = () => {
      if (editMode) {
        return (
          <form onSubmit={handleSubmitAddress}>
            {addressFields.map((field) => renderFormField(field))}
            <div className="form-box">
              <div className="form-label"></div>
              <button className="save-button" type="submit">Save and ship to this address</button>
            </div>
          </form>
        );
      }
      return (
        <div className="checkout-address-box selected">
          <div className="field-box">
            <div className="field-label">name</div>
            <div className="field-text">{activeAddress.detail.name}</div>
          </div>
          <div className="field-box">
            <div className="field-label">C.C.</div>
            <div className="field-text">{activeAddress.countryCode}</div>
          </div>
          <div className="field-box">
            <div className="field-label">A.D.</div>
            <div className="field-text">{activeAddress.detail.streetAddress}</div>
          </div>
          <div className="field-box">
            <div className="field-label"></div>
            <div className="field-text">{activeAddress.detail.city}</div>
          </div>
          <div className="edit-box"><a onClick={() => this.setState({ editMode: true })}>Edit</a></div>
        </div>
      );
    };
    // FIXME
    const cartVariants = order.orderProducts.map((orderProduct) => {
      return Object.assign({}, orderProduct.productVariant, { count: orderProduct.orderedCount });
    });
    return (
      <div>
        <div className="checkout-section-title">1. Please fill in your shipping address. </div>
        {renderAddress()}

        <div className="checkout-section-title">2. Review and confirm your order (3 items):</div>
        <SellerBox productVariants={cartVariants} />
        <div className="checkout-place-order">
          <span className="all-total-label">All Total:</span>
          <span className="all-total-value">{activeCurrency} {order['totalEstimation' + activeCurrency]}</span>
          <br/>
          <Link to={`/orders/${order.id}/checkout/payment`}>
            <button className="place-order-button">Place Order</button>
          </Link>
        </div>
      </div>
    );
  },
});