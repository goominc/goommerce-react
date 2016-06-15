import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, setHeader, toggleProductCart,
         setProductColor, setProductSize, toggleSignRegister } from 'redux/actions';
const { loadProduct, addWish, addFavoriteBrand, addCartProduct, createOrder } = ApiAction;

import ProductDetailPage from 'components/product/ProductDetailPage';
import ProductDetailBottom from 'components/product/ProductDetailBottom';

import roleUtil from 'commons/utils/roleUtil';

const ProductDetail = React.createClass({
  propTypes: {
    setHeader: PropTypes.func.isRequired,
    loadProduct: PropTypes.func.isRequired,
    addWish: PropTypes.func.isRequired,
    addFavoriteBrand: PropTypes.func.isRequired,
    addCartProduct: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
    toggleProductCart: PropTypes.func.isRequired,
    setProductColor: PropTypes.func.isRequired,
    setProductSize: PropTypes.func.isRequired,
    toggleSignRegister: PropTypes.func.isRequired,
    params: PropTypes.object,
    showCart: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return { product: {}, productVariants: [] };
  },
  componentDidMount() {
    this.props.setHeader({
      showLogo: false,
      showSearch: true,
      showCart: true,
      titleI18NKey: 'mItemDetail.title',
    });
    this.props.loadProduct(this.props.params.productId)
    .then((res) => {
      roleUtil.isAllowSeeProduct(this.props.auth, res, this.context.router);
      const variants = this.parseVariants(res);
      this.setState({ product: res, productVariants: variants,
        productColors: this.parseProductColors(variants), productSizes: this.parseProductSizes(variants) });
    });
  },
  parseVariants(product) {
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
          console.error(`[DATA ERROR] cannot detect color from variant (${variant.sku})`); // eslint-disable-line no-alert, max-len
          continue;
        }
        variant.data.color = data.color;
        variant.data.size = data.size;
      }
      variants.push(variant);
    }
    return variants;
  },
  parseProductColors(variants) {
    const colors = [];
    const colorSet = new Set();
    for (let i = 0; i < variants.length; i++) {
      const variantColor = variants[i].data.color;
      if (colorSet.has(variantColor)) {
        continue;
      }
      colorSet.add(variantColor);
      colors.push({ variant: variants[i], color: variantColor });
    }
    return colors;
  },
  parseProductSizes(variants) {
    const sizes = [];
    const sizeSet = new Set();
    for (let i = 0; i < variants.length; i++) {
      const variantSize = variants[i].data.size;
      if (sizeSet.has(variantSize)) {
        continue;
      }
      sizeSet.add(variantSize);
      sizes.push({ variant: variants[i], size: variantSize });
    }
    return sizes;
  },
  wrapAddCart(count) {
    const { auth } = this.props;
    if (auth.bearer) {
      if (this.props.variant) {
        const variants = this.state.productVariants;
        for (let i = 0; i < variants.length; i++) {
          if (variants[i].sku.indexOf(this.props.variant) >= 0) {
            return this.props.addCartProduct(variants[i].id, count);
          }
        }
      }
      return null;
    }
    return this.props.toggleSignRegister(true, 'sign');
  },
  wrapOrder(productVariants) {
    const { auth } = this.props;
    if (auth.bearer) {
      if (!(productVariants instanceof Array)) {
        productVariants = [productVariants];
      }
      this.props.createOrder({
        productVariants: productVariants.map((variant) => ({ id: variant.id, count: variant.count })),
      }).then((order) => this.context.router.push(`/orders/${order.id}/checkout`));
    } else {
      this.props.toggleSignRegister(true, 'sign');
    }
  },
  wrapWish() {
    const { auth, params } = this.props;
    if (auth.bearer) {
      return this.props.addWish(params.productId);
    }
    this.props.toggleSignRegister(true, 'sign');
    return null;
  },
  wrapFavorite(brandId) {
    const { auth } = this.props;
    if (auth.bearer) {
      return this.props.addFavoriteBrand(brandId);
    }
    this.props.toggleSignRegister(true, 'sign');
    return null;
  },
  buildImages() {
    const { product } = this.state;
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
    const images = this.buildImages();
    return (
      <div>
        <ProductDetailPage
          product={this.state.product} images={images} variants={this.state.productVariants}
          colors={this.state.productColors} sizes={this.state.productSizes}
          currentColor={this.props.color} currentSize={this.props.size}
          currentVariant={this.props.variant} showCart={this.props.showCart} toggleCart={this.props.toggleProductCart}
          setColor={this.props.setProductColor} setSize={this.props.setProductSize} addCart={this.wrapAddCart}
          buyNow={this.wrapOrder} addWish={this.wrapWish} addFavorite={this.wrapFavorite}
        />
        <ProductDetailBottom
          product={this.state.product}
          sizes={this.state.productSizes}
        />
      </div>
      );
  },
});

export default connect(
  (state, ownProps) => ({ auth: state.auth,
    showCart: state.pageProductDetail.showCart,
   color: state.pageProductDetail.selectColor, size: state.pageProductDetail.selectSize,
   variant: state.pageProductDetail.selectVariant }),
  { loadProduct, addWish, addFavoriteBrand, addCartProduct, createOrder,
    setHeader, toggleProductCart, setProductColor, setProductSize, toggleSignRegister }
)(ProductDetail);
