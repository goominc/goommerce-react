export function getProductThumbnail(product) {
  if (!product) return undefined;
  const defaultImages = product.appImages.default;
  for (const image of defaultImages) {
    if (image.thumbnail) return image;
  }
  return defaultImages[0];
}

export function getProductMainImage(product) {
  if (!product) return undefined;
  const defaultImages = product.appImages.default;
  for (const image of defaultImages) {
    if (image.mainImage) return image;
  }
  return defaultImages[0];
}

export function getProductMainPrice(product, currency) {
  if (!product.productVariants || product.productVariants.length < 1) {
    // TODO handle error
    return 0;
  }
  // TODO find default price
  return product.productVariants[0].price[currency];
}
