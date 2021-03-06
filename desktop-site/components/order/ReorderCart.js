// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Decimal from 'decimal.js-light';

import SearchBrandContainer from 'containers/SearchBrandContainer';
import SearchProductContainer from 'containers/SearchProductContainer';

import brandUtil from 'commons/utils/brandUtil';
import numberUtil from 'commons/utils/numberUtil';
import stringUtil from 'commons/utils/stringUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    activeProduct: PropTypes.object,
    activeCurrency: PropTypes.string,
    brand: PropTypes.object,
    cart: PropTypes.object,
    createOrder: PropTypes.func,
    setReorderBrand: PropTypes.func,
    setReorderProduct: PropTypes.func,
    loadCart: PropTypes.func, // when refresh
    addCartProductOnReorder: PropTypes.func,
    addCartProducts: PropTypes.func,
    updateCartProduct: PropTypes.func,
    deleteCartProduct: PropTypes.func,
    deleteCartAllProduct: PropTypes.func,
    updateBrandAdjustment: PropTypes.func,
    yesterdayOrderInfo: PropTypes.object,
  },
  contextTypes: {
    // 2016. 04. 26. [heekyu] context Type does not propagate properly
    //                        MyPage does not re-rendered
    // activeCurrency: PropTypes.string,
    activeLocale: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { cart, createOrder, loadCart, updateCartProduct, deleteCartProduct, deleteCartAllProduct, setReorderProduct } = this.props;
    const { activeCurrency, setReorderBrand, yesterdayOrderInfo, addCartProductOnReorder, addCartProducts, updateBrandAdjustment } = this.props;
    if (!cart) {
      return (<div></div>);
    }
    const { activeLocale, currencySign } = this.context;
    const renderYesterdayOrder = () => {
      if (yesterdayOrderInfo && yesterdayOrderInfo.variantCount) {
        const price = numberUtil.formatPrice(_.get(yesterdayOrderInfo, 'totalPrice.KRW'), activeCurrency, currencySign);
        const B = yesterdayOrderInfo.brands.size;
        const V = yesterdayOrderInfo.variantCount;
        return (
          <div>
            <div><b>{`어제 주문 내역에 추가로 ${V}개의 상품이 있습니다. (총 가격 ${price}원, ${B}개의 브랜드)`}</b></div>
            <div style={({ marginBottom: '15px' })}>
              <b>카트에 추가하시겠습니까?</b>
              <button className="btn default" style={({ marginLeft: '15px' })}
                onClick={() => addCartProducts(yesterdayOrderInfo.productVariants)}
              >
                추가
              </button>
            </div>
          </div>
        );
      }
      return null;
    };
    if (!cart.brands || cart.brands.length < 1) {
      return (
        <div className="reorder-brands-panel">
          {renderYesterdayOrder()}
          <SearchBrandContainer />
        </div>
      );
    }
    let activeBrand = this.props.brand;
    if (!activeBrand) {
      activeBrand = _.get(cart, 'brands[0].brand');
    }
    if (!activeBrand) {
      return (<div></div>);
    }
    const brandId = activeBrand.id;

    const { activeProduct } = this.props;
    let activeProductInCart = null;

    const items = [];
    const adjustment = {};
    (cart.brands || []).forEach((brand) => {
      const currencies = cart.total ? Object.keys(cart.total) : [];
      brand.total = {};
      currencies.forEach((cur) => {
        brand.total[cur] = new Decimal(0);
      });
      if (_.get(brand, 'brand.id') === brandId) {
        _.assign(adjustment, brand.adjustment);
      }
      (brand.products || []).forEach((product) => {
        if (_.get(brand, 'brand.id') === brandId) {
          if (activeProduct && activeProduct.id === _.get(product, 'product.id')) {
            activeProductInCart = product;
            items.splice(0, 0, product);
          } else {
            items.push(product);
          }
        }
        (product.productVariants || []).forEach((variant) => {
          currencies.forEach((cur) => {
            const price = new Decimal(_.get(variant, `productVariant.${cur}`, 0));
            const total = price.mul(variant.count || 0).toFixed(cur === 'KRW' ? 0 : 2);
            numberUtil.formatPrice(total, cur, currencySign);
            brand.total[cur] = brand.total[cur].add(total);
          });
        });
      });
      currencies.forEach((cur) => {
        brand.total[cur] = brand.total[cur].add(_.get(brand, `adjustment.${cur}`, 0));
        brand.total[cur] = brand.total[cur].toFixed(cur === 'KRW' ? 0 : 2);
      });
    });
    const fields = [
      { key: 'price', placeholder: i18n.get('word.price'), type: 'number', notRefresh: true },
      { key: 'color', placeholder: 'Color', enableEmpty: true },
      { key: 'count', placeholder: i18n.get('word.quantity'), type: 'number' },
      { key: 'size', placeholder: 'Size', defaultValue: 'Free', enableEmpty: true },
    ];
    const resetFields = () => {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (!field.notRefresh) {
          $('.product-variant-add-item input').eq(i).val(field.defaultValue || '');
        }
      }
    };
    const renderBrandMenu = (brand) => {
      const brandId2 = _.get(brand, 'brand.id');
      return (
        <div key={brandId2}
          className={`brand-item ${brandId === brandId2 ? 'active' : ''}`}
          onClick={() => {
            if (brandId2 !== brandId) {
              resetFields();
              setReorderBrand(brand.brand);
            }
          }}
        >
          {_.get(brand, `brand.name.${activeLocale}`)} <br />
          {numberUtil.formatPrice(brand.total[activeCurrency], activeCurrency, currencySign)}
        </div>
      );
    };
    const renderProductVariant = (variant, quantity, disableDelete) => {
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
      const total = quantity ?
        new Decimal(price).mul(quantity).toFixed(activeCurrency === 'KRW' ? 0 : 2)
        : 0;
      const renderDeleteButton = () => {
        if (!disableDelete) {
          return (
            <div className="delete-button" onClick={() => deleteCartProduct(variant.id)}>X</div>
          );
        }
        return null;
      };
      const maxLength = 7;
      const color = stringUtil.shorten(_.get(variant, 'data.color'), maxLength) || '';
      const size = stringUtil.shorten(_.get(variant, 'data.size'), maxLength) || '';
      return (
        <div key={variant.id} className="product-variant-item">
          <div className="top-name">
            <b>{`[${color}] [${size}]`}</b>
            &nbsp; &nbsp; &nbsp;
            {renderDeleteButton()}
          </div>
          <div className="img-wrap">
            <div className="dummy"></div>
            <img src={_.get(variant, 'appImages.default[0].url')} />
          </div>
          <div className="right-count">
            <div className="count-box">
              <input className="input-number-nospin" type="number"
                min="0"
                onChange={manualChangeQuantity}
                onBlur={onBlurQuantity}
                value={quantity}
              />
              <span>
                <div className="up" onClick={() => updateCartProduct(variant.id, +quantity + 1)}></div>
                <div className="down" onClick={minusQuantity}></div>
              </span>
            </div>
          </div>
          <div className="bottom-price">{`${numberUtil.formatPrice(total, activeCurrency, currencySign)} (${quantity} X ${numberUtil.formatPrice(price, activeCurrency, currencySign)})`}</div>
        </div>
      );
    };
    const renderProduct = (product) => {
      const titleStyle = {
        display: 'block',
        fontSize: '16px',
        fontWeight: '400',
      };
      return (
        <div key={_.get(product, 'product.id')} className="product-item">
          <div className="top-name" style={titleStyle}>{_.get(product.product, `name.${activeLocale}`)}</div>
          {product.productVariants.map(
            (variant) => renderProductVariant(variant.productVariant, variant.count, variant.disableDelete)
          )}
        </div>
      );
    };
    const renderAddProduct = () => {
      const addProduct = () => {
        const product = { brandId };
        const currentProductName = $('.product-search-box input').val();
        product.name = currentProductName;
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          const val = _.get(this.refs, `${field.key}.value`);
          if (!val && !field.enableEmpty) {
            window.alert(`${field.placeholder} 을/를 입력해 주세요`);
            return;
          }
          product[field.key] = val;
          if (field.type === 'number') {
            product[field.key] = +product[field.key];
          }
        }
        if (!product.color) {
          product.color = 'None';
        }
        addCartProductOnReorder(product);
        setReorderProduct(null);
        resetFields();
      };
      const renderActiveProduct = () => {
        if (activeProduct) {
          const convertedProduct = {
            product: activeProduct,
            productVariants: activeProduct.productVariants.map(
              (variant) => ({ count: 0, productVariant: variant, disableDelete: true })),
          };
          if (activeProductInCart) {
            activeProductInCart.productVariants.forEach((v1) => {
              convertedProduct.productVariants.forEach((v2) => {
                if (_.get(v1, 'productVariant.id') === _.get(v2, 'productVariant.id')) {
                  v2.count = v1.count;
                  v2.disableDelete = false;
                }
              });
            });
          }
          return (
            <div className="reorder-products-panel" style={({ marginTop: '-1px' })}>
              {renderProduct(convertedProduct)}
            </div>
          );
        }
        return null;
      };
      const renderActiveProductReset = () => {
        const onClick = () => {
          resetFields();
          setReorderProduct(null);
        };
        if (activeProduct) {
          return (<button className="btn default" onClick={onClick}>초기화</button>);
        }
        return null;
      };
      return (
        <div className="reorder-add-product">
          <div>새 상품 추가</div>
          <SearchProductContainer />
          {renderActiveProductReset()}
          <div className="product-variant-add-box">
            {renderActiveProduct()}
            <div className="product-variant-add-item">
              {fields.map((field) =>
                (<input className={field.type === 'number' ? 'input-number-nospin' : ''}
                  type={field.type || 'text'}
                  ref={field.key}
                  key={field.key}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                />)
              )}
              {<button className="plus-button" onClick={addProduct}>{`${i18n.get('word.product')} ${i18n.get('word.add')}`}</button>}
            </div>
          </div>
        </div>
      );
    };
    const totalPrice = cart.total ? cart.total[activeCurrency] : 0;
    const renderOrderButton = () => {
      return [
        <button
          key="reorder-do-order"
          id="reorder-do-order"
          className="btn default"
          style={({ marginLeft: '20px' })}
          onClick={() => createOrder(this.refs.yesterday.checked)}
        >
          {i18n.get('word.doOrder')}
        </button>,
        <button key="reorder-clear-cart" className="btn default" style={({ marginLeft: '20px' })} onClick={deleteCartAllProduct}>
          카트 전체 삭제
        </button>,
      ];
    };
    const renderAdjustment = () => {
      const onSave = () => {
        updateBrandAdjustment(brandId, this.refs.adjustment.value);
      };
      return (
        <div className="reorder-add-product">
          <div>가격 조정</div>
          <input
            className="input-number-nospin"
            type="number"
            placeholder="가격 조정"
            defaultValue={adjustment.KRW}
            ref="adjustment"
            key={brandId}
          />
          <span>원</span>
          <button className="plus-button" onClick={onSave}>Save</button>
        </div>
      );
    };
    return (
      <div>
        <div style={({ marginBottom: '10px' })}>
          <input id="yesterday" type="checkbox" className="default-checkbox" ref="yesterday" />
          <label onClick={() => $('#yesterday').click()}></label>
          <span style={({ marginLeft: '10px' })}>어제 주문</span>
        </div>
        {/*<div>
          <input id="no_noti" type="checkbox" className="default-checkbox" ref="no_noti" defaultValue={true} />
          <label onClick={() => $('#no_noti').click()}></label>
          <span style={({ marginLeft: '10px' })}>셀러앱 노티</span>
        </div>*/}
        <div className="reorder-title">
          <b>총 주문가격</b> {numberUtil.formatPrice(totalPrice, activeCurrency, currencySign)}
          {renderOrderButton()}
        </div>
        <div className="reorder-brands-panel">
          {(cart.brands || []).map(renderBrandMenu)}
          <SearchBrandContainer />
        </div>
        <div className="reorder-title"><b>{brandUtil.getNameWithAllBuildingInfo(activeBrand)}</b></div>
        <div className="reorder-products-panel">
          {renderAdjustment()}
          {renderAddProduct()}
          {items.map((item) => renderProduct(item))}
        </div>
      </div>
    );
  },
});
