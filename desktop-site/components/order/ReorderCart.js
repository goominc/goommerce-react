// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    brandId: PropTypes.number,
    setBrandId: PropTypes.func,
    cart: PropTypes.object,
    addCartProduct: PropTypes.func,
    updateCartProduct: PropTypes.func,
    deleteCartProduct: PropTypes.func,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
    activeLocale: PropTypes.string,
  },
  render() {
    const { cart, updateCartProduct, setBrandId } = this.props;
    if (!cart) {
      return (<div></div>);
    }
    let brandId = this.props.brandId;
    if (!brandId) {
      brandId = _.get(cart, 'brands[0].brand.id');
    }
    const { activeLocale, activeCurrency } = this.context;

    const items = [];
    (cart.brands || []).forEach((brand) => {
      if (_.get(brand, 'brand.id') !== brandId) {
        return;
      }
      (brand.products || []).forEach((product) => {
        (product.productVariants || []).forEach((variant) => {
          items.push({ product: product.product, productVariant: variant.productVariant, quantity: variant.count });
        });
      });
    });
    const renderBrandMenu = (brand) => {
      const brandId2 = _.get(brand, 'brand.id');
      return (
        <div key={brandId2}
          className={`brand-item ${brandId === brandId2 ? 'active' : ''}`}
          onClick={() => {
            if (brandId2 !== brandId) {
              setBrandId(brandId2);
            }
          }}
        >
          {_.get(brand, `brand.data.name.${activeLocale}`)}
        </div>
      );
    };
    const renderProduct = (product, variant, quantity) => {
      const minusQuantity = () => {
        if (quantity > 1) {
          updateCartProduct(variant.id, quantity - 1);
        }
      };
      const manualChangeQuantity = (e) => {
        const newQuantity = +e.target.value;
        if (newQuantity > 0) {
          updateCartProduct(variant.id, e.target.value);
        } else {
          updateCartProduct(variant.id, 0);
        }
      };
      const price = +(_.get(variant, activeCurrency));
      const total = price * quantity;
      return (
        <div key={variant.id} className="product-item">
          <div className="top-name">{_.get(product, `data.nickname.${activeLocale}`)}</div>
          <div className="top-name">
            <b>{`[${_.get(variant, 'data.color')}]   [${_.get(variant, 'data.size')}]`}</b>
          </div>
          <div className="img-wrap">
            <div className="dummy"></div>
            <img src={_.get(variant, 'appImages.default[0].url')} />
          </div>
          <div className="right-count">
            <div className="count-box">
              <input className="input-number-nospin" type="number"
                value={quantity}
                onChange={manualChangeQuantity}
              />
            <span>
              <div className="up" onClick={() => updateCartProduct(variant.id, +quantity + 1)}></div>
              <div className="down" onClick={minusQuantity}></div>
            </span>
            </div>
          </div>
          <div className="bottom-price">{activeCurrency} {`${total} (${quantity} X ${price})`}</div>
        </div>
      );
    };
    const renderAddProduct = () => {
      const fields = [
        { key: 'name', placeholder: '상품명' },
        { key: 'price', placeholder: '가격' },
        { key: 'color', placeholder: 'Color' },
        { key: 'size', placeholder: 'Size' },
      ];
      const addProduct = () => {
        const product = { brandId };
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          const val = _.get(this.refs, `${field.key}.value`);
          if (!val) {
            window.alert(`${field.placeholder} 을/를 입력해 주세요`);
            return;
          }
          product[field.key] = val;
        }
        this.props.addCartProduct(product);
      };
      return (
        <div className="reorder-add-product">
          <div>새 상품 추가:</div>
          {fields.map((field) =>
            (<input type="text" ref={field.key} key={field.key} placeholder={field.placeholder} />))
          }
          <button className="plus-button" onClick={addProduct}>상품 추가</button>
        </div>
      );
    };
    return (
      <div>
        <div className="reorder-brands-panel">
          {(cart.brands || []).map(renderBrandMenu)}
          <div className="brand-item plus-button">+</div>
        </div>
        <div className="reorder-products-panel">
          {renderAddProduct()}
          {items.map((item) => renderProduct(item.product, item.productVariant, item.quantity))}
        </div>
      </div>
    );
  },
});
