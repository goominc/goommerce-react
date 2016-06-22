import React, { PropTypes } from 'react';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  render() {
    const { order } = this.props;
    return (
      <div className="myorder-box">
        <div className="box-header">
          {i18n.get('pcMypage.shipTo')}
        </div>
        <div className="box-detail">
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcMypage.fullName')}</span>
            <span className="info">{order.address.detail.name}</span>
          </div>
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcMypage.phoneNumber')}</span>
            <span className="info">{order.address.detail.tel}</span>
          </div>
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcMypage.zipCode')}</span>
            <span className="info">{order.address.detail.postalCode}</span>
          </div>
          <div className="order-price-black">
            <span className="checkout-item">{i18n.get('pcMypage.address')}</span>
            <span className="info">{order.address.detail.address.base} {order.address.detail.address.detail}</span>
          </div>
        </div>
      </div>
    );
  },
});