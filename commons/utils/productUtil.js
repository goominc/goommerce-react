// Copyright (C) 2016 Goom Inc. All rights reserved.

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

function getImages(product) {
  if (!product || !product.appImages) {
    return [];
  }
  return product.appImages.default || [];
}
exports.getProductThumbnail = (product) => {
  const defaultImages = getImages(product);
  if (defaultImages.length < 1) {
    return undefined;
  }
  for (const image of defaultImages) {
    if (image.thumbnail) {
      return image.url;
    }
  }
  return defaultImages[0].url;
};

exports.getProductMainImage = (product) => {
  const defaultImages = getImages(product);
  if (defaultImages.length < 1) {
    return undefined;
  }
  for (const image of defaultImages) {
    if (image.mainImage) {
      return image;
    }
  }
  return defaultImages[0];
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
