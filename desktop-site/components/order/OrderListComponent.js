// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

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
        `${representitiveBrandName} 외 ${brands.size - 1}개 브랜드의` :
        `${representitiveBrandName}의`;
      return `${displayBrand} ${quantities}개 상품 구매내역`;
    };
    const renderOrder = (order) => (
      <div key={order.id}>
        <div className="row">
          <div className="cell date-cell">{numberUtil.formatDate(order.createdAt, true)}</div>
          <div className="cell summary-cell"><Link to={`/orders/${order.id}`}>{getSummary(order)}</Link></div>
          <div className="cell quantity-cell">수량</div>
          <div className="cell price-cell">{numberUtil.formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign)}</div>
          <div className="cell status-cell">{i18n.get(`enum.order.status.${order.status}`)}</div>
        </div>
      </div>
        /*
      <div key={order.id} className="order-box">
        <div className="order-head">
          <span>Order Id: {order.id} </span> <Link to={`/orders/${order.id}`} >View Detail</Link> <br />
          <span>Total Price: KWR {order.totalKRW}</span> <br />
          <span>Order Date: {formatDate(order.createdAt)}</span> <br />
          <span>Seller: Mola</span>
        </div>
        <div className="order-product-box">
          {(order.orderProducts || []).map(renderOrderProduct)}
        </div>
        <div className="order-action-box">
          Status: {i18n.get(`enum.order.status.${order.status}`)}
        </div>
      </div>
      */
    );

    return (
      <div className="order-list-container">
        <div className="title-row">
          <div className="cell date-cell">주문날짜</div>
          <div className="cell summary-cell">주문내용</div>
          <div className="cell quantity-cell">수량</div>
          <div className="cell price-cell">결제금액</div>
          <div className="cell status-cell">주문상태</div>
        </div>
        {orders.map(renderOrder)}
      </div>
    );
  },
});
