// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';


import i18n from 'commons/utils/i18n';
import numberUtil from 'commons/utils/numberUtil';
import orderUtil from 'commons/utils/orderUtil';
import productUtil from 'commons/utils/productUtil';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
    addresses: PropTypes.object,
    activeAddressId: PropTypes.number,
    inipay: PropTypes.func.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
    router: PropTypes.object,
  },
  getInitialState() {
    return { showPay: false, showShippingPolicy: false };
  },
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll() {
    if (this.isShowPaymentInfo()) {
      $('.accounts').css('position', 'static');
    } else {
      $('.accounts').css('position', 'fixed');
    }
  },
  isShowPaymentInfo() {
    const elem = $('.order-product-checkout');
    if (!elem.length) {
      return false;
    }
    const scrollBottom = $(window).scrollTop() + $(window).height();
    const paymentBottom = elem.offset().top + elem.height();
    const barHeight = $('.accounts').height();
    return scrollBottom >= paymentBottom + barHeight;
  },
  toggle() {
    if (!this.state.showPay) {
      if (!_.get(this.props.order, 'address.id')) {
        window.alert('주소를 입력해 주세요');
        return;
      }
      if (!this.isShowPaymentInfo()) {
        $('body').animate({ scrollTop: $('#order-summary').offset().top }, 500);
        return;
      }
      $('#root').css({
        height: $(window).height(),
        overflow: 'hidden',
      });
    } else {
      $('#root').css({
        height: 'auto',
        overflow: 'auto',
      });
    }
    this.setState({ showPay: !this.state.showPay });
  },
  inipay(smartMethod, inipayMethod, reserved) {
    const { addresses, activeAddressId } = this.props;
    if (!addresses || !Object.keys(addresses).length || !activeAddressId) {
      // FIXME no alert
      alert('please input shipping address');
      return;
    }

    this.props.inipay(this.props.order.id, inipayMethod).then((res) => {
      this.refs.mid.value = res.mid;
      this.refs.oid.value = res.oid;
      this.refs.amt.value = res.price;
      this.refs.email.value = res.buyeremail;
      this.refs.mobile.value = res.buyertel;
      this.refs.uname.value = res.buyername;
      this.refs.nextUrl.value = res.returnUrl;
      this.refs.cancelUrl.value = res.returnUrl;
      this.refs.reserved.value = reserved;
      if (smartMethod === 'vbank') {
        // FIXME: merges w/ global noti url.
        this.refs.notiUrl.value = 'https://www.linkshops.com/api/v1/inipay/vacct_mobile';
      }
      if (smartMethod === 'etc') {
        this.refs.goods.value = 'clothing';
      }
      this.refs.inipay.action = `https://mobile.inicis.com/smart/${smartMethod}/`;
      this.refs.inipay.submit();
    });
  },
  renderAddresses() {
    const { order, addresses, activeAddressId } = this.props;
    if (!addresses || !activeAddressId || !addresses[activeAddressId]) {
      return (
        <div className="order-section order-shipping-address">
          <Link id="change-address" to={`/orders/${order.id}/address/add`}>{i18n.get('mOrder.addAddress')}</Link>
        </div>
      );
    }
    const selectedAddress = addresses[activeAddressId];

    return (
      <div className="order-section order-shipping-address">
        <div className="name">{selectedAddress.detail.alias}</div>
        <p>
          {selectedAddress.countryCode}<br />
          {_.get(selectedAddress, 'detail.name') || ''}<br />
          {_.get(selectedAddress, 'detail.tel') || ''}<br />
          {_.get(selectedAddress, 'detail.postalCode') || ''}<br />
          {_.get(selectedAddress, 'detail.address.base') || ''}<br />
          {_.get(selectedAddress, 'detail.address.detail') || ''}<br />
        </p>
        <Link id="change-address" to={`/orders/${order.id}/address`}>{i18n.get('mOrder.changeAddress')}</Link>
      </div>
    );
  },
  render() {
    const { order } = this.props;
    const { activeLocale, activeCurrency, currencySign } = this.context;
    if (!order) {
      return <div />;
    }

    const orderSummary = (
      <div id="order-summary">
        <h3>
          {i18n.get('pcMypage.payment')}
          <div className="shipping-handling-fee-policy" onClick={() => this.context.router.push('/service/policy/shipping')}>
            {i18n.get('mOrder.shippingPolicyTitle')} <span className="ms-icon icon-arrow-right"></span>
          </div>
        </h3>
        <ul className="order-product-checkout">
          <li className="clearfix">
            <span className="checkout-item">{i18n.get('pcMypage.productPrice')}</span>
            <span className="cost"><b>
              {numberUtil.formatPrice(order[`subtotal${activeCurrency}`], activeCurrency, currencySign)}
            </b></span>
          </li>
          <li className="clearfix">
            <span className="checkout-item">{i18n.get('pcPayment.tax')}</span>
            <span className="cost"><b>
              {numberUtil.formatPrice(order[`tax${activeCurrency}`], activeCurrency, currencySign)}
            </b></span>
          </li>
          <li className="clearfix">
            <span className="checkout-item">{i18n.get('pcPayment.handlingFee')}</span>
            <span className="cost"><b>
              {numberUtil.formatPrice(order[`handlingFee${activeCurrency}`], activeCurrency, currencySign)}
            </b></span>
          </li>
          <li className="clearfix">
            <span className="checkout-item">{i18n.get('pcPayment.shippingCost')}</span>
            <span className="cost"><b>
              {numberUtil.formatPrice(order[`shippingCost${activeCurrency}`], activeCurrency, currencySign)}
            </b></span>
          </li>
          <li className="checkout-total clearfix">
            <span className="checkout-item"><b>{i18n.get('pcCart.total')}</b></span>
            <span id="checkout-price-total" className="cost"><b>
              {numberUtil.formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign)}
            </b></span>
          </li>
        </ul>
        <form method="post" acceptCharset="euc-kr" ref="inipay">
          <input type="hidden" name="P_MID" ref="mid" />
          <input type="hidden" name="P_OID" ref="oid" />
          <input type="hidden" name="P_AMT" ref="amt" />
          <input type="hidden" name="P_MNAME" ref="mname" value="LINKSHOPS" />
          <input type="hidden" name="P_UNAME" ref="uname" />
          <input type="hidden" name="P_GOODS" ref="goods" value="의류" />
          <input type="hidden" name="P_MOBILE" ref="mobile" />
          <input type="hidden" name="P_EMAIL" ref="email" />
          <input type="hidden" name="P_NEXT_URL" ref="nextUrl" />
          <input type="hidden" name="P_NOTI_URL" ref="notiUrl" />
          <input type="hidden" name="P_CANCEL_URL" ref="cancelUrl" />
          <input type="hidden" name="P_RESERVED" ref="reserved" />
          <input type="hidden" name="P_CHARSET" value="utf8" />
          <input type="hidden" name="P_QUOTABASE" value="02:03:04:05:06:07:08:09:10:11:12" />
          <input type="hidden" name="P_CURRENCY" value="WON" />
        </form>
        <article id="seller-cart-buyall" className="seller-products">
          <div className="accounts bt p-24 pt-24 pb-24 clearfix">
            <div className="total">
              <span>{i18n.get('pcCart.total')}</span>
              <span className="mt-16 price">{numberUtil.formatPrice(order[`total${activeCurrency}`], activeCurrency, currencySign)}</span>
            </div>
            <div className="ui-button ui-button-main buyall" onClick={this.toggle}>
              {this.state.showPay ? i18n.get('mOrder.goBack') : i18n.get('pcCart.checkout')}
            </div>
          </div>
        </article>
        {/*
         <input
         type="submit"
         id="create-order"
         value={i18n.get('pcPayment.placeOrder')}
         className="ui-button ui-button-main do-order-btn"
         onClick={this.toggle}
         />
         */}
      </div>
    );
    const renderProducts = () => {
      const brands = orderUtil.collectByBrands(order.orderProducts) || [];
      return brands.map((brand) => {
        const renderProduct = (product) => {
          const renderVariant = (productVariant) => (
            <li className="p-24" key={productVariant.productVariant.id}>
              <div className="pi-details mb-24 clearfix">
                <div className="pi-details-pic">
                  <Link to={`/products/${productVariant.productVariant.productId}`}>
                    <img src={_.get(productVariant.productVariant, 'appImages.default[0].url') || ''} />
                  </Link>
                </div>
                <div className="pi-details-desc">
                  <div className="pi-details-desc-row">
                    <Link to={`/products/${productVariant.productVariant.productId}`}>
                      <div className="details-title">
                        {productUtil.getName(product.product)}
                      </div>
                    </Link>
                    <div className="variant-attribute">{_.get(productVariant.productVariant, 'data.color')}</div>
                    <div className="variant-attribute">{_.get(productVariant.productVariant, 'data.size')}</div>
                    <div className="unit-price">
                      {numberUtil.formatPrice(productVariant.productVariant[activeCurrency], activeCurrency, currencySign)}
                    </div>
                    <div className="quantity">{productVariant.quantity} {i18n.get('word.unit')}</div>
                    <div className="clearfix"></div>
                    <div className="total-price">
                      {numberUtil.formatPrice(productVariant[`total${activeCurrency}`], activeCurrency, currencySign)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
          return product.productVariants.map(renderVariant);
        };
        return (
          <section className="shopcart-list">
            <div className="seller bt p-24 pb-24 pt-24">
              {brand.brand.name[activeLocale]}
            </div>
            <ul className="product order-product">
              {(brand.products || []).map(renderProduct)}
            </ul>
          </section>
        );
      });
    };
    return (
      <section id="place-order">
        <div className="order-panel">
          <h3>{i18n.get('pcPayment.shippingAddress')}</h3>
          {this.renderAddresses()}
        </div>
        {renderProducts()}
        <div className="shopcart-list">
          {orderSummary}
        </div>
        <div className="pay-wrap" style={{ display: this.state.showPay ? 'block' : 'none' }}>
          <div className="pay-header">
            <span className="pay-title">Payment Method</span>
            <span className="pay-cancel" onClick={this.toggle}></span>
          </div>
          <ul className="pay-method-list">
            <li onClick={() => this.inipay('wcard', 'mobile', 'twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N')}>
              <span className="pay-title">{i18n.get('pcPayment.creditCard')}</span>
              <span className="ms-arrow"><span className="ms-icon icon-arrow-right"></span></span>
            </li>
            <li onClick={() => this.inipay('vbank', 'mobile', 'vbank_receipt=Y')}>
              <span className="pay-title">{i18n.get('pcPayment.vbank')}</span>
              <span className="ms-arrow"><span className="ms-icon icon-arrow-right"></span></span>
            </li>
            <li onClick={() => this.inipay('etc', 'mobile_global', 'etc_paymethod=APAY')}>
              <span className="pay-title">{i18n.get('pcPayment.alipay')}</span>
              <span className="ms-arrow"><span className="ms-icon icon-arrow-right"></span></span>
            </li>
            <li onClick={() => this.inipay('etc', 'mobile_global', 'etc_paymethod=UPMP')}>
              <span className="pay-title">{i18n.get('pcPayment.unionpay')}</span>
              <span className="ms-arrow"><span className="ms-icon icon-arrow-right"></span></span>
            </li>
            {/*
             <li onClick={() => this.inipay('etc', 'mobile_global', 'etc_paymethod=PPAY')}>
             <span className="pay-title">페이팔</span>
             <span className="ms-arrow"><span className="ms-icon icon-arrow-right"></span></span>
             </li>
             */}
          </ul>
        </div>
      </section>
    );
  },
});
