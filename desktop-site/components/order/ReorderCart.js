// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import SearchBrandContainer from 'containers/SearchBrandContainer';
import SearchProductContainer from 'containers/SearchProductContainer';
import brandUtil from 'commons/utils/brandUtil';

export default React.createClass({
  propTypes: {
    brand: PropTypes.object,
    activeProduct: PropTypes.object,
    setReorderBrand: PropTypes.func,
    cart: PropTypes.object,
    loadCart: PropTypes.func, // when refresh
    addCartProduct: PropTypes.func,
    updateCartProduct: PropTypes.func,
    deleteCartProduct: PropTypes.func,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
    activeLocale: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { cart, loadCart, updateCartProduct, setReorderBrand } = this.props;
    if (!cart) {
      return (<div></div>);
    }
    let activeBrand = this.props.brand;
    if (!activeBrand) {
      activeBrand = _.get(cart, 'brands[0].brand');
    }
    if (!activeBrand) {
      return (<div></div>);
    }
    const brandId = activeBrand.id;
    const { activeLocale, activeCurrency, currencySign } = this.context;

    const { activeProduct } = this.props;

    const items = [];
    (cart.brands || []).forEach((brand) => {
      const currencies = cart.total ? Object.keys(cart.total) : [];
      brand.total = {};
      currencies.forEach((cur) => {
        brand.total[cur] = 0;
      });
      (brand.products || []).forEach((product) => {
        if (_.get(brand, 'brand.id') === brandId) {
          items.push(product);
        }
        (product.productVariants || []).forEach((variant) => {
          currencies.forEach((cur) => {
            brand.total[cur] += +(_.get(variant, `productVariant.${cur}`)) * +variant.count;
          });
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
              setReorderBrand(brand.brand);
            }
          }}
        >
          {_.get(brand, `brand.data.name.${activeLocale}`)} <br />
          {currencySign[activeCurrency]} {brand.total[activeCurrency]}
        </div>
      );
    };
    const renderProductVariant = (variant, quantity) => {
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
      const onBlurQuantity = (e) => {
        if (!e.target.value) {
          loadCart();
        }
      };
      const price = +(_.get(variant, activeCurrency));
      const total = price * quantity;
      return (
        <div key={variant.id} className="product-variant-item">
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
                onBlur={onBlurQuantity}
              />
            <span>
              <div className="up" onClick={() => updateCartProduct(variant.id, +quantity + 1)}></div>
              <div className="down" onClick={minusQuantity}></div>
            </span>
            </div>
          </div>
          <div className="bottom-price">{currencySign[activeCurrency]} {`${total} (${quantity} X ${price})`}</div>
        </div>
      );
    };
    const renderProduct = (product) => {
      const variantWidth = 148;
      const titleStyle = {
        display: 'block',
        fontSize: '16px',
        fontWeight: '400',
        width: `${variantWidth * product.productVariants.length}px`,
      };
      return (
        <div key={_.get(product, 'product.id')} className="product-item">
          <div className="top-name" style={titleStyle}>{_.get(product.product, `data.nickname.${activeLocale}`)}</div>
          {product.productVariants.map(
            (variant) => renderProductVariant(variant.productVariant, variant.count)
          )}
        </div>
      );
    };
    const renderAddProduct = () => {
      const fields = [
        { key: 'name', placeholder: '상품명' },
        { key: 'price', placeholder: '가격' },
        { key: 'color', placeholder: 'Color' },
        { key: 'size', placeholder: 'Size' },
        { key: 'count', placeholder: '개수' },
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
          {/* fields.map((field) =>
            (<input type="text" ref={field.key} key={field.key} placeholder={field.placeholder} />))*/
          }
          <SearchProductContainer />
          { /* <button className="plus-button" onClick={addProduct}>상품 추가</button> */ }
        </div>
      );
    };
    return (
      <div>
        <div className="reorder-title">
          <b>총 주문가격:</b> {currencySign[activeCurrency]} {cart.total ? cart.total[activeCurrency] : 0}
        </div>
        <div className="reorder-brands-panel">
          {(cart.brands || []).map(renderBrandMenu)}
          <SearchBrandContainer />
        </div>
        <div className="reorder-title"><b>{brandUtil.getName(activeBrand)}</b></div>
        <div className="reorder-products-panel">
          {renderAddProduct()}
          {items.map((item) => renderProduct(item))}
        </div>
      </div>
    );
  },
});
