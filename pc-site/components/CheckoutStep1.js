// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import SellerBox from './CartSellerBox';

export default React.createClass({
  propTypes: {
    order: PropTypes.object.isRequired,
    addressFields: PropTypes.array,
    activeAddress: PropTypes.object,
    addresses: PropTypes.object,
    saveAddress: PropTypes.func,
    setCheckoutStep: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  getInitialState() {
    return {};
  },
  render() {
    const { order, addressFields, activeAddress, setCheckoutStep } = this.props;
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
      let activeAddressInState = this.state.activeAddress;
      if (!activeAddressInState) {
        // Did not changed
        return;
      }
      this.props.saveAddress(activeAddressInState);
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
            <button type="submit">저장하고 사용하기</button>
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
          <div className="edit-box"><a href="javascript:;" onClick={() => this.setState({ editMode: true })}>Edit</a></div>
        </div>
      );
    };
    const cartVariants = order.orderProducts.map((orderProduct) => {
      return _.assign({}, orderProduct.productVariant, { count: orderProduct.orderedCount });
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
          <button className="place-order-button" onClick={() => setCheckoutStep(2)}>Place Order</button>
        </div>
      </div>
    );
  },
});
