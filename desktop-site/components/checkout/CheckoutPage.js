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
    addressFields: PropTypes.array,
    addresses: PropTypes.object,
    doCheckout: PropTypes.func,
    step: PropTypes.string.isRequired,
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
      const payment = _.find(order.payments, (p) => p.type === 0 && p.status === 2 && p.data.payMethod === 'VBank');
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
  renderDone() {
    const { order } = this.props;

    // const variants = order.orderProducts.map((p) => Object.assign({}, p.productVariant, { count: p.quantity }));
    const brands = orderUtil.collectByBrands(order.orderProducts);
    return (
      <div>
        {brands.map((brand) => (<SellerBox key={brand.brand.id} {...this.props} brand={brand} />))}
        <div>Total: KRW {order.totalKRW}</div>
        <div>Status: {i18n.get(`enum.order.status.${order.status}`)}</div>
        {this.renderVBank()}
      </div>
    );
  },
  render() {
    const { order } = this.props;
    const { activeAddressId, addresses, isEditMode,
      checkoutNewAddress, setActiveAddressId } = this.props;
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
      const renderAddress = (address) => (
        <AddressView key={address.id}
          {...this.props}
          address={address}
          isActive={activeAddressId === address.id}
          onClickMe={(address2) => setActiveAddressId(address2.id)}
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
            <div className="title">배송지 추가</div>
            <div className="add-address-box">
              <div className="add-address-button" onClick={checkoutNewAddress}></div>
            </div>
          </div>
        </div>
      );
    };

    const paymentMethods = [
      { icon: 'icon-inicis', name: '무통장 입금', method: 'VBank' },
      { icon: 'icon-credit-card', name: '신용 카드', method: 'Card' },
    ];
    const renderPaymentMethod = (method, index) => (
      <div className={`row ${index === this.state.paymentMethod ? 'active' : ''}`} onClick={() => this.setState({ paymentMethod: index })}>
        <i className={`label ${method.icon}`}></i>
        <div className="control">
          {method.name}
          <span className="payment-check"></span>
        </div>
      </div>
    );

    const renderPayments = () => {
      const { doCheckout } = this.props;
      const handleCheckout = () => {
        const method = paymentMethods[this.state.paymentMethod].method;
        $('form input[name=gopaymethod]').val(method);
        doCheckout(order.id, Object.assign({}, this.refs,
          { gopaymethod: { value: method } }));
      };
      return (
        <form id="checkout" method="POST">
          <input type="hidden" name="gopaymethod" />
          <input type="hidden" name="version" value="1.0" />
          <input type="hidden" name="mid" ref="mid" />
          <input type="hidden" name="oid" ref="oid" />
          <input type="hidden" name="goodname" value="의류" />
          <input type="hidden" name="price" ref="price" />
          <input type="hidden" name="currency" value="WON" />
          <input type="hidden" name="buyername" value="LINKSHOPS" />
          <input type="hidden" name="buyertel" value="010-2000-1234" />
          <input type="hidden" name="buyeremail" ref="buyeremail" />
          <input type="hidden" name="timestamp" ref="timestamp" />
          <input type="hidden" name="signature" ref="signature" />
          <input type="hidden" name="returnUrl" ref="returnUrl" />
          <input type="hidden" name="mKey" ref="mKey" />
          <button type="submit" className="cart-button-order" onClick={handleCheckout}>
            결제하기
          </button>
        </form>
      );
    };

    const brands = orderUtil.collectByBrands(order.orderProducts);
    const formatPrice = numberUtil.formatPrice(+order[`total${activeCurrency}`], activeCurrency, currencySign);
    return (
      <div className="cart-conatiner">
        <div className="cart-title-box">
          <i className="icon-payment"></i> <span>결제</span>
        </div>
        <div className="checkout-left-container">
          <div className="title">배송 정보</div>
          {renderAddresses()}
          <div className="title">주문 내역</div>
          <CartProduct brands={brands} />
        </div>
        <div className="checkout-right-container">
          <div className="payment-info-box">
            <div className="title">결제 정보</div>
            <div className="row">
              <div className="label">상품금액</div>
              <div className="control">{formatPrice}</div>
            </div>
            <div className="row">
              <div className="label">부가세</div>
              <div className="control">{numberUtil.formatPrice(+order[`total${activeCurrency}`] / 10, activeCurrency, currencySign)}</div>
            </div>
            <div className="row">
              <div className="label">배송비</div>
              <div className="control">0</div>
            </div>
            <div className="total-row">
              <div className="label">결제금액</div>
              <div className="control">{formatPrice}</div>
            </div>
          </div>
          <div className="payment-method-box">
            <div className="title">결제 수단</div>
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
