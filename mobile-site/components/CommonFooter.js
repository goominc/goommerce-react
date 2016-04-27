import React from 'react';

export default React.createClass({
  render() {
    return (
      <footer className="gm-footer">
        <div className="footer-linkshops">
          <div className="footer-info-box">
            <div className="info-gray">
              상호명 - ㈜ 에이프릴<br />
              대표자 - 서경미<br />
              주소 - 서울시 중구 퇴계로 324 성우빌딩 6층<br />
              사업자등록번호 - 201-86-27310<br />
              통신판매업신고 - 서울중구 60887호<br />
              개인정보관리책임자 - 오영지
            </div>
            <div className="info-black">
              <div className="info-title">고객센터 안내</div>
              평일 - 오전 10:00 ~ 오후 18:00<br />
              점심시간 - 오전 12:30 ~ 오후 13:30<br />
              주말, 공휴일 제외(한국기준)<br /><br />
              Tel - 02-2272-1122<br />
              Fax - 02-2233-5911<br />
              E-mail - cs@linkshops.com<br />
              구매회원 상담 카카오톡 ID - linkshops<br />
              판매회원 상담 카카오톡 ID - linkshops_brand<br />
            </div>
          </div>

          <p className="footer-copyright">
            ©2015 LINKSHOPS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    );
  },
});
