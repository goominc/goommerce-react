// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import i18n from 'commons/utils/i18n';

import productUtil from 'commons/utils/productUtil';
import numberUtil from 'commons/utils/numberUtil';
import { collectByBrands } from 'commons/utils/orderUtil';
import brandUtil from 'commons/utils/brandUtil';

export default React.createClass({
  propTypes: {
    activeCurrency: PropTypes.string.isRequired,
    activeLocale: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
    currencySign: PropTypes.object.isRequired,
  },
  render() {
    const { activeCurrency, activeLocale, order, currencySign } = this.props;
    const brands = collectByBrands(order.orderProducts) || [];
    const renderProducts = () => {
      return brands.map((brand) => {
        const renderProduct = (product) => {
          const renderVariant = (productVariant) => (
            <li className="product-item" key={productVariant.productVariant.id}>
              <div className = "info">
                <div className="pic">
                  <Link to={`/products/${productVariant.productVariant.productId}`}>
                    <img src={_.get(productVariant.productVariant, 'appImages.default[0].url') || ''} />
                  </Link>
                </div>
                <div className="detail">
                  <div className="details-desc-row-one">
                    <Link to={`/products/${productVariant.productVariant.productId}`}>
                      <div className="details-title">
                        {productUtil.getName(product.product)}
                      </div>
                    </Link>
                    <div className="variant-attribute">{_.get(productVariant.productVariant, 'data.color')} /
                                                        {_.get(productVariant.productVariant, 'data.size')}</div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="details-desc-row-two">
                    <div className="unit-price">
                      {numberUtil.formatPrice(productVariant.productVariant[activeCurrency], activeCurrency, currencySign)}
                    </div>
                    {isNaN(productVariant.finalQuantity) || productVariant.quantity === productVariant.finalQuantity ?
                      <div className="quantity">{productVariant.quantity} {i18n.get('word.unit')}</div> :
                      <div>
                        <div className="quantity" style={({ color: '#333' })}>
                          {productVariant.finalQuantity} {i18n.get('word.unit')}
                        </div>
                        <div className="quantity cancel">
                          {productVariant.quantity} {i18n.get('word.unit')}
                        </div>
                      </div>
                    }
                    <div className="total-price">
                      {numberUtil.formatPrice(
                        productVariant[`finalTotal${activeCurrency}`] || productVariant[`total${activeCurrency}`],
                        activeCurrency,
                        currencySign)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
          return product.productVariants.map(renderVariant);
        };
        return (
          <section key={brand.brand.id} className="order-brand">
            <div className="seller">
              {brandUtil.getName(brand.brand)} ({brandUtil.countProducts(brand)})
            </div>
            <ul className="product-items">
              {(brand.products || []).map(renderProduct)}
            </ul>
          </section>
        );
      });
    };
    return (
      <div className="order-product-list">
        {renderProducts()}
      </div>
    );
  },
});
