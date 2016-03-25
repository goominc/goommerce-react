// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import brandUtil from 'commons/utils/brandUtil';
import { getProductThumbnail } from 'util';

export default React.createClass({
  propTypes: {
    buy: PropTypes.func,
    canChangeQuantity: PropTypes.bool,
    children: PropTypes.object,
    brand: PropTypes.object,
    removeProduct: PropTypes.func,
    updateCount: PropTypes.func,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  renderVariant(variant, quantity) {
    const { buy, canChangeQuantity, updateCount, removeProduct } = this.props;
    const { activeCurrency } = this.context;
    function handleQuantity(event) {
      return updateCount(variant, event.target.value);
    }
    function handleRemove() {
      removeProduct(variant);
    }
    function handleBuy() {
      buy(variant);
    }
    function renderBuyButton() {
      const buttonCells = [];
      if (removeProduct) {
        buttonCells.push(<td key="removeProduct"><button onClick={handleRemove}>Remove</button></td>);
      }
      if (buy) {
        buttonCells.push(<td key="buyProduct"><button onClick={handleBuy}>Buy</button></td>);
      }
      return buttonCells;
    }
    const renderQuantity = () => {
      if (canChangeQuantity) {
        return (
          <input type="number" name="quantity" min="1" max="100" onChange={handleQuantity}
            defaultValue={quantity}
          />
        );
      }
      return (<span>{quantity}</span>);
    };
    return (
      <tr key={`cart-variant-${variant.id}`}>
        <td><Link to={`/products/${variant.productId}`}>
          <img src={getProductThumbnail(variant)} />
          <span className="product-description">{variant.sku}</span>
        </Link></td>
        <td>{renderQuantity(variant)}</td>
        <td>{activeCurrency} {variant[activeCurrency]}</td>
        {renderBuyButton()}
      </tr>
    );
  },
  render() {
    const { brand, removeProduct, buy, children } = this.props;
    if (!brand) {
      return (
        <div></div>
      );
    }

    const variants = [];
    // 2016. 03. 24. [heekyu] TODO collect by product
    (brand.products || []).forEach((product) => {
      (product.productVariants || []).forEach((variant) => variants.push(variant));
    });

    function renderHead() {
      const renderBuyCell = () => {
        const buttonCells = [];
        if (removeProduct) {
          buttonCells.push(<td key="removeProduct" width="10%"></td>);
        }
        if (buy) {
          buttonCells.push(<td key="buyProduct" width="10%"></td>);
        }
        return buttonCells;
      };
      return (
        <tr>
          <td width="50%">Product Detail</td>
          <td width="15%">Quantity</td>
          <td width="15%">Price</td>
          {renderBuyCell()}
        </tr>
      );
    }
    return (
      <div className="cart-seller-box">
        <div className="cart-seller-title">Brand: {brandUtil.getName(brand.brand)}</div>
        <table>
          <thead>
          {renderHead()}
          </thead>
          <tbody>
          {variants.map((variant) => this.renderVariant(variant.productVariant, variant.count))}
          </tbody>
        </table>
        {children}
      </div>
    );
  },
});
