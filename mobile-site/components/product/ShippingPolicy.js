// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import ShippingPolicyCountry from './ShippingPolicyCountry';

export default React.createClass({
  contextTypes: {
    router: PropTypes.object,
  },
  render() {
    return (
      <div className="pay-wrap" style={({ display: 'block' })}>
        <div className="pay-header">
          <span className="pay-title">사입비 및 배송비 책정기준</span>
          <span className="pay-cancel" onClick={this.context.router.goBack}></span>
        </div>
        <div className="ms-panel-bodyer">
          <section className="shipping-policy-section">
            <div className="title">사입비는 어떻게 책정되나요?</div>
            <span>[총 구매 상품] + [부가세(10%)]의 3.3%에 해당하는 금액이 사입비로 책정됩니다.</span>
          </section>
          <section className="shipping-policy-section">
            <div className="title">배송비는 어떻게 책정되나요?</div>
            <div className="sub-section">
              <div className="sub-title">국내 택배 배송</div>
              <span>
                상품은 택배발송 되며 배송비는 3,300원(부가세 포함)입니다.<br />
                국내 전지역(도서산간 포함) 중량/부피 상관없이 동일한 배송비가 선 결제됩니다.
              </span>
            </div>
            <div className="sub-section">
              <div className="sub-title">해외 택배 배송</div>
              <span>
                도매사이트의 특성 상, 사입 전 구매상품의 중량을 확인할 수 없기 때문에 총 상품금액의 일정 %를 배송비로 미리 선결제 받고 있으며 발송 전 정확한 중량이 확인되면 실 배송비가 책정됩니다.
                <br /><br />
                책정된 실 배송비가 선결제하신 배송비보다 적을 경우, 차액은 주문 시 결제수단으로 자동 환불 처리해 드리고 있습니다.
              </span>
            </div>
          </section>
          <section className="shipping-policy-section">
            <div className="title-center">해외 국가별 배송비 책정 기준</div>
            <ShippingPolicyCountry />
          </section>
        </div>
      </div>
    );
  },
});
