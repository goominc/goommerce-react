import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as _ from 'lodash';

import loadEntities from 'commons/redux/util/loadEntities';
import ProductDetailPage from 'components/product/ProductDetailPage';
import ProductDetailBottom from 'components/product/ProductDetailBottom';
import { getProductMainImage } from 'commons/utils/productUtil';

import { selectColor, selectSize, setActiveImage, wrapLogin, addCartAndPopup, addWishAndPopup } from 'redux/actions';
import roleUtil from 'commons/utils/roleUtil';
import storeUtil from 'commons/utils/storeUtil';

const ProductDetail = React.createClass({
  propTypes: {
    auth: PropTypes.object,
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
    wishes: PropTypes.array,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    ApiAction: PropTypes.object,
    router: PropTypes.object.isRequired,
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
      // 2016. 06. 02. [heekyu] seller can see he/she's own products
      // 2016. 06. 15. [heekyu] china buyer can see page
      const { activeLocale } = this.context;
      if (activeLocale !== 'zh-cn' && activeLocale !== 'zh-tw') {
        roleUtil.isAllowSeeProduct(this.props.auth, product, this.context.router);
      }
      dispatch({
        type: 'PRODUCT_DETAIL_VARIANTS',
        variants: parseVariants(product),
      });
    };
    this.context.ApiAction.loadWishlist();
    this.context.ApiAction.loadProductAndThen(this.props.productId, afterLoadProduct);
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
    const { activeImage, product } = this.props; // eslint-disable-line no-shadow
    const { selectColor, selectSize, wrapLogin, addCartAndPopup } = this.props; // eslint-disable-line no-shadow
    const { addFavoriteBrand, createOrder, addWish, deleteWish } = this.context.ApiAction;
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
        $('.product-buy-now-button').prop('disabled', true);
        createOrder({ productVariants: [{ id: variantId, count: quantity }] }).then((order) => {
          this.context.router.push(`/orders/${order.id}/checkout`);
        }, () => {
          window.alert('Failed to Create Order');
          $('.product-buy-now-button').prop('disabled', false);
        });
      });
    };
    const wrapAddToCart = (...args) => {
      wrapLogin(() => {
        addCartAndPopup(...args);
      });
    };
    const wrapAddFavoriteBrand = (...args) => {
      wrapLogin(() => {
        addFavoriteBrand(...args);
      });
    };
    const wishId = storeUtil.getWishId(product);
    const toggleWish = () => {
      wrapLogin(() => {
        if (wishId) {
          deleteWish(wishId);
        } else {
          addWish(product.id);
        }
      });
    };
    return (
      <div>
        <ProductDetailPage
          {...this.props}
          isLikeBrand={storeUtil.isLikeBrand(_.get(product, 'brand.id'))}
          wishId={wishId}
          toggleWish={toggleWish}
          images={images} activeImage={passImage} attributes={attributes}
          buyNow={wrapBuyNow} addCartProduct={wrapAddToCart} addFavoriteBrand={wrapAddFavoriteBrand}
        />
        <ProductDetailBottom
          images={images}
          product={this.props.product}
          sizes={Object.keys(_.get(this.props, 'variantAttributes.sizes') || {})}
        />
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({
    auth: state.auth,
    productId: ownProps.params.productId,
    product: state.entities.products[ownProps.params.productId],
    activeImage: state.page.pageProductDetail.activeImage,
    variantAttributes: state.page.pageProductDetail.variantAttributes,
    selectedVariant: state.page.pageProductDetail.selectedVariant,
    favoriteBrands: state.auth.favoriteBrands || [],
    ...loadEntities(state, 'wishes', 'wishes'),
  }),
  { setActiveImage, selectColor, selectSize, wrapLogin, addCartAndPopup, addWishAndPopup }
)(ProductDetail);
