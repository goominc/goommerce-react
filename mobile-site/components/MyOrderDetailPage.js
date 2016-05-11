import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    order: PropTypes.object,
  },
  contextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  render() {
    const { order } = this.props;
    const { activeCurrency } = this.context;
    console.log(order);
    return (
      <section id="myorder-detail-container">
        <div className="myorder-box">
          <div className="box-header">
            주문정보
          </div>
          <div className="box-detail">
            <p className="order-info-black">주문일 : {order.createdAt.substr(0, 10)}</p>
            <p className="order-info-black">주문번호 : {order.id}</p>
            <p className="order-info-red">{i18n.get(`enum.order.status.${order.status}`)}</p>
          </div>
        </div>
        <div className="myorder-box">
          <div className="box-header">
            결제정보
          </div>
          <div className="box-detail">
            <div className="order-price-black">
              <span className="checkout-item">상품금액</span>
              <span className="cost">
                {activeCurrency} {order[`subtotal${activeCurrency}`]}
              </span>
            </div>
            <div className="order-price-black">
              <span className="checkout-item">부가세(10%)</span>
              <span className="cost">
                {activeCurrency} {order[`tax${activeCurrency}`]}
              </span>
            </div>
            <div className="order-price-black">
              <span className="checkout-item">사입비(3.3%)</span>
              <span className="cost">
                {activeCurrency} {order[`handlingFee${activeCurrency}`]}
              </span>
            </div>
            <div className="order-price-black">
              <span className="checkout-item">배송비</span>
              <span className="cost">
                {activeCurrency} {order[`shippingCost${activeCurrency}`]}
              </span>
            </div>
            <div className="order-price-red">
              <span className="checkout-item"><strong>최종 결제금액</strong></span>
              <span className="cost"><strong>
                {activeCurrency} {order[`total${activeCurrency}`]}
              </strong></span>
            </div>
          </div>
        </div>
      </section>
    );
  },
});
