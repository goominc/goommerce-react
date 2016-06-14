// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  render() {
    return (
      <div className="shipping-policy-country">
        <section>
          <div className="title">{i18n.get('mItemDetail.shippingOverseasPrepayTitle')}</div>
          <div className="content">
            <ul className="dashed">
              <li>{i18n.get('mItemDetail.shippingOverseasPrepay1')}</li>
              <li>{i18n.get('mItemDetail.shippingOverseasPrepay2')}</li>
              <li>{i18n.get('mItemDetail.shippingOverseasPrepay3')}</li>
            </ul>
          </div>
        </section>
        <section>
          <div className="title">{i18n.get('mItemDetail.shippingOverseasRealpayTitle')}</div>
          <div className="content">
            {i18n.get('mItemDetail.shippingOverseasRealpay1')}
          </div>
          <div className="shipping-country-title">{i18n.get('mItemDetail.shippingOverseasRealpay2')}</div>
          <div className="shipping-country-detail">{i18n.get('mItemDetail.shippingOverseasRealpay3')}</div>
          <div className="shipping-country-title">{i18n.get('mItemDetail.shippingOverseasRealpay4')}</div>
          <div className="shipping-country-detail">
            {i18n.get('mItemDetail.shippingOverseasRealpay5')}<br />
            {i18n.get('mItemDetail.shippingOverseasRealpay6')}<br />
            {i18n.get('mItemDetail.shippingOverseasRealpay7')}<br />
            {i18n.get('mItemDetail.shippingOverseasRealpay8')}<br />
          </div>
          <div className="shipping-country-title">{i18n.get('mItemDetail.shippingOverseasRealpay9')}</div>
          <div className="shipping-country-detail">
            {i18n.get('mItemDetail.shippingOverseasRealpay10')}<br />
            {i18n.get('mItemDetail.shippingOverseasRealpay11')}<br />
            {i18n.get('mItemDetail.shippingOverseasRealpay12')}<br />
            {i18n.get('mItemDetail.shippingOverseasRealpay13')}<br />
            {i18n.get('mItemDetail.shippingOverseasRealpay14')}<br />
          </div>
          <div className="shipping-country-title">{i18n.get('mItemDetail.shippingOverseasRealpay15')}</div>
          <div className="content-center">
            {i18n.get('mItemDetail.shippingOverseasRealpay16')}<br />
            {i18n.get('mItemDetail.shippingOverseasRealpay17')}
          </div>
        </section>
      </div>
    );
  },
});
