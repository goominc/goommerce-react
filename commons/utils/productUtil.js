// Copyright (C) 2016 Goom Inc. All rights reserved.

import i18n from 'commons/utils/i18n';

exports.getName = (product) => i18n.get(product.data.nickname);
exports.getAllNames = (product) => product.data.nickname;

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
