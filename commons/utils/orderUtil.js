// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';
import Decimal from 'decimal.js-light';

import i18n from 'commons/utils/i18n';

import { formatPrice } from 'commons/utils/numberUtil';
import { paymentMethod } from 'commons/utils/inipay';

exports.collectByBrands = (orderProductVariants) => {
  const res = [];
  if (!orderProductVariants) {
    return res;
  }
  orderProductVariants.forEach((orderProductVariant) => {
    const brandId = _.get(orderProductVariant, 'brand.id');
    let idx = -1;
    for (let i = res.length - 1; i >= 0; i--) {
      if (res[i].brand.id === brandId) {
        idx = i;
        break;
      }
    }
    if (idx === -1) {
      idx = res.length;
      res.push(_.assign({}, { brand: orderProductVariant.brand }, { products: [] }));
    }
    const brandProducts = res[idx].products;
    const productId = _.get(orderProductVariant, 'product.id');
    idx = -1;
    for (let i = brandProducts.length - 1; i >= 0; i--) {
      if (brandProducts[i].product.id === productId) {
        idx = i;
        break;
      }
    }
    if (idx === -1) {
      idx = brandProducts.length;
      brandProducts.push(_.assign({}, { product: orderProductVariant.product }, { productVariants: [] }));
    }
    brandProducts[idx].productVariants.push(orderProductVariant);
  });
  return res;
};

exports.getProductVariantsFromCart = (cart) => {
  let res = [];
  if (!cart) {
    return res;
  }
  (cart.brands || []).forEach((brand) => {
    (brand.products || []).forEach((product) => {
      res = res.concat(product.productVariants);
    });
  });
  return res;
};

const getInfoFromOrders = (orders, excludeVariantIdSet) => {
  const orderInfo = {
    brands: new Set(),
    products: new Set(),
    variantCount: 0,
    variantPieces: 0,
    totalPrice: { KRW: 0, USD: 0, CNY: 0 },
    productVariants: [], // 2016. 04. 04. [heekyu] use when addCartProducts
  };
  orders.forEach((order) => {
    (order.orderProducts || []).forEach((orderProduct) => {
      const variantId = _.get(orderProduct, 'productVariant.id');
      if (excludeVariantIdSet.has(variantId)) {
        return;
      }
      // 2016. 04. 04. [heekyu] same variant must be added only once
      excludeVariantIdSet.add(variantId);
      orderInfo.variantCount++;
      orderInfo.variantPieces += orderProduct.quantity;
      const brandId = _.get(orderProduct, 'brand.id');
      const productId = _.get(orderProduct, 'product.id');
      if (brandId) {
        orderInfo.brands.add(brandId);
      }
      if (productId) {
        orderInfo.products.add(productId);
      }
      Object.keys(orderInfo.totalPrice).forEach((currency) => {
        orderInfo.totalPrice[currency] += +orderProduct[`total${currency}`];
      });
      orderInfo.productVariants.push(
        { productVariantId: orderProduct.productVariant.id, count: orderProduct.quantity });
    });
  });
  return orderInfo;
};

exports.getInfoFromOrdersNotInCart = (orders, cart) => {
  const variantIdsInCart = new Set();
  (cart.brands || []).forEach((brand) => {
    (brand.products || []).forEach((product) => {
      (product.productVariants || []).forEach((variant) => {
        variantIdsInCart.add(variant.productVariant.id);
      });
    });
  });
  return getInfoFromOrders(orders, variantIdsInCart);
};

exports.getOrderStatus = (order) => {
  if (+order.paymentStatus === 200) {
    // VBank
    return i18n.get('enum.order.paymentStatus.200');
  }
  return i18n.get(`enum.order.status.${order.status}`);
};

exports.getPaymentMethodType = (order) => {
  const allPaymentMethods = [
    { type: 'VBANK', text: i18n.get('pcPayment.vbank') },
    { type: 'CARD', text: i18n.get('pcPayment.creditCard') },
    { type: 'APAY', text: i18n.get('pcPayment.alipay') },
  ];
  for (let i = 0; i < (order.payments || []).length; i++) {
    const payment = order.payments[i];
    if (payment.type === 0) {
      const {
        payMethod, // web
        paymethod, // global
        P_TYPE, // mobile, mobile_global
      } = payment.data;
      const method = (payMethod || paymethod || P_TYPE || '').toUpperCase();
      for (let j = 0; j < allPaymentMethods.length; j++) {
        if (allPaymentMethods[j].type === method) {
          return allPaymentMethods[j].text;
        }
      }
    }
  }
  return '';
};

exports.formatPriceGap = (order, type, activeCurrency, currencySign) => {
  const sign = (v) => (v < 0 ? '-' : '');
  const getPrice = (type2) => order[`${type2}${activeCurrency}`];
  const finalType = `final${type[0].toUpperCase()}${type.substring(1)}`;
  const gap = new Decimal(getPrice(finalType)).sub(getPrice(type)).toNumber();
  return gap === 0 ? '0' : `${sign(gap)}${formatPrice(Math.abs(gap), activeCurrency, currencySign)}`;
};

exports.formatPriceGapFix = (order, type, activeCurrency, currencySign) => {
  const sign = (v) => (v < 0 ? '-' : '');
  const getPrice = (type2) => order[`${type2}${activeCurrency}`];
  const finalType = `final${type[0].toUpperCase()}${type.substring(1)}`;
  const gap = order.hasOwnProperty(finalType) ? new Decimal(getPrice(finalType)).sub(getPrice(type)).toNumber() : 0;
  return gap === 0 ? '0' : `${sign(gap)}${formatPrice(Math.abs(gap), activeCurrency, currencySign)}`;
};
