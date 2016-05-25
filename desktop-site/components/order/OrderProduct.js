// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import brandUtil from 'commons/utils/brandUtil';
import numberUtil from 'commons/utils/numberUtil';
import productUtil from 'commons/utils/productUtil';
import i18n from 'commons/utils/i18n';

import ResponsiveImage from 'components/snippet/ResponsiveImage';

export default React.createClass({
  propTypes: {
    addCart: PropTypes.func,
    brands: PropTypes.array,
    order: PropTypes.object,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { brands, order } = this.props;
    const { activeCurrency, currencySign } = this.context;
    const renderBrand = (brand) => {
      const renderVariant = (product, variant, index) => {
        const pricePerUnit = +variant.productVariant[activeCurrency];
        const renderQuantity = () => {
          if (isNaN(variant.finalQuantity) || variant.quantity === variant.finalQuantity) {
            return (<div className="quantity">{variant.quantity}</div>);
          }
          return (
            <div className="quantity">
              <div className="inner">
                <div className="content">
                  <span className="cancel-text">{variant.quantity}</span><br />
                  {variant.finalQuantity}
                </div>
              </div>
            </div>
          );
        };
        const renderTotal = () => {
          const total = numberUtil.formatPrice(numberUtil.calcProductVariantTotalPrice(variant, variant.quantity, activeCurrency), activeCurrency, currencySign);
          if (isNaN(variant.finalQuantity) || variant.quantity === variant.finalQuantity) {
            return (<div className="price">{total}</div>);
          }
          const finalTotal = numberUtil.formatPrice(numberUtil.calcProductVariantTotalPrice(variant, variant.finalQuantity, activeCurrency), activeCurrency, currencySign);
          return (
            <div className="price">
              <div className="inner">
                <div className="content">
                  <span className="cancel-text">{total}</span><br />
                  {finalTotal}
                </div>
              </div>
            </div>
          );
        };
        const getStatus = () => {
          let content;
          if (+order.paymentStatus === 200) { // VBank pending
            content = <span style={({ color: '#c94e4e' })}>{i18n.get('enum.order.paymentStatus.0')}</span>;
          } else if (isNaN(variant.finalQuantity)) {
            return (
              <div className="status-column">
                <div className="inner">
                  <div className="content">{<span style={({ color: '#67b0ff' })}>출고대기</span>}</div>
                </div>
              </div>
            );
          } else {
            const renderGoCart = () => {
              const onAddCart = () => {
                this.props.addCart(variant.productVariant.id, 1).then(
                  () => window.alert(`${productUtil.getName(variant.product)} 상품이 장바구니에 추가되었습니다`)
                );
              };
              return (
                <div key="order-product-go-cart" className="go-cart" onClick={onAddCart}>장바구니</div>
              );
            };
            const stockReasonText = {
              10: i18n.get('enum.productVariant.status.10'),
              30: i18n.get('enum.productVariant.status.20'),
            };
            const reasonValue = _.get(variant, 'data.stock.reason');
            let reason = '사유없음';
            if (stockReasonText[reasonValue]) {
              reason = stockReasonText[reasonValue];
            }
            content = [(renderGoCart())];
            if (variant.finalQuantity === 0) {
              content.unshift(<div key="order-product-no-product-reason" className="no-product">{reason}</div>);
            } else if (variant.finalQuantity !== variant.quantity) {
              content.unshift(<div key="order-product-no-product" className="no-product">부분취소<br />{`(${reason})`}</div>);
            } else {
              content.unshift(<div key="order-product-ok" className="order-product-ok">출고완료</div>);
            }
          }
          return (
            <div className="status-column">
              <div className="inner">
                <div className="content">
                  {content}
                </div>
              </div>
            </div>
          );
        };
        return (
          <div key={variant.productVariant.id} className={index === 0 ? 'product-row' : 'variant-row'}>
            <div className="product-info-content order-product-info-len">
              <Link to={`/products/${product.id}`} className="img-box">
                <ResponsiveImage image={_.get(variant.productVariant, 'appImages.default[0]')} width={120} />
              </Link>
              <div className="content-wrap">
                <div className="item"><strong>{productUtil.getName(product)}</strong></div>
                <div className="item">{_.get(variant.productVariant, 'data.color')}</div>
                <div className="item">{_.get(variant.productVariant, 'data.size')}</div>
              </div>
            </div>
            <div className="quantity">{numberUtil.formatPrice(pricePerUnit, activeCurrency, currencySign)}</div>
            {renderQuantity()}
            {renderTotal()}
            {getStatus()}
          </div>
        );
      };
      return (
        <div key={brand.brand.id} className="row">
          <div className="brand"><div className="centered">{brandUtil.getName(brand.brand)}</div></div>
          <div className="product-container">
            {(brand.products || []).map((p) =>
              p.productVariants.map((variant, index) => renderVariant(p.product, variant, index)))}
          </div>
        </div>
      );
    };
    return (
      <div className="cart-info-container">
        <div className="title-row">
          <div className="brand">{i18n.get('pcMypage.brands')}</div>
          <div className="product-info-title order-product-info-len">{i18n.get('pcMypage.products')}</div>
          <div className="quantity">{i18n.get('pcMypage.subtotal')}</div>
          <div className="quantity">{i18n.get('pcMypage.quantity')}</div>
          <div className="price">{i18n.get('pcMypage.total')}</div>
          <div className="status-column">상태</div>
        </div>
        {(brands || []).map(renderBrand)}
      </div>
    );
  },
});
