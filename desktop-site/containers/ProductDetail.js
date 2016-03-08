import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as _ from 'lodash';

import ProductDetailPage from 'components/ProductDetailPage';
import { getProductMainImage } from 'util';

import { selectColor, selectSize, setActiveImage, wrapLogin, addCartAndPopup, addWishAndPopup } from 'redux/actions';

const ProductDetail = React.createClass({
  propTypes: {
    activeImage: PropTypes.object,
    addCartAndPopup: PropTypes.func,
    addWishAndPopup: PropTypes.func,
    product: PropTypes.object,
    productId: PropTypes.string.isRequired,
    favoriteBrands: PropTypes.array,
    setActiveImage: PropTypes.func,
    selectColor: PropTypes.func,
    selectSize: PropTypes.func,
    wrapLogin: PropTypes.func,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
    ApiAction: PropTypes.object,
  },
  componentDidMount() {
    this.props.setActiveImage({ url: '' });
    const parseVariants = (product) => {
      const extractDataFromVariant = (variant) => {
        const splits = variant.sku.split('-');
        if (splits.length === 3) {
          return {
            color: splits[1],
            size: splits[2],
          };
        }
        return {};
      };
      const variants = [];
      for (let i = 0; i < product.productVariants.length; i++) {
        const variant = product.productVariants[i];
        if (!variant.data.color) {
          const data = extractDataFromVariant(variant);
          if (!data.color) {
            window.alert(`[DATA ERROR] cannot detect color from variant (${variant.sku})`); // eslint-disable-line no-alert, max-len
            continue;
          }
          variant.data.color = data.color;
          variant.data.size = data.size;
        }
        variants.push(variant);
      }
      return variants;
    };
    const afterLoadProduct = (product, dispatch) => {
      dispatch({
        type: 'PRODUCT_DETAIL_VARIANTS',
        variants: parseVariants(product),
      });
    };
    this.context.ApiAction.loadProductAndThen(this.props.productId, afterLoadProduct);
  },
  componentDidUnMount() {
    this.props.setActiveImage({ url: '' });
  },
  buildImages() {
    const { product } = this.props;
    const images = [];
    const imageUrlSet = new Set();
    const objToImages = (obj) => {
      if (obj.appImages && obj.appImages.default && obj.appImages.default.length > 0) {
        for (let i = 0; i < obj.appImages.default.length; i++) {
          const image = obj.appImages.default[i];
          if (imageUrlSet.has(image.url)) {
            continue;
          }
          imageUrlSet.add(image.url);
          images.push(image);
        }
      }
    };
    objToImages(product);
    if (product.productVariants) {
      for (let i = 0; i < product.productVariants.length; i++) {
        objToImages(product.productVariants[i]);
      }
    }
    return images;
  },
  render() {
    const { activeImage, product, favoriteBrands, selectColor, selectSize, wrapLogin, addCartAndPopup, addWishAndPopup } = this.props; // eslint-disable-line no-shadow
    const { addFavoriteBrand, createOrder } = this.context.ApiAction;
    if (!product) {
      return (<div></div>);
    }
    const images = this.buildImages();
    let passImage = activeImage;
    if (images.length > 0 && (!activeImage || !activeImage.url)) {
      passImage = getProductMainImage(product.topHit || product);
    }
    const attributes = [
      { attrName: 'Color', key: 'colors', select: selectColor },
      { attrName: 'Size', key: 'sizes', select: selectSize },
    ];
    const wrapBuyNow = (variantId, quantity) => {
      wrapLogin(() => {
        createOrder({ productVariants: [{ id: variantId, count: quantity }] }).then((order) => {
          this.context.router.push(`/orders/${order.id}/checkout`);
        });
      });
    };
    const wrapAddToCart = (...args) => {
      wrapLogin(() => {
        addCartAndPopup(...args);
      });
    };
    const wrapAddWish = (...args) => {
      wrapLogin(() => {
        addWishAndPopup(...args);
      });
    };
    const wrapAddFavoriteBrand = (...args) => {
      wrapLogin(() => {
        addFavoriteBrand(...args);
      });
    };
    let likeBrand = false;
    for (let i = 0; i < favoriteBrands.length; i++) {
      if (favoriteBrands[i].id === _.get(product, 'brand.id')) {
        likeBrand = true;
        break;
      }
    }
    return (
      <ProductDetailPage
        {...this.props}
        likeBrand={likeBrand}
        images={images} activeImage={passImage} attributes={attributes}
        buyNow={wrapBuyNow} addCartProduct={wrapAddToCart} addWish={wrapAddWish} addFavoriteBrand={wrapAddFavoriteBrand}
      />
    );
  },
});

export default connect(
  (state, ownProps) => ({
    productId: ownProps.params.productId,
    product: state.entities.products[ownProps.params.productId],
    activeImage: state.page.pageProductDetail.activeImage,
    variantAttributes: state.page.pageProductDetail.variantAttributes,
    selectedVariant: state.page.pageProductDetail.selectedVariant,
    favoriteBrands: state.auth.favoriteBrands || [],
  }),
  { setActiveImage, selectColor, selectSize, wrapLogin, addCartAndPopup, addWishAndPopup }
)(ProductDetail);
