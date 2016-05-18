// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import brandUtil from 'commons/utils/brandUtil';
import numberUtil from 'commons/utils/numberUtil';
import productUtil from 'commons/utils/productUtil';

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
          if (!variant.finalQuantity || variant.quantity === variant.finalQuantity) {
            return (<div className="quantity">{variant.quantity}</div>);
          }
          return (
            <div className="quantity">
              <div className="content">
                <span className="cancel-text">{variant.quantity}</span>
                {variant.finalQuantity}
              </div>
            </div>
          );
        };
        const renderTotal = () => {
          const total = numberUtil.formatPrice(numberUtil.calcProductVariantTotalPrice(variant, variant.quantity, activeCurrency), activeCurrency, currencySign);
          if (!variant.finalQuantity || variant.quantity === variant.finalQuantity) {
            return (<div className="price">{total}</div>);
          }
          const finalTotal = numberUtil.formatPrice(numberUtil.calcProductVariantTotalPrice(variant, variant.finalQuantity, activeCurrency), activeCurrency, currencySign);
          return (
            <div className="price">
              <div className="content">
                <span className="cancel-text">{total}</span>
                {finalTotal}
              </div>
            </div>
          );
        };
        const getStatus = () => {
          let content;
          if (+order.paymentStatus === 200) { // VBank pending
            content = <span style={({ color: '#c94e4e' })}>결제대기</span>;
          } else if (variant.finalQuantity !== 0 && !variant.finalQuantity) {
            return (
              <div className="status-column">
                <div className="status-column-inner">
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
              10: '재입고 예정',
              30: '품절',
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
              <div className="status-column-inner">
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
          <div className="brand">브랜드</div>
          <div className="product-info-title order-product-info-len">상품내용</div>
          <div className="quantity">단가</div>
          <div className="quantity">수량</div>
          <div className="price">가격</div>
          <div className="status-column">상태</div>
        </div>
        {(brands || []).map(renderBrand)}
      </div>
    );
  },
});
