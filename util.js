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
