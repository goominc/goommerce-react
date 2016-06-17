// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import OrderListItemImages from './OrderListItemImages';
import PrintOrderReceiptButton from 'components/snippet/PrintOrderReceiptButton';

import { getProductThumbnail } from 'commons/utils/productUtil';
import numberUtil from 'commons/utils/numberUtil';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    orders: PropTypes.array.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { orders } = this.props;
    const { activeLocale, activeCurrency, currencySign } = this.context;

    const renderOrderProduct = (product) => {
      const variant = product.productVariant;
      const thumbnail = getProductThumbnail(variant) || getProductThumbnail(product.product);
      return (
        <div key={product.id} className="order-product-item">
          <div className="thumbnail-box"><img src={thumbnail} /></div>
          <div className="content-box">
            {variant.sku} <br />
            Price / piece : {product.KRW} <br />
            Count: {product.quantity} <br />
            Total Price : {product.totalKRW} <br />
          </div>
        </div>
      );
    };
    const getSummary = (order) => {
      const brands = new Set();
      let representitiveBrandName = '';
      let quantities = 0;
      for (let i = 0; i < order.orderProducts.length; i++) {
        const variant = order.orderProducts[i];
        const brandId = _.get(variant, 'brand.id');
        if (brandId) {
          if (!representitiveBrandName) {
            representitiveBrandName = _.get(variant, `brand.name.${activeLocale}`);
          }
          brands.add(brandId);
        }
        quantities += +(variant.quantity || 0);
      }
      const displayBrand = brands.size > 1 ?
        `${representitiveBrandName} ${i18n.get('pcMypage.orderListSubjectAnd')} ${brands.size - 1}${i18n.get('pcMypage.orderListSubjectBrand')}` :
        `${representitiveBrandName}${i18n.get('pcMypage.orderListSubjectOf')}`;
      return `${displayBrand} ${quantities}${i18n.get('pcMypage.orderListSubjectProduct')}`;
    };
    const renderOrder = (order) => {
      const quantity = _.reduce(order.orderProducts, (sum, o) => (sum + o.quantity), 0);
      const status = order.status === 0 ?
        i18n.get(`enum.order.paymentStatus.${order.paymentStatus}`) :
        i18n.get(`enum.order.status.${order.status}`);
      const renderSummary = () => {
        return (
          <div className="cell summary-content">
            <Link to={`/mypage/orders/${order.id}`}><div className="text">{getSummary(order)}</div></Link>
            <OrderListItemImages order={order} />
          </div>
        );
      };
      const totalPrice = numberUtil.formatPrice(order[`finalTotal${activeCurrency}`] || order[`total${activeCurrency}`], activeCurrency, currencySign);
      return (
        <div key={order.id}>
          <div className="row">
            <div className="cell date-cell">
              <div className="inner">
                <Link to={`/mypage/orders/${order.id}`} className="content">
                  {numberUtil.formatDate(order.createdAt, true)}<br />
                  <span>{order.id}</span>
                </Link>
              </div>
            </div>

            {renderSummary()}
            {/*
            <div className="cell summary-cell"><Link to={`/orders/${order.id}`}>{getSummary(order)}</Link></div>
            <div className="cell quantity-cell">{quantity}</div>
            <div className="cell price-cell">{numberUtil.formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign)}</div>
             */}
            <div className="cell status-content">
              <div className="inner">
                <div className="content">
                  <div className="text">{status}</div>
                  <div className="price">{totalPrice}</div>
                  <div className="print-receipt">
                    <PrintOrderReceiptButton order={order} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="order-list-container">
        <div className="title-row">
          <div className="cell date-cell">{i18n.get('pcMypage.orderDate')}</div>
          <div className="cell summary-title">{i18n.get('pcMypage.orderProducts')}</div>
          <div className="cell status-title">{i18n.get('pcMypage.orderStatus')}</div>
        </div>
        {orders.map(renderOrder)}
      </div>
    );
  },
});
