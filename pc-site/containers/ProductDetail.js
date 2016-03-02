import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductDetailPage from '../components/ProductDetailPage';
import { getProductMainImage } from '../util';

import { ApiAction, setActiveImage, selectColor, selectSize, wrapLogin } from '../redux/actions';
const { loadProduct, loadProductAndThen, addCartProduct, createOrder } = ApiAction;

const ProductDetail = React.createClass({
  propTypes: {
    productId: PropTypes.string.isRequired,
    product: PropTypes.object,
    loadProduct: PropTypes.func.isRequired,
    addCartProduct: PropTypes.func.isRequired,
    activeImage: PropTypes.object,
    loadProductAndThen: PropTypes.func,
    setActiveImage: PropTypes.func,
    selectColor: PropTypes.func,
    selectSize: PropTypes.func,
  },
  contextTypes: {
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
            window.alert(`[DATA ERROR] cannot detect color from variant (${variant.sku})`);
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
    this.props.loadProductAndThen(this.props.productId, afterLoadProduct);
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
  addCartProduct(variant) {
    this.props.addCartProduct(variant.id);
  },
  render() {
    const { product, activeImage, selectColor, selectSize,
      createOrder, addCartProduct, wrapLogin } = this.props;
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
    const buyNow = (variantId, quantity) => {
      wrapLogin(() => {
        createOrder({ productVariants: [{ id: variantId, count: quantity }] }).then((order) => {
          this.context.router.push(`/orders/${order.id}/checkout`);
        });
      });
    };
    const addToCart = (...args) => {
      wrapLogin(() => {
        addCartProduct(...args);
      });
    };
    return (
      <ProductDetailPage
        {...this.props} images={images} activeImage={passImage} attributes={attributes} buyNow={buyNow} addCartProduct={addToCart}
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
  }),
  { loadProduct, loadProductAndThen, addCartProduct, createOrder,
    setActiveImage, selectColor, selectSize,
    wrapLogin }
)(ProductDetail);
