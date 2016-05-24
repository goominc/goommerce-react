import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ProductDetailBanner from 'components/ProductDetailBanner';
import ProductDetailCart from 'components/ProductDetailCart';
import ShippingPolicyCountry from 'components/product/ShippingPolicyCountry';

import brandUtil from 'commons/utils/brandUtil';
import productUtil from 'commons/utils/productUtil';
import numberUtil from 'commons/utils/numberUtil';

export default React.createClass({
  propTypes: {
    product: PropTypes.object,
    images: PropTypes.array,
    variants: PropTypes.array,
    showCart: PropTypes.bool.isRequired,
    toggleCart: PropTypes.func.isRequired,
    colors: PropTypes.array,
    sizes: PropTypes.array,
    currentColor: PropTypes.string,
    currentSize: PropTypes.string,
    currentVariant: PropTypes.string,
    setColor: PropTypes.func.isRequired,
    setSize: PropTypes.func.isRequired,
    addCart: PropTypes.func.isRequired,
    buyNow: PropTypes.func.isRequired,
    addWish: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
  },
  getInitialState() {
    return {};
  },
  handleFavorite(brandId) {
    this.props.addFavorite(brandId);
    $('.add-favorite').addClass('active');
  },
  render() {
    const { product, images, showCart, variants, colors, sizes,
      currentColor, currentSize, currentVariant } = this.props;
    const { activeCurrency, currencySign } = this.context;
    if (!product || !Object.keys(product).length) {
      return (
        <div />
        );
    }

    const renderBrand = () => {
      if (product && product.brand && product.brand.data) {
        return (
        <section className="ms-detail-store">
          <Link to={`/brands/${product.brand.id}`}>
            <header className="store-title">{brandUtil.getName(product.brand)}</header>
            <p className="store-info">
              {brandUtil.getBuildingInfo(product.brand)}
            </p>
            { /* <p className="store-info">
              <img src="http://i01.i.aliimg.com/wimg/feedback/icon/25-s.gif" className="store-level" />
              <span className="store-postive">94.7% positive feedback the past</span>
            </p> */ }
          </Link>
          <div className="add-favorite" onClick={() => this.handleFavorite(product.brand.id)}>단골 브랜드</div>
        </section>
        );
      }
      return null;
    };

    const { isShowShippingCountry } = this.state;
    const renderShippingPolicyCountry = () => {
      if (isShowShippingCountry) {
        return [
          <div
            key="shippig-policy-title"
            className="product-detail-shipping-country-title"
            onClick={() => this.setState({ isShowShippingCountry: false })}
          >
            국가별 배송비 책정기준 <i className="ms-icon icon-arrow-up"></i>
          </div>,
          <ShippingPolicyCountry key="shipping-policy-content" />,
        ];
      }
      return (
        <div
          className="product-detail-shipping-country-title"
          onClick={() => this.setState({ isShowShippingCountry: true })}
        >
          국가별 배송비 책정기준 <i className="ms-icon icon-arrow-down"></i>
        </div>
      );
    };

    return (
      <article className="ms-detail">
        <ProductDetailBanner images={images} addWish={this.props.addWish} />
        <p className="product-detail-warning">
          링크샵스에서 제공하는 상품 이미지의 저작권은<br />
          링크샵스에게 있습니다.<br />
          상품 이미지를 무단 도용/배포하실 경우<br />
          저작권법에 의해 법적 조치를 받을 수 있습니다.<br />
        </p>

        <p className="ms-detail-subject ms-pd-lr12">{productUtil.getName(product)}</p>

        { /* <section className="ms-product-datail-price-tag  ms-app-only-product-detail-price">
          <a className="ms-app-only-price-tag-wrapper j-price-tag">
            <div className="ms-price-tag">
              <span className="ms-price-tag-info"><i className="ms-icon icon-mobile"></i></span>
              <span className="ms-price-tag-price arrow-right">Price on the app: {product.price_app}
                <i className="ms-icon icon-dropright-android"></i>
              </span>
            </div>
          </a>
        </section> */ }

        <section className="ms-pd-lr12 ms-detail-price">
          <div className="detail-price-container">
            <span className="price-span">{numberUtil.formatPrice(product[activeCurrency], activeCurrency, currencySign)}</span>
            <span className="unit-span"></span>
          </div>
        </section>

        {renderBrand()}

        <section className="ms-detail-sku ms-sku-row ms-color-second" onClick={this.props.toggleCart}>
          <p id="detail-sku-bar">
              Color
              Size
          </p>
          { /* <p id="detail-shipping-bar">
            <span>Shipping cost: </span>
            <span className="ms-color-ship" id="detail-shipping-cost">Free Shipping</span>
          </p> */ }
          <span className="ms-arrow">
            <span className="ms-icon icon-arrow-right"></span>
          </span>
        </section>

        <section className="ms-detail-btn-wrap ms-mrg-b12">
          <button className="ms-button-secondary" onClick={this.props.toggleCart}>Add to cart&nbsp;</button>
          <button className="ms-button-primary" onClick={this.props.toggleCart}>Buy now&nbsp;</button>
        </section>

        <ProductDetailCart show={showCart} toggle={this.props.toggleCart} topImg={images}
          currentColor={currentColor} currentSize={currentSize} currentVariant={currentVariant}
          variants={variants} colors={colors} sizes={sizes} setColor={this.props.setColor} setSize={this.props.setSize}
          addCart={this.props.addCart} buyNow={this.props.buyNow} product={product}
        />

        <section className="product-detail-desc-section">
          <div className="title">반품교환</div>
          <ul className="dashed">
            <li>도매사이트 특성 상 반품은 불가합니다.</li>
            <li>불량상품의 경우 링크샵스에서 배송료를 부담하고 교환해 드립니다.</li>
            <li>상품 불량으로 인한 교환신청은 배송완료 후 7일 이내에만 신청이 가능하며 동일 색상/사이즈로만 교환이 가능합니다.</li>
            <li>교환하고자 하는 상품이 품절된 경우 환불 처리해 드립니다.</li>
            <li>컴퓨터 모니터의 차이로 인해 색상차이가 있을 수 있으며 상품의 사이즈 오차는 측정하는 방법에 따라 다를 수 있어 불량에 해당하지 않습니다.</li>
            <li>상품을 착용하거나 세탁한 경우 교환기간 내라도 접수 불가능합니다.</li>
          </ul>
        </section>
        <section className="product-detail-desc-section">
          <div className="title">품절/입고지연</div>
          <ul className="dashed">
            <li>도매시장의 특성 상 판매자의 실시간 재고 파악이 불가능 합니다.</li>
            <li>판매자 또는 제조사의 사정으로 상품이 갑작스럽게 품절되거나 재고가 부족할 수 있습니다.</li>
            <li>품절된 상품의 경우 주문 당시 동일 결제수단으로 자동 환불 처리해 드립니다.</li>
          </ul>
        </section>
        <section className="product-detail-desc-section">
          <div className="title">배송</div>
          <ul className="dashed">
            <li>배송은 월~금요일만 진행되며 주말/공휴일/도매시장 휴업일은 제외입니다.</li>
            <li>주말, 공휴일 또는 도서산간 지역의 경우 1~2일의 추가 배송기간이 소요됩니다.</li>
            <li>자연재해, 제조/판매자의 재고 사정, 배송업체, 통관 문제 등으로 배송기간이 추가 지연될 수 있습니다.</li>
            <li>
              <strong>국내 택배 배송</strong><br />
              결제확인 후 2~3일의 배송기간이 소요됩니다.<br />
              상품은 택배발송 되며 배송비는 3,300원(부가세 포함)입니다.<br />
              국내 전지역(도서산간 포함) 중량/부피 상관없이 동일한 배송비가 선 결제됩니다.<br />
            </li>
            <li>
              <strong>해외 택배 배송</strong><br />
              결제확인 후 3~4일의 배송기간이 소요됩니다.<br />
              도매사이트의 특성 상, 사입 전 구매상품의 중량을 확인할 수 없기 때문에 총 상품금액의 일정 %를 배송비로 미리 선결제 받고 있으며 발송 전 정확한 중량이 확인되면 실 배송비가 책정됩니다.<br />
              책정된 실 배송비가 선결제하신 배송비보다 적을 경우, 차액은 주문 시 결제수단으로 자동 환불 처리해 드리고 있습니다.<br />
            </li>
          </ul>
        </section>
        {renderShippingPolicyCountry()}
      </article>
    );
  },
});
