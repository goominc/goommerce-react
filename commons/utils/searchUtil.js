// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

exports.getSearchItems = (searchResult, fnGetText) => {
  const res = [];
  if (!searchResult) {
    return res;
  }
  const maxResultCount = 10;
  const count = Math.min((searchResult || []).length, maxResultCount);
  for (let i = 0; i < count; i++) {
    const item = searchResult[i];
    res.push({ text: fnGetText(item), item });
  }
  return res;
};

exports.getProductsFromMerchandise = (brandId, merchandise, q) => {
  const res = [];
  (Object.keys(merchandise.products) || []).forEach((productId) => {
    const product = merchandise.products[productId];
    if (_.get(product, 'brand.id') !== brandId) {
      return;
    }
    const name = _.get(product, 'name.ko');
    if (!q || name.indexOf(q) >= 0) {
      res.push(_.assign({}, product, { productVariants: [] }));
    }
  });
  res.forEach((product) => {
    (Object.keys(merchandise.productVariants) || []).forEach((variantId) => {
      const variant = merchandise.productVariants[variantId];
      if (product.id === variant.productId) {
        product.productVariants.push(variant);
      }
    });
  });
  return res;
};
