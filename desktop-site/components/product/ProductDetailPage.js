import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';
import _ from 'lodash';

import Breadcrumb from 'components/Breadcrumb';
import brandUtil from 'commons/utils/brandUtil';
import productUtil from 'commons/utils/productUtil';
import numberUtil from 'commons/utils/numberUtil';

import ResponsiveImage from 'components/snippet/ResponsiveImage';

export default React.createClass({
  propTypes: {
    activeImage: PropTypes.object,
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
  componentDidMount() {
    // 2016. 05. 19. [heekyu] do not show previous visited product thumbnails
    $('.img-variant-color').attr('src', '');
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
    const { addCartProduct, buyNow, toggleWish, addFavoriteBrand, isLikeBrand, wishId } = this.props;
    if (!product || !variantAttributes) {
      return (<div></div>);
    }
    const brand = product.brand;
    const { activeLocale, activeCurrency, currencySign } = this.context;
    const renderImage = (image) => {
      if (!image) {
        return (<img />);
      }
      if (!image.publicId) {
        return (<img src={image.url} />);
      }
      return (
        <CloudinaryImage publicId={image.publicId}
          options={ { crop: 'scale', width: 50, height: 75 } }
        />
      );
    };
    const renderPreload = (image) => <img src={image.url} width="1" height="1" />;
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
          <div className="field-label">색상</div>
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
          <div className="field-label">사이즈</div>
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

    const path = [
      { link: '/', name: { en: 'Home', ko: '홈' } },
      { link: '/products', name: { en: 'Product List', ko: '상품목록' } },
      { name: productUtil.getAllNames(product) },
    ];
    let price = 0;
    if (selectedVariant) {
      price = selectedVariant[activeCurrency];
    } else {
      price = product[activeCurrency];
    }

    const renderBrand = () => {
      if (brand) {
        const renderFavoriteButton = () => {
          if (isLikeBrand) {
            return (
              <Link to={`/brands/${brand.id}`} className="favorite-brand">♥  단골 브랜드</Link>
            );
          }
          return (
            <span className="add-favorite-brand" onClick={() => addFavoriteBrand(product.brand.id)}>단골 브랜드 추가</span>
          );
        };
        return (
          <div className="normal-field-box">
            <div className="field-label">브랜드</div>
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
      if (activeCurrency === 'KRW') {
        return (<div className="field-content price-value"><b>{numberUtil.format(price)}</b> <span>원</span></div>);
      }
      return (<div className="field-content price-value"><b>{currencySign[activeCurrency]} {price}</b></div>);
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
      if (!isColorSelected) {
        return (<div className="product-detail-attr-warning">색상을 선택해 주세요</div>);
      }
      if (!isSizeSelected) {
        return (<div className="product-detail-attr-warning">사이즈를 선택해 주세요</div>);
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
        <div className="container-table no-padding">
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
              <div className="field-label">가격</div>
              {renderPrice()}
            </div>
            <div className="normal-field-box">
              <div className="field-label">상품번호</div>
              <div className="field-content"><b>{product.id}</b></div>
            </div>
            <div className="normal-field-box">
              <div className="field-label">상가건물</div>
              <div className="field-content">{_.get(product, 'brand.data.location.building.name.ko')}</div>
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
              <div className="field-label">수량</div>
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
                바로 구매하기
              </button>
              <button className="product-add-to-cart-button"
                onClick={onAddCart}
              >
                장바구니 담기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
