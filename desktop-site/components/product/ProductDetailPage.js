import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';
import _ from 'lodash';

import Breadcrumb from 'components/Breadcrumb';

import { getCategoryBreadcrumbPath } from 'commons/utils/storeUtil';
import productUtil from 'commons/utils/productUtil';
import numberUtil from 'commons/utils/numberUtil';
import i18n from 'commons/utils/i18n';

import ResponsiveImage from 'components/snippet/ResponsiveImage';

export default React.createClass({
  propTypes: {
    activeImage: PropTypes.object,
    auth: PropTypes.object,
    addCartProduct: PropTypes.func,
    addFavoriteBrand: PropTypes.func,
    addWish: PropTypes.func,
    attributes: PropTypes.array,
    buyNow: PropTypes.func,
    images: PropTypes.array.isRequired,
    isLikeBrand: PropTypes.bool,
    product: PropTypes.object.isRequired,
    selectedVariant: PropTypes.object,
    setActiveImage: PropTypes.func,
    toggleWish: PropTypes.func,
    variantAttributes: PropTypes.object,
    wishId: PropTypes.number,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  getInitialState() {
    return {};
  },
  componentDidMount() {
    // 2016. 04. 14. [heekyu] timing issue
    setTimeout(() => this.adjustScroll(this.props), 100);
  },
  componentWillReceiveProps(nextProps) {
    this.adjustScroll(nextProps);
  },
  setActiveImage(image) {
    if (image.url) {
      $('.main-image-box img').attr('src', image.url);
    }
    this.props.setActiveImage(image);
  },
  handleMouseEnterThumbnail(image) {
    this.setActiveImage(image);
  },
  handleMouseEnterMainImage() {
    // TODO make this to external state
    $('.enlarge-image-box').css('display', 'block');
  },
  handleMouseMoveMainImage(e) {
    // TODO make this to external state
    const width = 50; // TODO
    const height = width / 10 * 13;
    const offset = $(e.target).offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;
    const left = Math.max(x - width, 0);
    const top = Math.max(y - height, 0);
    const zoomElem = $('.enlarge-image-box img');
    zoomElem.css('margin-left', `-${left}px`);
    zoomElem.css('margin-top', `-${top}px`);
  },
  handleMouseLeaveMainImage() {
    // TODO make this to external state
    $('.enlarge-image-box').css('display', 'none');
  },
  adjustScroll(props) {
    const { images, activeImage } = props;
    let activeIndex = -1;
    images.forEach((image, index) => {
      if (activeImage && image.url === activeImage.url) {
        activeIndex = index;
      }
    });
    const thumbnailContainer = $('.thumbnail-container');
    if (activeIndex < 0 || thumbnailContainer.length < 1) {
      return;
    }
    const getScrollTop = (index) => $('.thumbnail-container span').eq(index).offset().top - $('.thumbnail-container span').eq(0).offset().top; // eslint-disable-line
    const currentTop = thumbnailContainer.scrollTop();
    const currentBottom = currentTop + 570;
    const activeTop = getScrollTop(activeIndex);
    if (activeTop < currentTop) {
      thumbnailContainer.stop().animate({ scrollTop: activeTop }, '500');
    } else if (activeTop > currentBottom - 50) {
      thumbnailContainer.stop().animate({ scrollTop: getScrollTop(activeIndex - 5) }, '500');
    }
  },
  render() {
    const { product, images, activeImage, variantAttributes, attributes, selectedVariant } = this.props
    const { addCartProduct, auth, buyNow, toggleWish, addFavoriteBrand, isLikeBrand, wishId } = this.props;
    if (!product || !variantAttributes) {
      return (<div className="container no-padding"></div>);
    }
    const brand = product.brand;
    const { activeLocale, activeCurrency, currencySign } = this.context;
    const renderPreload = (image) => <img key={image.url} src={image.url} width="1" height="1" />;
    const renderThumbnail = (image) => {
      let className = '';
      if (activeImage && image.url === activeImage.url) {
        className = 'image-active';
      }
      // <div className="inner-wrap">{renderImage(image)}</div>
      return (
        <span className={className} key={image.url} onClick={() => this.handleMouseEnterThumbnail(image)}>
          <ResponsiveImage image={image} width={120} />
        </span>
      );
    };
    const thumbnailUp = () => {
      if (!activeImage) {
        return;
      }
      for (let i = 1; i < images.length; i++) {
        if (images[i].url === activeImage.url) {
          this.setActiveImage(images[i - 1]);
          break;
        }
      }
    };
    const thumbnailDown = () => {
      if (!activeImage) {
        return;
      }
      for (let i = 0; i < images.length - 1; i++) {
        if (images[i].url === activeImage.url) {
          this.setActiveImage(images[i + 1]);
          break;
        }
      }
    };

    const renderPath = (categoryPath, index) => {
      const crumbPath = [{ link: '/', name: 'Home' }];
      for (let i = 0; i < categoryPath.ko.length; i++) {
        crumbPath.push({ link: 'products', name: categoryPath.ko[i] });
      }
      crumbPath.push({ name: productUtil.getName(product) });
      return (<Breadcrumb key={`breadcrumb-${index}`} path={crumbPath} />);
    };

    let isColorSelected = false;
    let isSizeSelected = false;
    const renderColor = (attrObj, fnOnSelect) => {
      const keys = Object.keys(attrObj);
      const render = (key) => {
        const obj = attrObj[key];
        let className = 'img-variant-color';
        if (!obj.enable) {
          className += ' disable-item';
        }
        if (obj.selected) {
          className += ' active';
          isColorSelected = true;
        }
        if (obj.img.publicId) {
          return (<CloudinaryImage
            className={className}
            key={key}
            onClick={() => fnOnSelect(key)}
            publicId={obj.img.publicId}
            options={{ width: 120, crop: 'scale' }}
          />);
        }
        return (<img className={className} key={key} onClick={() => fnOnSelect(key)} src={obj.img.url} />);
      };
      return (
        <div key={`product-color-${product.id}`} className="color-line">
          <div className="field-label">{i18n.get('pcItemDetail.color')}</div>
          <div className="field-content">
            {keys.map(render)}
          </div>
        </div>
      );
    };
    const renderSize = (attrObj, fnOnSelect) => {
      const keys = Object.keys(attrObj);
      const render = (key) => {
        const obj = attrObj[key];
        let className = '';
        if (!obj.enable) {
          className += ' disable-item';
        }
        if (obj.selected) {
          className += ' active';
          isSizeSelected = true;
        }
        return (
          <div key={key} onClick={() => fnOnSelect(key)} className={`attribute-item-text${className}`}>{key}</div>
        );
      };
      return (
        <div key={`product-size-${product.id}`} className="size-line">
          <div className="field-label">{i18n.get('pcItemDetail.size')}</div>
          <div className="field-content">
            {keys.map(render)}
          </div>
        </div>
      );
    };

    const renderAllAttributes = () => {
      const res = [];
      attributes.forEach((attr) => {
        if (attr.attrName === 'Color') {
          res.push(renderColor(variantAttributes[attr.key], attr.select));
        } else if (attr.attrName === 'Size') {
          res.push(renderSize(variantAttributes[attr.key], attr.select));
        }
      });

      return res;
    };

    let path;
    if (product.categories && product.categories.length) {
      const genLinkUrl = (category) => `/categories/${category.id}`;
      path = getCategoryBreadcrumbPath(product.categories[product.categories.length - 1], genLinkUrl);
      // 2016. 06. 21. [heekyu] 4th category is not display
      if (path.length > 4) {
        path = path.slice(0, 4);
      }
      if (path && path.length) {
        path.unshift({ link: '/', name: i18n.getObj('word.home') });
        const productBreadcrumbName = {};
        Object.keys(product.name).forEach((locale) => {
          productBreadcrumbName[locale] = product.name[locale] || product.id;
        });
        path.push({ name: productBreadcrumbName });
      }
    }
    if (!path) {
      path = [
        { link: '/', name: i18n.getObj('word.home') },
        { link: '/products', name: { en: 'Product List', ko: '상품목록' } },
        { name: productUtil.getAllNames(product) },
      ];
    }
    let priceKRW = 0;
    let price = 0;
    if (selectedVariant) {
      price = selectedVariant[activeCurrency];
      priceKRW = selectedVariant.KRW;
    } else {
      price = product[activeCurrency];
      priceKRW = product.KRW;
    }

    const brandLink = () => (brand.pathname ? `/${brand.pathname}` : `/brands/${brand.id}`);

    const renderBrand = () => {
      if (brand) {
        if (!auth.id) {
          return (
            <div className="normal-field-box">
              <div className="field-label">{i18n.get('pcItemDetail.brand')}</div>
              <div className="field-content">
                {i18n.get('mItemDetail.buildingInfoOnlySignup')}
              </div>
            </div>
          );
        }
        const renderFavoriteButton = () => {
          if (isLikeBrand) {
            return (
              <Link to={brandLink()} className="favorite-brand">♥ {i18n.get('pcItemDetail.favoriteBrands')}</Link>
            );
          }
          return (
            <span className="add-favorite-brand" onClick={() => addFavoriteBrand(product.brand.id)}>{i18n.get('pcItemDetail.addToFavoriteBrands')}</span>
          );
        };
        return (
          <div className="normal-field-box">
            <div className="field-label">{i18n.get('pcItemDetail.brand')}</div>
            <div className="field-content">
              <Link to={`/brands/${brand.id}`}>{_.get(brand, `name.${activeLocale}`)}</Link>
              {renderFavoriteButton()}
            </div>
          </div>
        );
      }
      return '';
    };

    const renderPrice = () => {
      if (!auth.id) {
        return <div className="field-content">{i18n.get('mItemDetail.buildingInfoOnlySignup')}</div>
      }
      let approximately = null;
      if (activeCurrency !== 'KRW') {
        approximately = `Approximately ${numberUtil.formatPrice(price, activeCurrency, currencySign)}`;
      }
      return (
        <div className="field-content">
          <div className="price-value">
            <b>{numberUtil.format(priceKRW)}</b> <span>KRW</span><br />
          </div>
          <div className="approximately">{approximately}</div>
        </div>
      );
    };

    let animation = null;
    const isAttributesSelected = () => {
      const doAnimation = (elem, borderSize) => {
        let opacity = 10;
        if (animation) {
          clearInterval(animation);
        }
        animation = setInterval(() => {
          if (opacity === 0) {
            clearInterval(animation);
            animation = null;
            elem.css('border', '');
            return;
          }
          elem.css('border', `${borderSize}px solid rgba(240, 80, 0, ${opacity / 10}`);
          opacity -= 1;
        }, 200);
        if (!this.state.isShowWarning) {
          this.setState({ isShowWarning: true });
        }
      };
      if (!isColorSelected) {
        doAnimation($('.color-line img'), 2);
        return false;
      }
      if (!isSizeSelected) {
        doAnimation($('.size-line .attribute-item-text'), 2);
        return false;
      }
      // TODO is there attributes other than color, size ?
      return true;
    };
    const onBuyNow = () => {
      if (!isAttributesSelected()) {
        return;
      }
      buyNow(selectedVariant.id, this.refs.quantity.value);
    };

    const onAddCart = () => {
      if (!isAttributesSelected()) {
        return;
      }
      addCartProduct(selectedVariant.id, this.refs.quantity.value);
    };
    const renderWarning = () => {
      if (!this.state.isShowWarning) {
        return null;
      }
      if (!isColorSelected) {
        return (<div className="product-detail-attr-warning">{i18n.get('pcItemDetail.selectColor')}</div>);
      }
      if (!isSizeSelected) {
        return (<div className="product-detail-attr-warning">{i18n.get('pcItemDetail.selectSize')}</div>);
      }
      return null;
    };

    return (
      <div className="container no-padding">
        <div className="preloader">
          {images.map(renderPreload)}
        </div>
        <Breadcrumb key="breadcrumb-default" path={path} />
        {/* TODO product.data && product.data.categoryPath ? product.data.categoryPath.map(renderPath) : [] */}
        <div className="container-table no-padding" style={({ marginBottom: '30px' })}>
          <div className="product-detail-left">
            <div className="left-thumbnail-container">
              <div className="arrow-up" onClick={thumbnailUp}></div>
              <div className="thumbnail-container">
                {images.map(renderThumbnail)}
              </div>
              <div className="arrow-down" onClick={thumbnailDown}></div>
            </div>
            <div onMouseMove={this.handleMouseMoveMainImage}
              onMouseEnter={this.handleMouseEnterMainImage}
              onMouseLeave={this.handleMouseLeaveMainImage}
              className="main-image-box"
            >
              <img src={activeImage.url} />
            </div>
            <div className="main-image-bottom-warn">
              <i className="icon-ban"></i>
              <span>
                {i18n.get('pcItemDetail.warnLinkshopsImage1')}<br />
                {i18n.get('pcItemDetail.warnLinkshopsImage2')}
              </span>
            </div>
            <div className="enlarge-image-box">
              <img src={activeImage.url} />
            </div>
          </div>
          <div className="product-detail-right">
            <div className="product-title">
              {productUtil.getName(product)}
              <div className={`wish-button ${wishId ? 'active' : ''}`} onClick={toggleWish}></div>
            </div>
            <div className="price-info-box">
              <div className="field-label">{i18n.get('pcCart.price')}</div>
              {renderPrice()}
            </div>
            <div className="normal-field-box">
              <div className="field-label">{i18n.get('pcItemDetail.skuNumber')}</div>
              <div className="field-content"><b>{product.id}</b></div>
            </div>
            <div className="normal-field-box">
              <div className="field-label">{i18n.get('pcItemDetail.building')}</div>
              <div className="field-content">{auth.id ? _.get(product, 'brand.data.location.building.name.ko') : i18n.get('mItemDetail.buildingInfoOnlySignup')}</div>
            </div>
            {renderBrand()}
            {renderAllAttributes()}
            {/*
            <div className="normal-field-box">
              <div className="field-label">Quantity: </div>
              <div className="field-content"><input type="number" defaultValue="1" min="1" ref="quantity" /></div>
            </div>

            {renderBrand()}
             */}
            <div className="quantity-line">
              <div className="field-label">{i18n.get('pcItemDetail.quantity')}</div>
              <div className="field-content">
                <div className="count-box">
                  <input className="input-number-nospin" min="1" defaultValue="1" ref="quantity" type="number" />
                  <span>
                    <div className="up" onClick={() => $('.input-number-nospin').val(+this.refs.quantity.value + 1)}></div>
                    <div className="down" onClick={() => $('.input-number-nospin').val(Math.max(+this.refs.quantity.value - 1, 1))}></div>
                  </span>
                </div>
              </div>
            </div>
            {renderWarning()}
            <div className="product-detail-action-line">
              <button className="product-buy-now-button"
                onClick={onBuyNow}
              >
                {i18n.get('pcItemDetail.orderNow')}
              </button>
              <button className="product-add-to-cart-button"
                onClick={onAddCart}
              >
                {i18n.get('pcItemDetail.cart')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
