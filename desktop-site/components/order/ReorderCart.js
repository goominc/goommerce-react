// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import SearchBrandContainer from 'containers/SearchBrandContainer';
import SearchProductContainer from 'containers/SearchProductContainer';

import brandUtil from 'commons/utils/brandUtil';
import stringUtil from 'commons/utils/stringUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    activeProduct: PropTypes.object,
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
    yesterdayOrderInfo: PropTypes.object,
  },
  contextTypes: {
    activeCurrency: PropTypes.string,
    activeLocale: PropTypes.string,
    currencySign: PropTypes.object,
  },
  render() {
    const { cart, createOrder, loadCart, updateCartProduct, deleteCartProduct, setReorderProduct } = this.props;
    const { setReorderBrand, yesterdayOrderInfo, addCartProductOnReorder, addCartProducts } = this.props;
    if (!cart) {
      return (<div></div>);
    }
    const renderYesterdayOrder = () => {
      if (yesterdayOrderInfo && yesterdayOrderInfo.variantCount) {
        const price = _.get(yesterdayOrderInfo, 'totalPrice.KRW');
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
    const { activeLocale, activeCurrency, currencySign } = this.context;

    const { activeProduct } = this.props;
    let activeProductInCart = null;

    const items = [];
    (cart.brands || []).forEach((brand) => {
      const currencies = cart.total ? Object.keys(cart.total) : [];
      brand.total = {};
      currencies.forEach((cur) => {
        brand.total[cur] = 0;
      });
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
            brand.total[cur] += +(_.get(variant, `productVariant.${cur}`)) * +variant.count;
          });
        });
      });
    });
    const fields = [
      { key: 'price', placeholder: i18n.get('word.price'), type: 'number' },
      { key: 'color', placeholder: 'Color', enableEmpty: true },
      { key: 'count', placeholder: i18n.get('word.quantity'), type: 'number' },
      { key: 'size', placeholder: 'Size', defaultValue: 'Free', enableEmpty: true },
    ];
    const resetFields = () => {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        $('.product-variant-add-item input').eq(i).val(field.defaultValue || '');
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
          {currencySign[activeCurrency]} {brand.total[activeCurrency]}
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
      const total = price * quantity;
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
        if (!currentProductName) {
          window.alert('상품 이름을 입력해 주세요');
          return;
        }
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
      if (totalPrice > 0) {
        return (
          <button className="btn default" style={({ marginLeft: '20px' })} onClick={createOrder}>
            ${i18n.get('word.doOrder')}
          </button>
        );
      }
      return null;
    };
    return (
      <div>
        <div className="reorder-title">
          <b>총 주문가격</b> {currencySign[activeCurrency]} {totalPrice}
          {renderOrderButton()}
        </div>
        <div className="reorder-brands-panel">
          {(cart.brands || []).map(renderBrandMenu)}
          <SearchBrandContainer />
        </div>
        <div className="reorder-title"><b>{brandUtil.getNameWithAllBuildingInfo(activeBrand)}</b></div>
        <div className="reorder-products-panel">
          {renderAddProduct()}
          {items.map((item) => renderProduct(item))}
        </div>
      </div>
    );
  },
});
