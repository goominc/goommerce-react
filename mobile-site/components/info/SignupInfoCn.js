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
            <p className="top_banner_1"><span className="keycolor">为批发采购专用平台</span></p>
            <p className="top_banner_2">账号注册请参照如下步骤</p>
          </div>
        </div>

        <div className="signinup_info">
          <div className="signup_list">
            <div className="signup_img">
              <img src={`${constants.resourceRoot}/mobile/serviceinfo/signup_buyer_cn_01_20160615.png`} />
            </div>
            <div className="signup_text">
              <p className="signup_title"><span className="keycolor">01. 账号注册申请</span></p>
              <p className="signup_desc">账号注册申请是免费的</p>
              <p className="signup_desc">为了保护设计著作权，并且避免个人消费者的混乱注册，请填写您的企业信息，并附上您的营业执照</p>
              <p className="signup_desc">若您还没有营业执照，建议您在注册时按实际情况填写相关信息</p>
            </div>
          </div>
          <div className="signup_list">
            <div className="signup_img">
              <img src={`${constants.resourceRoot}/mobile/serviceinfo/signup_buyer_cn_02_20160615.png`} /></div>
            <div className="signup_text">
              <p className="signup_title"><span className="keycolor">02. 企业信息审核</span></p>
              <p className="signup_desc">客服中心按照您在注册时提交的企业信 息审核与实际情况是否相符</p>
              <p className="sognup_desc">若您营业执照上的营业范围与Linkshops 无关，会被拒绝开通</p>
            </div>
          </div>
          <div className="signup_list">
            <div className="signup_img">
              <img src={`${constants.resourceRoot}/mobile/serviceinfo/signup_buyer_cn_03_20160615.png`} /></div>
            <div className="signup_text">
              <p className="signup_title"><span className="keycolor">03. 账号注册完成 </span></p>
              <p className="signup_desc">审核完毕后，客服中心通知您审核结果， 若没有问题，您可以使用 Linkshops的所 有服务</p>
            </div>
          </div>
        </div>
        <div className="buyer_sign_button" onClick={() => this.context.router.push('/accounts/signup')}>买家会员点此直接注册
        </div>
      </div>
    );
  },
});
