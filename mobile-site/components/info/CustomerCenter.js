// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  render() {
    return (
      <div className="mobile-customer-center-container">
        <div className="wrap_delivery_intro">
          <div className="delivery_intro_top_banner">
            <p className="top_banner_1"><span className="keycolor">편리하고 안전한</span></p>
            <p className="top_banner_2">링크샵스 주문 배송 시스템</p>
          </div>
        </div>
        <div className="deli_payment"><img src={`${constants.resourceRoot}/mobile/serviceinfo/delivery_card.png`} /></div>
        <div className="pay_title_text">
          <p className="pay_text1">주문 및 결제</p>
          <p className="pay_text2">다양한 결제 방법</p>
        </div>
        <div className="payment_cont">
          <div className="pay_ul1">
            <div>국내</div>
            <div className="payment_con_text2">해외</div>
            <div>　</div>
          </div>
          <div className="pay_ul2">
            <div>무통장입금, 신용카드 결제 가능</div>
            <div className="payment_con_text2">Visa, Master, JCB, 알리페이,</div>
            <div>텐페이, 유니온페이, 페이팔 결제가능</div>
          </div>
        </div>

        <div className="deli_line"><img src={`${constants.resourceRoot}/mobile/serviceinfo/deli_line.png`} /></div>
        <div className="deli_pickup"><img src={`${constants.resourceRoot}/mobile/serviceinfo/delivery_cart.png`} /></div>
        <div className="pickup_title_text">
          <p className="pickup_text1">매장픽업</p>
          <p className="pickup_text2">원하는 상품 등록요청 가능</p>
        </div>
        <ul className="pickup_text3">
          <li>빠르고 정확하게 움직이는 링크샵스!</li>
          <li>홈페이지에 원하는 매장 상품이 안보이세요?</li>
          <li>고객센터로 등록요청 해주세요!</li>
        </ul>
        <div className="deli_line2"><img src={`${constants.resourceRoot}/mobile/serviceinfo/deli_line.png`} /></div>
        <div className="deli_payment"><img src={`${constants.resourceRoot}/mobile/serviceinfo/delivery_truck.png`} /></div>
        <div className="pay_title_text">
          <p className="pay_text1">빠른배송</p>
          <p className="pay_text2">안전한 배송 시스템</p>
        </div>
        <div className="truck_cont">
          <div className="truck_ul1">
            <div>국내</div>
            <div className="truck_con_text2">해외</div>
            <div>　</div>
          </div>
          <div className="truck_ul2">
            <div>결제확인후 2-3일 (도서산간 12일 추가)</div>
            <div className="truck_con_text2">각 국의 배송정책 및 배송거리,</div>
            <div>상품의 중량에 따라 비용이 다를 수 있습니다.</div>
          </div>
        </div>
      </div>
    );
  },
});
