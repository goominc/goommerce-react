// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.adjustScrollPosition();
  },
  componentDidUpdate() {
    this.adjustScrollPosition();
  },
  adjustScrollPosition() {
    const { params } = this.props;
    if (params.section) {
      setTimeout(() => {
        // 2016. 04. 20. [heekyu] there is timing issue
        const offset = $(`#${params.section}`).offset();
        if (offset) {
          $('body').scrollTop(offset.top);
          // 2016. 04. 26. [heekyu] for IE
          document.documentElement.scrollTop = offset.top;
        }
      }, 10);
    }
  },
  render() {
    return (
      <div className="service-info-container">
        <ul className="title_box" id="service_info">
          <li className="title">
            서비스안내
          </li>

          <li className="sub_title">
            <span className="title_line">I</span>&nbsp;&nbsp;&nbsp;&nbsp;온라인 도매시장의 새로운 기준 링크샵스
          </li>
        </ul>
        <div className="service">
          <div className="service_text">
            <div className="service_line_01">링크샵스</div>
            <div className="service_line_02">365일 닫히지 않는 <span className="text_orange">온라인 동대문</span>을 만나보세요.</div>
            <div className="service_line_03">주문만 하세요!</div>
            <div className="service_line_04">픽업부터 배송까지 책임지겠습니다.</div>
            <div className="service_line_05"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/check_orange.png" /> 매일 업데이트 되는 동대문 신상품을 만나보실수 있습니다.</div>
            <div className="service_line_06"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/check_orange.png" /> 원하는 상가 / 매장별로 상품을 쉽게 확인하실 수 있습니다.</div>
            <div className="service_img"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/service_img_01.png" /> </div>
          </div>
        </div>
        <div className="why">
          <strong className="why_str">Why?</strong> 왜 <strong>온라인 도매시장</strong>은 링크샵스 인가요?
        </div>
        <div style={({ clear: 'both' })}></div>
        <div className="ur_buyer">
          <strong><span className="keycolor">구매회원 이라면</span> 어디서나 믿을 수 있는 상품을 쉽고 빠르게</strong>
        </div>
        <div className="card_wrap">
          <div className="why_card">
            <p><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/why_01.png" /></p>
            <div className="why_text_box">
              <p className="why_subtitle">믿을수 있는 상품 관리</p>
              <div className="why_cont1">
                <p>- 입점 브랜드와 직접 소통</p>
                <p>- 전 샘플 내부 촬영</p>
                <p>- 도매시장과 동일한 가격</p>
              </div>
            </div>
          </div>
          <div className="why_card">
            <p><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/why_02.png" /></p>
            <div className="why_text_box">
              <p className="why_subtitle">편리한 결제 및 정산</p>
              <div className="why_cont2">
                <p>- 묶음배송 및 해외배송 가능</p>
                <p>- 다양한 결제 방법 지원</p>
                <p>- 세금계산서 발행</p>
              </div>
            </div>
          </div>
          <div className="why_card">
            <p><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/why_03.png" /></p>
            <div className="why_text_box" style={({ border: 'none' })}>
              <p className="why_subtitle">맞춤형 고객 지원</p>
              <div className="why_cont3">
                <p>- 언어별 사이트 운영</p>
                <p>- 다양한 채널의 고객센터</p>
                <p>- 다국어 고객센터 운영</p>
              </div>
            </div>

          </div>
        </div>
        <p className="what_buyer">[<span className="blackcolor">구매회원이란?</span> 링크샵스에서 구입(buying)을 진행하는 패션잡화 관련 소매사업자를 말합니다 ]</p>
        <div className="ur_buyer">
          <strong><span className="keycolor">판매 회원을 위한</span> 배송부터 해외 시장 진출까지 원스탑 서비스</strong>
        </div>
        <div className="card_wrap">
          <div className="why_card">
            <p><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/why_04.png" /></p>
            <div className="why_text_box">
              <p className="why_subtitle">글로벌 마켓 진출 지원</p>
              <div className="why_cont4">
                <p>- 국가 별 전문 인력</p>
                <p>- 다양한 마케팅 채널 제휴/운영</p>
                <p>- 4개국 언어(중문,영문 등)지원</p>
              </div>
            </div>
          </div>
          <div className="why_card">
            <p><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/why_05.png" /></p>
            <div className="why_text_box">
              <p className="why_subtitle">매장 운영 서비스</p>
              <div className="why_cont5">
                <p>- 24시간 이내 정산</p>
                <p>- 판매자 전용 APP</p>
                <p>　</p>

              </div>
            </div>
          </div>
          <div className="why_card">
            <p><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/why_06.png" /></p>
            <div className="why_text_box" style={({ border: 'none' })}>
              <p className="why_subtitle">판매/홍보용 컨텐츠 제작</p>
              <div className="why_cont6">
                <p>- 샘플 픽업 후 24시간 내 촬영</p>
                <p>- 룩북 및 브랜드 홈페이지 제작</p>

              </div>
            </div>

          </div>
        </div>
        <p className="what_buyer" style={({ padding: '10px 0 118px 0' })}>[<span className="blackcolor">판매회원이란?</span> 링크샵스에서 판매를 진행하는 도매매장 운영 사업자를 말합니다 ]</p>

        <ul className="title_box" id="signup_info">
          <li className="title" style={({ width: '393px' })}>
            회원가입 안내
          </li>

          <li className="sub_title" style={({ width: '807px' })}>
            <span className="title_line">I</span>&nbsp;&nbsp;&nbsp;&nbsp;고객과 함께 성장하는 비즈니스 파트너
          </li>
        </ul>
        <p className="sign_in_text">
          링크샵스는 <span className="sign_in_str">사업자 회원 전용 서비스</span>입니다.
          <span className="sign_in_str">회원가입</span> 및 <span className="sign_in_str">입점신청</span>은 아래와 같이 진행 됩니다. <br /> <span className="sign_in_sub_text">* 비회원의 경우 상품 정보 조회가 어려운 점 양해 부탁 드립니다.</span>
        </p>
        <div className="sign_in_buyer">
          <div className="sign_in_box">구매회원(소매)</div>
          <div className="sign_in_buyer_01">01</div>
          <div className="sign_in_buyer_02">02</div>
          <div className="sign_in_buyer_03">03</div>
          <div className="sign_in_buyer_04">회원가입<br />신청</div>
          <div className="sign_in_buyer_05">사업자<br />정보 확인</div>
          <div className="sign_in_buyer_06">승인 완료</div>
          <div className="sign_in_buyer_img"></div>
          <Link to="/accounts/signup"><div className="sign_in_buyer_button"><span className="sign_in_button_text">구매회원<p className="sign_in_button_text_small">회원가입</p><p className="sign_in_button_text_small">하러가기</p></span></div></Link>
          <div className="sign_in_buyer_01_text"><span>- 회원 가입은 <storng style={({ color: '#000' })}>무료</storng>입니다.</span><br /><span>- 디자인 저작권 보호 및</span><br />시장가격경쟁을 방지하고자<br />가입 시 사업자 정보를 받고 있습니다.</div>
          <div className="sign_in_buyer_02_text"><span>- 패션잡화 관련 소매사업자에</span><br />한해 가입승인이 진행됩니다.<br /><span>- 취급품목 및 업태가 다른 경우</span><br />승인이 반려될 수 있습니다.</div>
          <div className="sign_in_buyer_03_text"><span>- 승인 완료 후 링크샵스의</span><br />다양한 서비스를<br />이용하실 수 있습니다.</div>
        </div>

        <div className="sign_in_buyer" style={({ marginBottom: '100px' })}>
          <div className="sign_in_box">판매회원(도매)</div>
          <div className="sign_in_seller_01">01</div>
          <div className="sign_in_seller_02">02</div>
          <div className="sign_in_seller_03">03</div>
          <div className="sign_in_seller_04">브랜드<br />입점 신청</div>
          <div className="sign_in_seller_05">상담 진행</div>
          <div className="sign_in_seller_06">입점 및<br />상품 등록</div>
          <div className="sign_in_seller_img02"></div>
          <Link to="/shops/join"><div className="sign_in_buyer_button"><span className="sign_in_button_text">판매회원<p className="sign_in_button_text_small">입점신청</p><p className="sign_in_button_text_small">하러가기</p></span></div></Link>
          <div className="sign_in_seller_01_text"><span>- 오프라인 도매매장을</span><br />운영하는 도매사업자에<br />한해 신청이 가능합니다.<br /><strong style={({ fontSize: '12px' })}>(현재 동대문, 도매 사업자에 한해 가능)</strong></div>
          <div className="sign_in_seller_02_text"><span>- 유선 및 방문 상담을 통해</span><br />링크샵스 서비스 이용방법에<br />대하여 자세히 안내 드립니다.</div>
          <div className="sign_in_seller_03_text"><span>- 입점과 동시에 샘플 촬영 및</span><br />상품등록이 진행 됩니다.<br />이후 판매회원 전용 페이지가<br />개설 됩니다.</div>
        </div>

        <ul className="title_box" id="order_info">
          <li className="title" style={({ width: '394px' })}>
            주문배송 안내
          </li>

          <li className="sub_title" style={({ width: '806px' })}>
            <span className="title_line">I</span>&nbsp;&nbsp;&nbsp;&nbsp;편리하고 안전한 배송결제 시스템
          </li>
        </ul>
        <div className="smart_deli">
          <div className="smart_deli_title">원스톱 주문배송 시스템</div>
          <div className="deli_img"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/smart_deli.png" /> </div>
          <div className="deli_img_text_box">주문 및 결제</div>
          <div className="deli_img_text_box" style={({ marginLeft: '90px' })}>매장 픽업</div>
          <div className="deli_img_text_box" style={({ marginLeft: '84px' })}>송장 입력</div>
          <div className="deli_img_text_box" style={({ marginLeft: '96px' })}>빠른 배송</div>
          <div className="deli_img_text_box" style={({ marginLeft: '84px' })}>수령 완료</div>
          <div className="deli_text_center_01"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/check_2.png" />구매 매장 수와 상관 없이 픽업 후 <span>묶음배송</span> 해 드립니다 </div>
          <div className="deli_text_center_02"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/check_2.png" />원하는 매장 및 상품 <span>등록 요청</span>이 가능합니다 </div>
          <div className="deli_text_center_03">( 고객센터로 문의 해주세요 )</div>
          <div className="home_deil">
            <div className="deli_list"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/list_orange.png" /> 국내배송</div>
            <div className="deli_text">국내 택배 배송의 경우,결제확인 후 2~3일 정도의 배송기간이 소요됩니다.<br />주말,공휴일 기간 혹은 제주/도서산간 지역의 경우 1~2일의 추가 배송기간이 소요됩니다.<br /><span>*자연재해, 제조/판매자 재고 사정, 배송업체 사정 등으로 예기치 않게 추가 지연될 수 있습니다.</span></div>
            <div className="deli_list" style={({ marginTop: '42px' })}><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/list_orange.png" /> 해외배송</div>
            <div className="deli_text" style={({ marginTop: '42px' })}>배송기간 및 비용은 각 국의 배송료 정책, 상품의 중량, 거리에 따라 상이할 수 있습니다.<br />해외배송을 원하시는 경우 고객센터로 문의해주시면 담당자가 직접 안내 드리겠습니다.</div>
          </div>
        </div>
        <div className="variaty_pay" style={({ marginBottom: '120px' })}>
          <div className="variaty_pay_title">다양한 결제 시스템</div>
          <div>
            <div className="pay_list"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/list_orange.png" /> 국내결제</div>
            <div className="pay_text">무통장입금, 신용카드 결제 가능</div>
            <div className="pay_list" style={({ marginTop: 0 })}><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/list_orange.png" /> 해외결제</div>
            <div className="pay_text" style={({ marginTop: 0 })}>글로벌 신용카드 (VISA, MasterCard, JCB) 결제 가능<br />알리페이, 텐페이, 유니온페이, 페이팔 결제 가능</div>
          </div>
        </div>

        <ul className="title_box" id="customer_center">
          <li className="title" style={({ width: '393px' })}>
            고객지원 센터
          </li>

          <li className="sub_title" style={({ width: '807px' })}>
            <span className="title_line">I</span>&nbsp;&nbsp;&nbsp;&nbsp;언제나 고객님 의견에 귀 기울이는 링크샵스 고객지원 서비스
          </li>
        </ul>
        <div className="cs_info">
          <div className="cs_info_title">고객센터 운영 정보</div>
          <div className="cs_info_box">
            <div className="cs_info_list"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/list_orange.png" /> 운영시간(한국 기준)</div>
            <div className="cs_info_text"><span className="color777">평일 오전 10시 ~ 오후 6시<br />점심 오후 12시 30분 ~ 1시 30분<br /></span><span className="color999">( 주말 및 공휴일 제외 )</span></div>
            <div className="cs_info_list" style={({ marginTop: 0 })}><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/list_orange.png" /> 문의</div>
            <div className="cs_info_text" style={({ marginTop: 0 })}>
              <div className="cs_icon_box">
                <div className="cs_icon"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/email_icon.png" /></div>
                <div className="cs_icon"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/kakao_icon.png" /></div>
                <div className="cs_icon"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/kakao_icon.png" /></div>
                <div className="cs_icon"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/wechat_icon.png" /></div>
              </div>
              <div className="cs_text_box">
                <div className="cs_text">이메일 <span>cs@linkshops.com</span></div>
                <div className="cs_text">카카오톡 구매회원 <span>linkshops</span></div>
                <div className="cs_text">카카오톡 판매회원 <span>linkshops_brand</span></div>
                <div className="cs_text">WeChat <span>linkshops-china</span></div>
              </div>
            </div>
          </div>
          <div className="linkshops_cs">
            <img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/linkshops_cs_icon.png" />
          </div>
        </div>

        <div className="faq">
          <div className="faq_title">FAQ</div>
          <div className="faq_box">
            <div className="faq_list"><img src="//d3f03u7lex6hmc.cloudfront.net/front/resource/banner/site_keywords/list_orange.png" /> 자주 묻는 질문들 <span>자주 질문하시는 내용들을 모았습니다.</span></div>
            <div className="faq_cont01">
              <div className="faq_01"><span>Q.</span>결제 수단으로 어떤것이 있나요?</div>
              <div className="Answer_01">
                <div className="A">
                  <strong>A.</strong>
                </div>
                <div>
                  무통장 입금, 실시간 계좌 이체, 신용카드 결제, 페이팔,<br />
                  알리페이, 텐페이, China Union Pay로 결제 가능합니다.
                </div>
              </div>
            </div>
            <div className="faq_cont02">
              <div className="faq_02"><span>Q.</span>배송 기간은 얼마나 소요되나요?</div>
              <div className="Answer_02">
                <div className="A">
                  <strong>A.</strong>
                </div>
                <div>
                  국내배송의 경우 주문확인 후 영업일 기준 약 3~5일,<br />
                  해외배송의 경우 지역에 따라 다르나 주문확인 후 영업일 기준 약 3~6일 소요됩니다.<br />
                  배송기간은 주말 및 공휴일 제외, 배송국가 및 지역, 천재지변에 따라 기간이 다를 수 있습니다.
                </div>
              </div>
            </div>
            <div className="faq_cont03">
              <div className="faq_03"><span>Q.</span>세금 계산서 신청 가능한가요?</div>
              <div className="Answer_03">
                <div className="A">
                  <strong>A.</strong>
                </div>
                <div>
                  링크샵스에서 현금으로 거래하신 주문은 모두 회원가입시<br />
                  등록한 사업자등록증 번호로 세금계산서가 자동 발행됩니다.<br />
                  신용카드로 결제하신 주문의 경우 세금계산서가 발행되지 않습니다.<br />
                  그 밖의 궁금하신 내용은 고객센터로 문의해 주시면 상세히 안내해 드리도록 하겠습니다.
                </div>
              </div>
            </div>
            <div className="faq_cont04">
              <div className="faq_04"><span>Q.</span>링크샵스에 업로드되지 않은 상품도 구입할 수 있나요?</div>
              <div className="Answer_04">
                <div className="A">
                  <strong>A.</strong>
                </div>
                <div>
                  구매를 원하시는 업체가 있다면 언제든지 고객센터로 문의해주세요.<br />
                  영업일 기준 14일 이내 해당 업체 신상품을 촬영 완료하여 사이트에 업로드 하고 있습니다.<br />
                  단, 링크샵스 홈페이지 등록상가 내에서 요청이 가능한 점 양해 부탁드립니다.

                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={({ clear: 'both' })}></div>
      </div>
    );
    /*
    const sections = [
      { id: 'intro', title: '서비스 안내', subTitle: '| 온라인 도매시장의 새로운 기준 링크샵스', width: 936, height: 1078, img: `${constants.resourceRoot}/banner/service-info-why.jpg` }, // eslint-disable-line
      { id: 'signup', title: '회원가입 안내', subTitle: '| 고객과 함께 성장하는 파트너', width: 1061, height: 1076, img: `${constants.resourceRoot}/banner/service-info-signup.jpg` }, // eslint-disable-line
      { id: 'ship_pay', title: '배송결제 안내', subTitle: '| 편리하고 안전한 배송결제 시스템', width: 894, height: 882, img: `${constants.resourceRoot}/banner/service-info-shipping.jpg` }, // eslint-disable-line
      { id: 'customer_center', title: '고객지원 센터', subTitle: '| 언제나 고개님 의견에 귀 기울이는 링크샵스 고객지원 서비스', width: 827, height: 818, img: `${constants.resourceRoot}/banner/service-info-customer.jpg` }, // eslint-disable-line
    ];
    // 2016. 04. 20. [heekyu] use height for calc section offet before img load
    const renderSection = (section) => (
      <div id={section.id} key={section.id} className="section">
        <div className="title">
          <strong>{section.title}</strong>
          <span>{section.subTitle}</span>
        </div>
        <div className="content">
          <img width={section.width} height={section.height} src={section.img} />
        </div>
      </div>
    );
    return (
      <div className="service-info-container">
        {sections.map(renderSection)}
      </div>
    );
    */
  },
});
