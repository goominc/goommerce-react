// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {

  },
  render() {
    return (
      <div className="shipping-policy-country">
        <section>
          <div className="title">국가별 선결제 배송비</div>
          <div className="content">
            <ul className="dashed">
              <li>중국 : 총 상품금액의 30%</li>
              <li>대만, 마카오, 홍콩 : 총 상품금액의 20%</li>
              <li>그외 국가 : 총 상품금액의 40%</li>
            </ul>
          </div>
        </section>
        <section>
          <div className="title">국가 별 실 배송비 책정 기준</div>
          <div className="content">
            국가 별 통관 및 배송 정책에 따라 kg당 배송비가 상이하게 책정됩니다.
          </div>
          <div className="shipping-country-title">중국 : 7,000원 (1kg)</div>
          <div className="shipping-country-detail">별도의 비용이 추가되지 않습니다.</div>
          <div className="shipping-country-title">대만 : 2,800원 (1kg)</div>
          <div className="shipping-country-detail">통관 완료 후, 현지 관세/부가세/운송료는 별도 납부하셔야 합니다.</div>
          <div className="shipping-country-title">홍콩 : 3,000원 (1kg)</div>
          <div className="shipping-country-detail">
            별도의 비용이 추가되지 않습니다.<br />
            * 대만, 홍콩의 경우 박스 포장비용이 별도 발생하며 선결제 배송비에서 차감합니다.<br />
            주문 상품의 부피에 따라 박스는 중/대 사이즈로 포장이되며 사이즈 별 포장 비용은 다음과 같습니다.<br />
            - 중 사이즈: 3,000원<br />
            - 대 사이즈: 5,000원<br />
          </div>
          <div className="shipping-country-title">그외 국가 : 고객센터(02-2272-1122)로 문의주시면 자세히 안내 드리겠습니다.</div>
          <div className="content-center">
            배송비 책정 기준은 배송정책 변경에 따라<br />
            추후 조정될 수 있습니다.
          </div>
        </section>
      </div>
    );
  },
});
