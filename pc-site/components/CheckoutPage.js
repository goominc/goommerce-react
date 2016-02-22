import React, { PropTypes } from 'react';

import SellerBox from './CartSellerBox';

export default React.createClass({
  propTypes: {
    order: PropTypes.object.isRequired,
    doCheckout: PropTypes.func,
    checkout: PropTypes.object,
    setCheckoutStep: PropTypes.func,
  },
  renderCheckoutInformations() {
    const { order } = this.props;
    return (
      <div>
        <div className="checkout-section-title">1. Please fill in your shipping address. </div>
        <div className="form-box">
          <div className="form-label">Country Name: </div>
          <input type="text" />
        </div>
        <div className="form-box">
          <div className="form-label">Address: </div>
          <input type="text" />
        </div>

        <div className="checkout-section-title">2. Review and confirm your order (3 items):</div>
        <SellerBox cart={order} />
      </div>
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
          <option value="HPP">핸드폰 결제</option>
          <option value="PhoneBill">받는전화결제</option>
          <option value="OCBPoint">OK 캐쉬백포인트 결제</option>
          <option value="Culture">문화상품권 결제</option>
          <option value="TeenCash">틴캐시 결제</option>
          <option value="DGCL">스마트문화 상품권 결제</option>
          <option value="BCSH">도서문화 상품권 결제</option>
          <option value="YPAY">옐로페이 결제</option>
          <option value="KPAY">케이페이 결제</option>
          <option value="EasyPay">간편 결제</option>
          <option value="EWallet">전자지갑 결제</option>
          <option value="POINT">포인트 결제</option>
          <option value="GiftCard">상품권 결제</option>
        </select>
        <input type="hidden" name="version" value="1.0"/>
        <input type="hidden" name="mid" ref="mid"/>
        <input type="hidden" name="oid" ref="oid"/>
        <input type="hidden" name="goodname" value="키보드/마우스"/>
        <input type="hidden" name="price" ref="price"/>
        <input type="hidden" name="currency" value="WON"/>
        <input type="hidden" name="buyername" value="LINKSHOPS"/>
        <input type="hidden" name="buyertel" value="010-2000-1234"/>
        <input type="hidden" name="buyermail" value=""/>
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
          {order.orderProducts.map(renderOrderProduct)}
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
