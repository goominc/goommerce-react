import React, { PropTypes } from 'react';

import SellerBox from './CartSellerBox';

export default React.createClass({
  propTypes: {
    order: PropTypes.object.isRequired,
    checkout: PropTypes.func,
  },
  render() {
    const { order, checkout } = this.props;
    if (!order) {
      return (
        <div></div>
      );
    }
    function handleCheckout() {
      checkout(order.id);
    }

    return (
      <div className="checkout-container-wrap">
        <div className="checkout-container">
          <div className="checkout-progress-arrow progress-1 progress-active">p1</div>
          <div className="checkout-progress-shadow progress-1-shadow"></div>
          <div className="checkout-progress-arrow progress-2">p2</div>
          <div className="checkout-progress-shadow progress-2-shadow"></div>
          <div className="checkout-progress-arrow progress-3">p3</div>
          <div className="checkout-progress-end"></div>

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
        <div>KRW {order.total.KRW}</div>
        <form id="checkout" method="POST">
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
      </div>
    );
  },
});
