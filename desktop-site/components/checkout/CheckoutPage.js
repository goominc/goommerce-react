import React, { PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin'; // for manage form input...
import _ from 'lodash';

import AddressEditForm from './AddressEditForm';
import AddressView from './AddressView';
import SellerBox from 'components/CartSellerBox';
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
    return { paymentMethod: 0 };
  },
  renderVBank() {
    const { order } = this.props;
    if (order.status === 1) {
      const payment = _.find(order.payments, (p) => p.type === 3 && p.status === 2 && p.data.payMethod === 'VBank');
      if (payment) {
        return (
          <div>
            <div>입금은행: {payment.data.vactBankName}</div>
            <div>입금계좌번호: {payment.data.VACT_Num}</div>
            <div>예금주명: {payment.data.VACT_Name}</div>
            <div>송금자명: {payment.data.VACT_InputName}</div>
          </div>
        );
      }
    }
  },
  render() {
    const { order } = this.props;
    const { activeAddressId, addresses, isEditMode,
      checkoutNewAddress, setActiveAddressId, saveOrderAddress } = this.props;
    const { activeCurrency, currencySign } = this.context;
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
            <div className="title">{i18n.get('pcPayment.addNewAddress')}</div>
            <div className="add-address-box">
              <div className="add-address-button" onClick={checkoutNewAddress}></div>
            </div>
          </div>
        </div>
      );
    };

    const paymentMethods = [
      { icon: 'icon-inicis', name: '무통장 입금', method: 'VBank' },
      { icon: 'icon-credit-card', name: i18n.get('pcPayment.creditCard'), method: 'Card' },
      // { icon: 'icon-alipay', name: 'ALIPAY', method: 'alipay' },
      // { icon: 'icon-union-pay', name: 'UNION PAY', method: 'unionpay' },
      // { icon: 'icon-tenpay', name: 'TENPAY', method: 'tenpay' },
      // { icon: 'icon-tenpay', name: 'PAYPAL', method: 'paypal' },
    ];
    const renderPaymentMethod = (method, index) => (
      <div key={`payment-${index}`} className={`row ${index === this.state.paymentMethod ? 'active' : ''}`} onClick={() => this.setState({ paymentMethod: index })}>
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
          window.alert('주소를 입력해 주세요');
          return;
        }
        const method = paymentMethods[this.state.paymentMethod].method;
        $('form input[name=gopaymethod]').val(method);
        doCheckout(order.id, method, Object.assign({}, this.refs,
          { gopaymethod: { value: method } }));
      };
      return (
        <form id="checkout" method="POST" ref="checkoutForm">
          {/* global */}
          <input type="hidden" name="webordernumber" ref="webordernumber" />
          <input type="hidden" name="reqtype" ref="reqtype" />
          <input type="hidden" name="returnurl" ref="returnurl" />
          <input type="hidden" name="hashdata" ref="hashdata" />
          <input type="hidden" name="notiurl" ref="notiurl" />

          {/* alipay */}
          <input type="hidden" name="notiidle" ref="notiidle" value="2" />

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
          <input type="hidden" name="idletimenoti" ref="idletimenoti" value="2" />

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

    const formatPrice = (type) =>
      numberUtil.formatPrice(order[`${type}${activeCurrency}`], activeCurrency, currencySign);

    const brands = orderUtil.collectByBrands(order.orderProducts);
    const subtotalPrice = formatPrice('subtotal');
    const handlingFeePrice = formatPrice('handlingFee');
    const shippingCostPrice = formatPrice('shippingCost');
    const taxPrice = formatPrice('tax');
    const totalPrice = formatPrice('total');
    return (
      <div className="cart-conatiner">
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
              <div className="label">{i18n.get('pcPayment.tax')} (10%)</div>
              <div className="control">{taxPrice}</div>
            </div>
            <div className="row">
              <div className="label">{i18n.get('pcPayment.handlingFee')} (3.3%)</div>
              <div className="control">{handlingFeePrice}</div>
            </div>
            <div className="row">
              <div className="label">{i18n.get('pcPayment.shippingCost')}</div>
              <div className="control">{shippingCostPrice}</div>
            </div>
            <div className="total-row">
              <div className="label">{i18n.get('pcPayment.totalPrice')}</div>
              <div className="control">{totalPrice}</div>
            </div>
          </div>
          <div className="payment-method-box">
            <div className="title">{i18n.get('pcPayment.paymentMethod')}</div>
            {paymentMethods.map(renderPaymentMethod)}
            {renderPayments()}
            {/*
            <div className="row">
              <i className="label icon-alipay"></i>
              <div className="control">알리페이</div>
            </div>
            <div className="row">
              <i className="label icon-union-pay"></i>
              <div className="control">은련카드</div>
            </div>
            <div className="row">
              <i className="label icon-tenpay"></i>
              <div className="control">텐페이</div>
            </div>
             */}
          </div>
        </div>
        { /*
         <div className="checkout-container-wrap">
         <div className="checkout-container">
         <div className={getProgressbarClass('review')} onClick={() => handleClickStep('review')}>
         checkout informations
         </div>
         <div className="checkout-progress-shadow progress-1-shadow"></div>
         <div className={getProgressbarClass('payment')} onClick={() => handleClickStep('payment')}>
         payment
         </div>
         <div className="checkout-progress-shadow progress-2-shadow"></div>
         <div className={getProgressbarClass('done')} onClick={() => handleClickStep('done')}>
         done
         </div>
         <div className={endClassName}></div>
         {getContent()}
         </div>
         </div>
         */ }
      </div>
    );
  },
});
