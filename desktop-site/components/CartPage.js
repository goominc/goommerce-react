// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import SellerBox from 'components/CartSellerBox';
import brandUtil from 'commons/utils/brandUtil';
import numberUtil from 'commons/utils/numberUtil';
import orderUtil from 'commons/utils/orderUtil';
import productUtil from 'commons/utils/productUtil';

import ResponsiveImage from 'components/snippet/ResponsiveImage';

export default React.createClass({
  propTypes: {
    buy: PropTypes.func,
    cart: PropTypes.object,
    removeProduct: PropTypes.func,
    updateCount: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { cart, buy, removeProduct, updateCount } = this.props;
    const { activeCurrency, currencySign } = this.context;
    const variants = orderUtil.getProductVariantsFromCart(cart);
    const total = cart.total || {};

    function buyAll() {
      buy(variants);
    }
    function renderBuyAllButton() {
      if (variants.length > 0) {
        return (
          <button className="cart-buyall-button" onClick={buyAll}>Buy All</button>
        );
      }
      return '';
    }

    const renderBrand = (brand) => {
      const renderVariant = (product, variant, index) => {
        const pricePerUnit = +variant.productVariant[activeCurrency];
        const changeQuantity = (quantity) => {
          updateCount(variant.productVariant, quantity);
        };
        return (
          <div key={variant.productVariant.id} className={index === 0 ? 'product-row' : 'variant-row'}>
            <div className="product-info-content">
              <div className="img-box">
                <ResponsiveImage image={_.get(variant.productVariant, 'appImages.default[0]')} width={60} />
              </div>
              <div className="content-wrap">
                <div className="item"><strong>{productUtil.getName(product)}</strong></div>
                <div className="item">{_.get(variant.productVariant, 'data.color')}</div>
                <div className="item">{_.get(variant.productVariant, 'data.size')}</div>
              </div>
            </div>
            <div className="quantity">{numberUtil.format(pricePerUnit)}</div>
            <div className="quantity">
              <div className="input-number-count-box-center">
                <input className="input-number-nospin" min="1" type="number" value={variant.count} onChange={(e) => changeQuantity(e.target.value)} />
                <span>
                  <div className="up" onClick={() => changeQuantity(variant.count + 1)}></div>
                  <div className="down" onClick={() => changeQuantity(variant.count - 1)}></div>
                </span>
              </div>
            </div>
            <div className="price">{numberUtil.format(+variant.count * pricePerUnit)}</div>
            <div className="action-column">
              <img onClick={() => removeProduct(variant.productVariant)}
                src="//s3.ap-northeast-2.amazonaws.com/linkshops/front/resource/main/cart-delete-button.png"
              />
            </div>
          </div>
        );
      };
      return (
        <div className="row">
          <div className="brand"><div className="centered">{brandUtil.getName(brand.brand)}</div></div>
          <div className="product-container">
            {brand.products.map((p) =>
              p.productVariants.map((variant, index) => renderVariant(p.product, variant, index)))}
          </div>
        </div>
      );
    };

    const renderPrice = (price) => {
      if (activeCurrency === 'KRW') {
        return `${numberUtil.format(price)}원`;
      }
      return `${currencySign[activeCurrency]} ${price}`;
    };

    const brands = cart.brands || [];
    return (
      <div className="cart-conatiner">
        <div className="cart-title-box">
          <i className="icon-cart"></i> <span>장바구니</span>
        </div>
        <div className="cart-info-container">
          <div className="title-row">
            <div className="brand">브랜드</div>
            <div className="product-info-title">상품내용</div>
            <div className="quantity">단가</div>
            <div className="quantity">수량</div>
            <div className="price">가격</div>
          </div>
          {brands.map(renderBrand)}
        </div>
        <div className="cart-payment-container">
          <div className="title">결제 정보</div>
          <div className="row">
            <div className="label">상품금액</div>
            <div className="control">{renderPrice(total[activeCurrency])}</div>
          </div>
          <div className="row">
            <div className="label">부가세</div>
            <div className="control">{renderPrice(total[activeCurrency] / 10)}</div>
          </div>
          <div className="row">
            <div className="label">배송비</div>
            <div className="control">0</div>
          </div>
          <div className="total-row">
            <div className="label">결제금액</div>
            <div className="control">{renderPrice(total[activeCurrency])}</div>
          </div>
          <div className="button-order" onClick={buyAll}>
            주문하기
          </div>
        </div>
        {/*
        <div className="cart-top-box">
          <Link to="/products">
            <span className="cart-continue-shopping-arrow"></span>
            <span className="cart-continue-shopping-text">Continue Shopping</span>
          </Link>
        </div>
        {brands.map((brand) => (<SellerBox key={brand.brand.id} {...this.props} brand={brand} canChangeQuantity />))}
        <div className="cart-seller-bottom">
          <div className="cart-total-price-box">
            Total: <b>{activeCurrency} {total[activeCurrency]}</b>
          </div>
          {renderBuyAllButton()}
        </div>
         */}
      </div>
    );
  },
});
