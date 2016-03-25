// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

exports.collectByBrands = (orderProductVariants) => {
  const res = [];
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
    brandProducts[idx].productVariants.push(
      { productVariant: orderProductVariant.productVariant, count: orderProductVariant.orderedCount }
    );
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
