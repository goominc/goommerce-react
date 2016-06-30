// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  contextTypes: {
    router: PropTypes.object,
  },
  render() {
    return (
      <div className="mobile-signup-info-container">
        <div className="wrap_sign_up_intro">
          <div className="sign_up_intro_top_banner">
            <p className="top_banner_1"><span className="keycolor">사업자 회원</span> 전용 서비스</p>
            <p className="top_banner_2">링크샵스</p>
          </div>
        </div>
        <div className="radius_buyer">
          구매회원(소매)
        </div>
        <div className="buyer_sign_1">회원가입 신청</div>
        <div className="buyer_sign_1">사업자 정보 확인</div>
        <div className="buyer_sign_1">승인완료</div>
        <div className="buyer_sign_img"><img className="signup_buyer" src={`${constants.resourceRoot}/mobile/serviceinfo/signup_buyer.png`} /></div>
        <div className="buyer_sign_text">패션잡화 관련 사업자에 한해 가입승인이 진행됩니다.</div>
        <div className="buyer_sign_button" onClick={() => this.context.router.push('/accounts/signup')}>회원가입</div>
        <div className="center_line"></div>

        <div className="radius_buyer">
          판매회원(도매)
        </div>
        <div className="buyer_sign_1">입점신청</div>
        <div className="buyer_sign_1">상담진행</div>
        <div className="buyer_sign_1">입점완료</div>
        <div className="buyer_sign_img"><img className="signup_buyer" src={`${constants.resourceRoot}/mobile/serviceinfo/signup_seller.png`} /></div>
        <div className="buyer_sign_text">동대문 매장 운영 사업자에 한해 상담이 진행됩니다.</div>
        <div className="center_line"></div>
        <div className="in_seller">입점 신청하기</div>
        <div className="in_seller_text">
          <p>고객센터 : <span className="roboto">02-2272-1122</span></p>
          <p className="Roboto">이메일 : <a className="mail_button" href="mailto:CS@linkshops.com">CS@linkshops.com</a></p>
          <p>카카오톡 ID : <span className="Roboto">링크샵스 판매자 센터</span></p>
        </div>
      </div>
    );
  },
});
