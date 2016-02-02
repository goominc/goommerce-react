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
    if (image.thumbnail) return image.url;
  }
  return defaultImages[0].url;
}

export function getProductMainImage(product) {
  const defaultImages = getImages(product);
  if (defaultImages.length < 1) {
    return undefined;
  }
  for (const image of defaultImages) {
    if (image.mainImage) return image.url;
  }
  return defaultImages[0].url;
}

export function getProductMainPrice(product, currency) {
  if (!product.productVariants || product.productVariants.length < 1) {
    // TODO handle error
    return 0;
  }
  // TODO find default price
  return product.productVariants[0].price[currency];
}
