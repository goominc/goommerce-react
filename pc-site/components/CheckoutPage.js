import React, { PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin'; // for manage form input...

import CheckoutStep1 from './CheckoutStep1';

export default React.createClass({
  propTypes: {
    order: PropTypes.object.isRequired,
    addressFields: PropTypes.array,
    activeAddress: PropTypes.object,
    addresses: PropTypes.object,
    saveAddress: PropTypes.func,
    doCheckout: PropTypes.func,
    checkout: PropTypes.object,
    setCheckoutStep: PropTypes.func,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {};
  },
  renderCheckoutInformations() {
    return (
      <CheckoutStep1 {...this.props} />
    );
  },
  renderPayments() {
    const { order, doCheckout } = this.props;
    const handleCheckout = () => {
      doCheckout(order.id, this.refs);
    };
    return (
      <form id="checkout" method="POST">
        <div>KRW {order.totalEstimationKRW}</div>
        <select name="gopaymethod">
          <option value="">[ 결제방법 선택 ]</option>
          <option value="Card">신용카드 결제</option>
          <option value="DirectBank">실시간 은행계좌이체</option>
          <option value="VBank">무통장 입금</option>
        </select>
        <input type="hidden" name="version" value="1.0"/>
        <input type="hidden" name="mid" ref="mid"/>
        <input type="hidden" name="oid" ref="oid"/>
        <input type="hidden" name="goodname" value="의류"/>
        <input type="hidden" name="price" ref="price"/>
        <input type="hidden" name="currency" value="WON"/>
        <input type="hidden" name="buyername" value="LINKSHOPS"/>
        <input type="hidden" name="buyertel" value="010-2000-1234"/>
        <input type="hidden" name="buyeremail" ref="buyeremail"/>
        <input type="hidden" name="timestamp" ref="timestamp"/>
        <input type="hidden" name="signature" ref="signature"/>
        <input type="hidden" name="returnUrl" ref="returnUrl"/>
        <input type="hidden" name="mKey" ref="mKey"/>
        <button type="button" className="btn btn-default" onClick={handleCheckout}>
          CHECKOUT
        </button>
      </form>
    );
  },
  renderDone() {
    const { order } = this.props;
    function renderOrderProduct(product) {
      const sku = product.productVariant.sku;
      return (
        <li key={sku}>
          {sku}, KRW {product.priceKRW} x {product.orderedCount}
        </li>
      );
    }
    return (
      <div>
        <ul>
          {(order.orderProducts || []).map(renderOrderProduct)}
        </ul>
        <div>Total: KRW {order.totalEstimationKRW}</div>
        <div>Status: {order.status}</div>
        <SellerBox cart={order} />
      </div>
    );
  },
  render() {
    const { order, checkout, setCheckoutStep } = this.props;
    if (!order) {
      return (
        <div></div>
      );
    }
    const currentStep = checkout.step || 1;

    function getProgressbarClass(step) {
      return `checkout-progress-arrow progress-${step} ${currentStep === step ? 'progress-active': ''}`;
    }

    const getContent = () => {
      if (currentStep === 1) {
        return this.renderCheckoutInformations();
      } else if (currentStep === 2) {
        return this.renderPayments();
      } else if (currentStep === 3) {
        return this.renderDone();
      } else {
        // ERROR!
        window.alert('Invalid Checkout Page State!');
      }
    };

    const handleClickStep = (step) => {
      if (step != currentStep) {
        setCheckoutStep(step);
      }
    };

    const endClassName = `checkout-progress-end ${currentStep === 3 ? 'progress-active': ''}`;

    return (
      <div className="checkout-container-wrap">
        <div className="checkout-container">
          <div className={getProgressbarClass(1)} onClick={() => handleClickStep(1)}>
            checkout informations
          </div>
          <div className="checkout-progress-shadow progress-1-shadow"></div>
          <div className={getProgressbarClass(2)} onClick={() => handleClickStep(2)}>
            payment
          </div>
          <div className="checkout-progress-shadow progress-2-shadow"></div>
          <div className={getProgressbarClass(3)} onClick={() => handleClickStep(3)}>done</div>
          <div className={endClassName}></div>
          {getContent()}
        </div>
      </div>
    );
  },
});
