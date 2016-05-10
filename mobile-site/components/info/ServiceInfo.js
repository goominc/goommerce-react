// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="mobile-service-info-container">
        <div className="wrap_service_intro">
          <div className="service_intro_top_banner">
            <p className="top_banner_1"><span className="top_banner_365">365</span>일 닫히지 않는</p>
            <p className="top_banner_2">온라인 <span className="keycolor">동대문</span> 도매시장</p>
            <p className="top_banner_3">링크샵스</p>
          </div>
        </div>
        <div className="service_why">
          <span className="why">Why?</span>온라인 동대문 도매시장은 링크샵스 인가요?
        </div>
        <div className="radius_buyer">
          구매회원
        </div>
        <div className="buyer_text_1">
          동대문 도매쇼핑을 쉽고 빠르게!
        </div>
        <div className="buyer_text_2">
          <p>매일 업데이트되는 동대문 신상품</p>
          <p>동대문 상가/매장 별로 상품보기</p>
          <p>신용카드 등 다양한 결제수단</p>
        </div>
        <div className="radius_seller">
          판매회원
        </div>
        <div className="seller_text_1">
          상품등록부터 빠른 정산까지!
        </div>
        <div className="seller_text_2">
          <p>주문 상품 픽업 후, <span className="Roboto">24</span>시간 이내 정산</p>
          <p>상품 촬영 및 매장 전용 웹페이지 제공</p>
          <p>편리한 주문관리를 위한<br /> 판매자 전용 앱<span className="Roboto">(APP)</span> 제공</p>
        </div>
      </div>
    );
  },
});
