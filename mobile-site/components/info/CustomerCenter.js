// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="mobile-customer-center-container">
        <div className="wrap_service_intro">
          <div className="service_intro_top_banner">

            <p className="top_banner_2">링크샵스<span className="keycolor"> 고객센터</span></p>
            <p className="phone_num"><a href="tel:02-2272-1122">02-2272-1122</a></p>
            <div className="top_info">
              <p className="top_email">이메일 : <a className="mail_button Roboto" href="mailto:CS@linkshops.com">cs@linkshops.com</a></p>
              <p className="top_kakao_buyer">카카오톡 ID : <span className="Roboto">linkshops</span> (구매회원)</p>
              <p className="top_kakao_seller"><span className="opac0">카카오톡 ID :</span> <span className="Roboto">linkshops_brand</span> (판매회원)</p>
              <p className="top_wechat Roboto">Wechat : linkshops_china</p>
            </div>
          </div>
        </div>

        <div className="radius_buyer">
          고객센터 운영 정보
        </div>
        <div className="center_cont">
          <div className="center_ul1">
            <div>평일</div>
            <div className="center_con_text2">점심</div>
            <div>　</div>
          </div>
          <div className="center_ul2">
            <div>오전 10시 ~ 오후 6시</div>
            <div className="center_con_text2">오후 12시 30분 ~ 1시 30분</div>
            <div>(한국 기준, 주말 및 공휴일 제외)</div>
          </div>
        </div>
        <p className="mid_line"></p>
        <div className="radius_buyer">
          자주 묻는 질문들
        </div>
        <div className="qa_cont">
          <div className="qa_ul1">
            <div className="keycolor qa_q">Q.</div>
            <div className="qa_a">A.</div>
          </div>
          <div className="qa_ul2">
            <div className="keycolor qa_quest">결제 수단으로 어떤것이 있나요?</div>
            <div className="qa_con_text2">무통장 입금, 실시간 계좌 이체, 신용카드 결제, 페이팔,
              알리페이, 텐페이, China Union Pay로 결제 가능합니다.</div>

          </div>
          <div style={({ clear: 'both' })}>　</div>
        </div>

        <div className="qa_cont2">
          <div className="qa_ul1">
            <div className="keycolor qa_q">Q.</div>
            <div className="qa_a">A.</div>
            <div >　</div>
          </div>
          <div className="qa_ul2">
            <div className="keycolor qa_quest">배송기간은 얼마나 소요되나요?</div>
            <div className="qa_con_text2">국내배송의 경우 주문확인 후 영업일 기준 약 3~5일,
              해외배송의 경우 지역에 따라 다르나 주문확인 후 영업일
              기준 약 3~6일 소요됩니다.
              배송기간은 주말 및 공휴일 제외, 배송국가 및 지역,
              천재지변에 따라 기간이 다를 수 있습니다.</div>

          </div>
          <div style={({ clear: 'both' })}>　</div>
        </div>

        <div className="qa_cont3">
          <div className="qa_ul1">
            <div className="keycolor qa_q">Q.</div>
            <div className="qa_a">A.</div>
            <div>　</div>
          </div>
          <div className="qa_ul2">
            <div className="keycolor qa_quest">세금계산서 신청 가능한가요?</div>
            <div className="qa_con_text2">링크샵스에서 현금으로 거래하신 주문은 모두
              회원가입시 등록한 사업자등록증 번호로
              세금계산서가 자동 발행됩니다.
              신용카드로 결제하신 주문의 경우 세금계산서가
              발행되지 않습니다.
              그 밖의 궁금하신 내용은 고객센터로 문의해 주시면
              상세히 안내해 드리도록 하겠습니다.</div>
          </div>
          <div style={({ clear: 'both' })}>　</div>
        </div>

        <div className="qa_cont4">
          <div className="qa_ul1">
            <div className="keycolor qa_q">Q.</div>
            <div className="qa_a">A.</div>
            <div>　</div>
          </div>
          <div className="qa_ul2">
            <div className="keycolor qa_quest">링크샵스에 없는 상품도 구입할 수 있나요?</div>
            <div className="qa_con_text2">구매를 원하시는 업체 또는 상품이 있다면 언제든지 고객센터로
              문의해주세요.
              영업일 기준 14일 이내 해당 업체 신상품을 촬영 완료하여
              사이트에 업로드 하고 있습니다.
              단, 링크샵스 홈페이지 등록상가 내에서 요청이 가능한 점
              양해 부탁드립니다.</div>


          </div>
          <div style={({ clear: 'both' })}>　</div>
        </div>
        <div style={({ clear: 'both' })}>　</div>
      </div>
    );
  },
});
