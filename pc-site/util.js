function getImages(product) {
  if (!product || !product.appImages) {
    return [];
  }
  return product.appImages.default || [];
}
export function getProductThumbnail(product) {
  const defaultImages = getImages(product);
  if (defaultImages.length < 1) {
    return undefined;
  }
  for (const image of defaultImages) {
    if (image.thumbnail) return image;
  }
  return defaultImages[0];
}

export function getProductMainImage(product) {
  const defaultImages = getImages(product);
  if (defaultImages.length < 1) {
    return undefined;
  }
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
