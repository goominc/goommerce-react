import React from 'react';
import { Link } from 'react-router';
import { constants } from 'commons/utils/constants';

export default React.createClass({
  render() {
    return (
      <footer className="gm-footer">
        <div className="footer-linkshops">
          <div className="footer-info-box">
            <div className="info-box">
              <div className="info-title">
                ㈜ 에이프릴
              </div>
              <div className="info-content">
                대표자 서경미 <br />
                서울시 중구 퇴계로 324 성우빌딩 6층 <br />
                사업자등록번호<br /> 201-86-27310 <br />
                통신판매업신고<br /> 서울중구 60887호 <br />
              </div>
            </div>
            <div className="info-box">
              <div className="info-title">
              </div>
              <div className="info-content">
                Tel. 02-2272-1121 <br />
                Fax. 02-2233-5911 <br />
                E-mail <br /> <a href="mailto:cs@linkshops.com">cs@linkshops.com</a> <br />
                개인정보관리책임자<br />오영지 <br />
              </div>
            </div>
            <div className="info-box">
              <div className="info-title">
                고객센터 운영시간
              </div>
              <div className="info-content">
                평일 오전 10시 ~ 오후 6시 (한국 기준) <br />
                점심 오후 12시 30분 ~ 오후 1시 30분 <br />
                주말 및 공휴일 제외 <br />
              </div>
            </div>
            <div className="info-box">
              <div className="info-title">
                <img src={`${constants.resourceRoot}/footer/logo_kakao.png`} />
              </div>
              <div className="info-content">
                바이어 상담 카카오톡linkshops <br />
                브랜드 상담 카카오톡linkshops_brand <br />
              </div>
            </div>
          </div>

          <p className="footer-copyright">
            APRIL INC. © 2016 <Link to="/" className="text-link">LINKSHOPS.COM</Link>. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    );
  },
});
