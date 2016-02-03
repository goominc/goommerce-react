import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductDetailPage from '../components/ProductDetailPage';

import { ApiAction, setActiveImage } from '../redux/actions';
const { loadProduct, addCartProduct } = ApiAction;

const ProductDetail = React.createClass({
  propTypes: {
    productId: PropTypes.string.isRequired,
    product: PropTypes.object,
    loadProduct: PropTypes.func.isRequired,
    addCartProduct: PropTypes.func.isRequired,
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
  componentDidMount() {
    this.props.loadProduct(this.props.productId);
  },
  componentDidUnMount() {
    // 2016. 02. 03. [heekyu] remove this if show previouse shown image before
    this.props.setActiveImage('');
  },
  addCartProduct(variant) {
    this.props.addCartProduct(variant.id);
  },
  render() {
    const { product, activeImageUrl } = this.props;
    if (!product) return (<div></div>);
    const images = this.buildImages();
    let passImageUrl = activeImageUrl;
    if (images.length > 0 && (!activeImageUrl || activeImageUrl === '')) {
      passImageUrl = images[0].url;
    }
    return (
      <ProductDetailPage
        {...this.props} images={images} activeImageUrl={passImageUrl} />
    );
  },
});

export default connect(
  (state, ownProps) => ({
    productId: ownProps.params.productId,
    product: state.entities.products[ownProps.params.productId],
    activeImageUrl: state.page.pageProductDetail.image_url,
  }),
  { loadProduct, addCartProduct, setActiveImage }
)(ProductDetail);
