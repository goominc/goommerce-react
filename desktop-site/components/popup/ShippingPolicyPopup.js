// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    closePopup: PropTypes.func,
  },
  render() {
    const { closePopup } = this.props;
    return (
      <div>
        <div className="popup-overlay"></div>
        <div className="shipping-policy-container">
          <div className="title">사입비 및 배송비 책정 기준</div>
          <div className="popup-close-button" onClick={closePopup}></div>
          <div className="section">
            <div className="section-title">사입비는 어떻게 책정 되나요?</div>
            <div className="section-subtitle">사입비 책정 기준</div>
            <span>[ 총 구매 상품 ] + [ 부가세(10%) ]의 3.3%에 해당하는 금액이 사입비로 책정됩니다.</span>
          </div>
          <div className="section">
            <div className="section-title">배송비는 어떻게 책정 되나요?</div>
            <div className="section-subtitle">국내 택배 배송</div>
            <span>
              상품은 택배발송 되며 배송비는 3,300원 ( 부가세 포함 ) 입니다.<br />
              국내 전 지역 ( 도서산간 포함 ) 중량/부피 상관없이 동일한 배송비가 선 결제됩니다.
            </span>
            <div className="section-subtitle">해외 택배 배송</div>
            <span>
              도매 사이트의 특성 상, 사입 전 구매상품의 중량을 확인할 수 없기 때문에 총 상품금액의 일정 %를<br />
              배송비로 미리 선결제 받고 있으며, 발송 전 정확한 중량이 확인되면 실 배송비가 책정됩니다.
            </span>
            <span>
              책정된 실 배송비가 선결제하신 배송비보다 적을 경우, 차액은 주문 시 결제수단으로 자동 환불 처리해<br />
              드리고 있습니다.
            </span>
            <span>
              국가 별 배송비 책정기준은 다음과 같습니다.
            </span>
            <div className="section-subtitle">[ 국가 별 선결제 배송비 ]</div>
            <table>
              <tr>
                <td>중국</td>
                <td>총 상품금액의 30%</td>
              </tr>
              <tr>
                <td>대만</td>
                <td rowSpan="3">총 상품금액의 20%</td>
              </tr>
              <tr>
                <td>홍콩</td>
              </tr>
              <tr>
                <td>마카오</td>
              </tr>
              <tr>
                <td>그 외 국가</td>
                <td>총 상품금액의 40%</td>
              </tr>
            </table>
            <div className="section-subtitle">[ 국가 별 실 배송비 책정 기준 ]</div>
            <span>국가 별 통관 및 배송 정책에 따라 Kg당 배송비가 상이하게 책정됩니다.</span>
            <table>
              <tr>
                <td width="80px" className="center">중국</td>
                <td colSpan="2">￦7,000/kg( 별도의 비용이 추가되지 않습니다 )</td>
              </tr>
              <tr>
                <td className="center">홍콩</td>
                <td>￦2,800/kg</td>
                <td rowSpan="2">
                  박스 포장비용이 별도 발생하며 선결제 배송비에서 차감합니다.<br />
                  주문 상품의 부피에 따라 박스는 중/대 사이즈로 포장이되며 사이즈 별 포장 비용은 다음과 같습니다.<br />
                  - 중 사이즈:  3,000원<br />
                  - 대 사이즈:  5,000원<br />
                </td>
              </tr>
              <tr>
                <td className="center">대만</td>
                <td>￦3,000/kg</td>
              </tr>
              <tr>
                <td className="center">그 외 국가</td>
                <td colSpan="2">고객센터로 문의 주시면 자세히 안내 드리겠습니다.</td>
              </tr>
            </table>
            <span>* 배송비 책정 기준은 배송정책 변경에 따라 추후 조정될 수 있습니다.</span>
          </div>
          <div className="form-button-line">
            <button className="button-back" onClick={() => closePopup()}>{i18n.get('word.confirm')}</button>
          </div>
        </div>
      </div>
    );
  },
});
