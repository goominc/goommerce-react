// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  contextTypes: {
    router: PropTypes.object,
  },
  render() {
    return (
      <div className="mobile-signup-info-container-cn">
        <div className="wrap_sign_up_intro">
          <div className="sign_up_intro_top_banner">
            <div className="top_banner_img">
              <img className="logo_img" src={`${constants.resourceRoot}/mobile/main/mobile_linkshops_logo.png`} />
            </div>
            <p className="top_banner_1"><span className="keycolor">為批發採購專用平台</span></p>
            <p className="top_banner_2">賬戶註冊請參照如下步驟</p>
          </div>
        </div>

        <div className="signinup_info">
          <div className="signup_list">
            <div className="signup_img">
              <img src={`${constants.resourceRoot}/mobile/serviceinfo/signup_buyer_cn_01_20160615.png`} />
            </div>
            <div className="signup_text">
              <p className="signup_title"><span className="keycolor">01. 賬號註冊申請</span></p>
              <p className="signup_desc">賬號註冊申請是免費的</p>
              <p className="signup_desc">為了保護設計著作權, 並且避免個人消,
                費者的混亂註冊，請填寫您的企業信息,
                並附上您的營業執照。</p>
              <p className="signup_desc">若您還沒有營業執照, 建議您在註冊時
                按實際情況填寫相關信息。</p>
            </div>
          </div>
          <div className="signup_list">
            <div className="signup_img">
              <img src={`${constants.resourceRoot}/mobile/serviceinfo/signup_buyer_cn_02_20160615.png`} /></div>
            <div className="signup_text">
              <p className="signup_title"><span className="keycolor">02. 企業信息審核</span></p>
              <p className="signup_desc">客服中心按照您在註冊時提交的企業
                信息審核與實際情況是否相符</p>
              <p className="sognup_desc">若您營業執照上的營業範圍與Linkshops無關,
                會被拒絕開通</p>
            </div>
          </div>
          <div className="signup_list">
            <div className="signup_img">
              <img src={`${constants.resourceRoot}/mobile/serviceinfo/signup_buyer_cn_03_20160615.png`} /></div>
            <div className="signup_text">
              <p className="signup_title"><span className="keycolor">03. 賬號註冊完成</span></p>
              <p className="signup_desc">審核完畢後, 客服中心通知您審核結果,
                若沒有問題, 您可以使用
                Linkshops的所有服務</p>
            </div>
          </div>
        </div>
        <div className="buyer_sign_button" onClick={() => this.context.router.push('/accounts/signup')}>買家會員點此直接註冊
        </div>
      </div>
    );
  },
});
