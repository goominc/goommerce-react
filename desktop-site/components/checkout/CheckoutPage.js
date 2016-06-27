// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin'; // for manage form input...

import AddressEditForm from './AddressEditForm';
import AddressView from './AddressView';
import ShippingPolicyPopup from 'components/popup/ShippingPolicyPopup';
import i18n from 'commons/utils/i18n';
import CartProduct from 'components/CartProduct';
import numberUtil from 'commons/utils/numberUtil';
import orderUtil from 'commons/utils/orderUtil';

export default React.createClass({
  propTypes: {
    activeAddressId: PropTypes.number,
    addresses: PropTypes.object,
    doCheckout: PropTypes.func,
    order: PropTypes.object.isRequired,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
    router: PropTypes.object.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return { paymentMethod: 0, isShowPaymentPolicyDetail: false, isShowShippingPolicy: false };
  },
  componentDidMount() {
    // 2016. 05. 30. [heekyu] scroll behavior is complicated and not-predictable.
    // window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll() {
    const elem = $('.checkout-right-container');
    if (!elem.length) {
      return;
    }
    // .policy-detail-box can be extended
    const moreHeight = Math.max(0, $('.policy-detail-box').height() || 0);
    if (elem.height() - moreHeight + 200 >= $(window).height()) {
      return;
    }
    const windowTop = $(window).scrollTop();
    const leftElem = $('.checkout-left-container');
    if (leftElem.offset().top > windowTop) {
      elem.css('position', 'relative');
      elem.css('top', 0);
      return;
    }
    const position = elem.css('position');
    const containerWindowBottom = $('.cart-container').offset().top + $('.cart-container').height() - windowTop;
    if (position === 'fixed') {
      if (containerWindowBottom < elem.height()) {
        const s = `${containerWindowBottom - elem.height()}px`;
        elem.css('top', s);
      }
    } else {
      if (windowTop > elem.offset().top && containerWindowBottom > elem.height()) {
        elem.css('position', 'fixed');
        elem.css('top', '0');
      }
    }
  },
  render() {
    const { order } = this.props;
    const { activeAddressId, addresses, isEditMode,
      checkoutNewAddress, setActiveAddressId, saveOrderAddress } = this.props;
    const { activeCurrency, currencySign } = this.context;
    const { isShowPaymentPolicyDetail } = this.state;
    if (!order) {
      return (
        <div></div>
      );
    }

    const renderAddresses = () => {
      if (isEditMode) {
        return (
          <AddressEditForm {...this.props} />
        );
      }
      const onSetActiveAddress = (address) => {
        setActiveAddressId(address.id);
        saveOrderAddress(order.id, address);
      };
      const renderAddress = (address) => (
        <AddressView key={`address-view-${address.id}`}
          {...this.props}
          address={address}
          isActive={activeAddressId === address.id}
          onClickMe={onSetActiveAddress}
        />
      );
      const addressIds = Object.keys(addresses);
      for (let i = 0; i < addressIds.length; i++) {
        const addressId = addressIds[i];
        if (addressId.toString() === activeAddressId.toString()) {
          for (let j = i - 1; j >= 0; j--) {
            addressIds[j + 1] = addressIds[j];
          }
          addressIds[0] = addressId;
          break;
        }
      }
      return (
        <div className="address-container">
          {addressIds.map((addressId) => renderAddress(addresses[addressId]))}
          <div className="item">
            <div className="title-address">{i18n.get('pcPayment.addNewAddress')}</div>
            <div className="add-address-box">
              <div className="add-address-button" onClick={checkoutNewAddress}></div>
            </div>
          </div>
        </div>
      );
    };

    const paymentMethods = [
      { icon: 'icon-inicis', name: i18n.get('pcPayment.vbank'), method: 'VBank', inipayMethod: 'web' },
      { icon: 'icon-credit-card', name: i18n.get('pcPayment.creditCardKorea'), method: 'Card', inipayMethod: 'web' },
      { icon: 'icon-credit-card-global', name: i18n.get('pcPayment.creditCardGlobal'), method: 'Card', inipayMethod: 'global_card' },
      { icon: 'icon-alipay', name: i18n.get('pcPayment.alipay'), method: 'alipay', inipayMethod: 'global' },
      { icon: 'icon-union-pay', name: i18n.get('pcPayment.unionpay'), method: 'unionpay', inipayMethod: 'global' },
      // { icon: 'icon-credit-card', name: i18n.get('pcPayment.creditCard'), method: 'Card', inipayMethod: 'global_card' },
      // { icon: 'icon-tenpay', name: 'TENPAY', method: 'tenpay' },
      // { icon: 'icon-paypal', name: 'PAYPAL', method: 'paypal' },
    ];
    const renderPaymentMethod = (method, index) => (
      <div
        key={`payment-${index}`}
        className={`row ${index === this.state.paymentMethod ? 'active' : ''}`}
        onClick={() => this.setState({ paymentMethod: index })}
      >
        <i className={`label ${method.icon}`}></i>
        <div className="control">
          {method.name}
          <span className="payment-check"></span>
        </div>
      </div>
    );

    const renderPayments = () => {
      const { doCheckout } = this.props;
      const handleCheckout = (e) => {
        e.preventDefault();
        if (!activeAddressId) {
          window.alert(i18n.get('pcPayment.warnInputAddress'));
          return;
        }
        if (!this.refs.refundPolicy.checked) {
          window.alert(i18n.get('pcPayment.warnAgreeToRefundPolicy'));
          return;
        }
        const { method, inipayMethod } = paymentMethods[this.state.paymentMethod];
        $('form input[name=gopaymethod]').val(method);
        doCheckout(order.id, method, inipayMethod, Object.assign({}, this.refs,
          { gopaymethod: { value: method } }));
      };
      return (
        <form id="checkout" target="checkout" method="POST" ref="checkoutForm">
          {/* global */}
          <input type="hidden" name="webordernumber" ref="webordernumber" />
          <input type="hidden" name="reqtype" ref="reqtype" />
          <input type="hidden" name="returnurl" ref="returnurl" />
          <input type="hidden" name="hashdata" ref="hashdata" />
          <input type="hidden" name="notiurl" ref="notiurl" />

          {/* alipay */}
          {/* <input type="hidden" name="notiidle" ref="notiidle" value="2" /> */}

          {/* paypal */}
          <input type="hidden" name="shiptoname" ref="shiptoname" />
          <input type="hidden" name="shiptostreet" ref="shiptostreet" />
          <input type="hidden" name="shiptostreet2" ref="shiptostreet2" />
          <input type="hidden" name="shiptocity" ref="shiptocity" />
          <input type="hidden" name="shiptostate" ref="shiptostate" />
          <input type="hidden" name="shiptocountrycode" ref="shiptocountrycode" />
          <input type="hidden" name="shiptozip" ref="shiptozip" />

          {/* tenpay */}
          <input type="hidden" name="order_vaild_time" ref="order_vaild_time" />
          {/* <input type="hidden" name="idletimenoti" ref="idletimenoti" value="2" /> */}

          {/* web */}
          <input type="hidden" name="gopaymethod" />
          <input type="hidden" name="version" value="1.0" />
          <input type="hidden" name="mid" ref="mid" />
          <input type="hidden" name="oid" ref="oid" />
          <input type="hidden" name="goodname" ref="goods" value="의류" />
          <input type="hidden" name="price" ref="price" />
          <input type="hidden" name="currency" value="WON" />
          <input type="hidden" name="buyername" ref="buyername" />
          <input type="hidden" name="buyertel" ref="buyertel" />
          <input type="hidden" name="buyeremail" ref="buyeremail" />
          <input type="hidden" name="timestamp" ref="timestamp" />
          <input type="hidden" name="signature" ref="signature" />
          <input type="hidden" name="returnUrl" ref="returnUrl" />
          <input type="hidden" name="mKey" ref="mKey" />
          <input type="hidden" name="quotabase" value="2:3:4:5:6:7:8:9:10:11:12" />
          <input type="hidden" name="acceptmethod" value="va_receipt" ref="acceptmethod" />
          <button type="submit" className="cart-button-order" onClick={handleCheckout}>
            {i18n.get('pcPayment.placeOrder')}
          </button>
        </form>
      );
    };

    const renderPaymentDetail = () => {
      if (isShowPaymentPolicyDetail) {
        return [
          <div key="payment-policy-more" onClick={() => this.setState({ isShowPaymentPolicyDetail: false })} className="more-button">
            {i18n.get('word.closeMoreContent')} <i className="arrow-up"></i>
          </div>,
          <div key="payment-detail-box" className="policy-detail-box">
            <p>{i18n.get('pcPayment.refundPolicyMore1')}</p>
            <p>{i18n.get('pcPayment.refundPolicyMore2')}</p>
            <p>{i18n.get('pcPayment.refundPolicyMore3')}</p>
          </div>,
        ];
      }
      return (
        <div className="more-button" onClick={() => this.setState({ isShowPaymentPolicyDetail: true })}>
          {i18n.get('word.openMoreContent')} <div className="arrow-down"></div>
        </div>
      );
    };

    const renderShippingPolicyPopup = () => {
      if (this.state.isShowShippingPolicy) {
        return <ShippingPolicyPopup cmsData={this.props.shippingPolicyCmsData} closePopup={() => this.setState({ isShowShippingPolicy: false })} />;
      }
      return null;
    };

    const formatPrice = (type) =>
      numberUtil.formatPrice(order[`${type}${activeCurrency}`], activeCurrency, currencySign);

    const brands = orderUtil.collectByBrands(order.orderProducts);
    const subtotalPrice = formatPrice('subtotal');
    const handlingFeePrice = formatPrice('handlingFee');
    const shippingCostPrice = formatPrice('shippingCost');
    const taxPrice = formatPrice('tax');
    const totalPrice = formatPrice('total');
    const questionButton =
      <i className="payment-question" onClick={() => this.setState({ isShowShippingPolicy: true })}></i>;
    return (
      <div className="cart-container">
        <div className="cart-title-box">
          <i className="icon-payment"></i> <span>{i18n.get('pcPayment.payment')}</span>
        </div>
        <div className="checkout-left-container">
          <div className="title">{i18n.get('pcPayment.shippingAddress')}</div>
          {renderAddresses()}
          <div className="title">{i18n.get('pcPayment.orderSummary')}</div>
          <CartProduct brands={brands} />
        </div>
        <div className="checkout-right-container">
          <div className="payment-info-box">
            <div className="title">{i18n.get('pcPayment.paymentInfo')}</div>
            <div className="row">
              <div className="label">{i18n.get('pcPayment.subtotal')}</div>
              <div className="control">{subtotalPrice}</div>
            </div>
            <div className="row">
              <div className="label">{i18n.get('pcPayment.tax')}</div>
              <div className="control">{taxPrice}</div>
            </div>
            <div className="row">
              <div className="label">{i18n.get('pcPayment.handlingFee')} {questionButton}</div>
              <div className="control">{handlingFeePrice}</div>
            </div>
            <div className="row">
              <div className="label">{i18n.get('pcPayment.shippingCost')} {questionButton}</div>
              <div className="control">{shippingCostPrice}</div>
            </div>
            <div className="total-row">
              <div className="label">{i18n.get('pcPayment.totalPrice')}</div>
              <div className="control">{totalPrice}</div>
            </div>
          </div>
          <div className="payment-policy-box">
            <input id="refund_policy" type="checkbox" className="payment-checkbox" ref="refundPolicy" />
            <label onClick={() => $('#refund_policy').click()}></label>
            <div className="policy-title">
              {i18n.get('pcPayment.refundPolicyTitle')}
            </div>
            <div className="policy-content">
              {i18n.get('pcPayment.refundPolicyDesc1')}<br />
              {i18n.get('pcPayment.refundPolicyDesc2')}<br />
              {i18n.get('pcPayment.refundPolicyDesc3')}<br />
            </div>
            {renderPaymentDetail()}
          </div>
          <div className="payment-method-box">
            <div className="title">{i18n.get('pcPayment.paymentMethod')}</div>
            {paymentMethods.map(renderPaymentMethod)}
            {renderPayments()}
          </div>
          {renderShippingPolicyPopup()}
        </div>
      </div>
    );
  },
});
