// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

import i18n from 'commons/utils/i18n';

import numberUtil from './numberUtil';

exports.getName = (product) => i18n.get(product.name);
exports.getAllNames = (product) => product.name;

exports.initColorsAndSizes = (variants) => {
  const attributes = { colors: {}, sizes: {} };
  variants.forEach((variant) => {
    if (!variant.appImages || !variant.appImages.default || variant.appImages.default.length < 1) {
      console.log(`${variant.sku} does not have color or size`); // eslint-disable-line no-console
      return;
    }
    attributes.colors[variant.data.color] = { enable: true, selected: false, img: variant.appImages.default[0] };
    attributes.sizes[variant.data.size] = { enable: true, selected: false };
  });
  return { variantAttributes: attributes };
};

const findImage = (product, key) => {
  if (!product || !_.get(product, 'appImages.default[0]')) {
    for (let i = 0; i < (product.productVariants || []).length; i++) {
      const variant = product.productVariants[i];
      const variantImage = findImage(variant, key);
      if (variantImage) {
        return variantImage;
      }
    }
    return null;
  }
  const defaultImages = product.appImages.default;
  for (const image of defaultImages) {
    if (image[key]) {
      return image;
    }
  }
  return defaultImages[0];
};
exports.getProductThumbnail = (product) => {
  const image = findImage(product, 'thumbnail');
  return image ? image.url : null;
};

exports.getProductMainImage = (product) => {
  return findImage(product, 'mainImage');
};

exports.getProductMainPrice = (product, currency) => {
  if (!product.productVariants || product.productVariants.length < 1) {
    // TODO handle error
    return 0;
  }
  // TODO find default price
  const res = product[currency];
  if (currency === 'KRW') {
    return numberUtil.format(res);
  }
  return res;
};
