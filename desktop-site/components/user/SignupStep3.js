// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import { constants } from 'commons/utils/constants';
import stringUtil from 'commons/utils/stringUtil';
import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    activeLocale: PropTypes.string,
    auth: PropTypes.object,
    goNext: PropTypes.func,
  },
  render() {
    const { auth, goNext, activeLocale } = this.props;
    const renderZhCn = () => {
      return (
        <div className="signup-container">
          <img className="signup-progress-img" src={this.props.signupProgressImg} />
          <div className="signup-greeting">
            <div className="title">
              <b>{stringUtil.getUserName(auth)},<br /></b>
              恭喜您已经成功加入<b>Linkshops</b>的会员！
            </div>
            <div className="description">
              在24个小时之内，进行会员审核并通知结果。<br />
              通知结果发到您申请时提交的邮箱 <b>{auth.email}</b><br />
              对于账号申请步骤，若有任何疑问，请随时与我么客服中心联络。<br />
              客服联系方式如下：<br />
            </div>
          </div>
          <img className="signup-contact-img" src={`${constants.resourceRoot}/main/signup-done-zh-cn.png`} />
          <div className="button-line">
            <button onClick={goNext} className="button-next">{i18n.get('pcMain.signup.goHome')}</button>
          </div>
        </div>
      );
    };
    const renderZhTw = () => {
      return (
        <div className="signup-container">
          <img className="signup-progress-img" src={this.props.signupProgressImg} />
          <div className="signup-greeting">
            <div className="title">
              <b>{stringUtil.getUserName(auth)},<br /></b>
              恭喜您已經成功加入<b>Linkshop</b>s的會員！
            </div>
            <div className="description">
              在24個小時之內，進行會員審核并通知結果。<br />
              通知結果發到你申請時提交的郵箱 <b>{auth.email}</b><br />
              對於賬號申請步驟，若有其他任何疑問，請隨時與我們客服中心聯絡。<br />
              客服聯繫方式如下：<br />
            </div>
          </div>
          <img className="signup-contact-img" src={`${constants.resourceRoot}/main/signup-done-zh-cn.png`} />
          <div className="button-line">
            <button onClick={goNext} className="button-next">{i18n.get('pcMain.signup.goHome')}</button>
          </div>
        </div>
      );
    };
    if (activeLocale === 'zh-cn') {
      return renderZhCn();
    } else if (activeLocale === 'zh-tw') {
      return renderZhTw();
    }
    return (
      <div className="signup-container">
        <img className="signup-progress-img" src={this.props.signupProgressImg} />
        <div className="signup-greeting">
          <div className="title">
            <b>{stringUtil.getUserName(auth)}</b> 님 가입을 환영합니다!
          </div>
          <div className="description">
            구매회원 승인 절차를 위해 약 <b>24시간</b> 정도 소요될 예정입니다.<br />
            승인여부에 대한 안내는 가입시 입력하신 이메일<br />
            <b>{auth.email}</b> 로 전달 드릴 예정입니다.<br />
            기타 가입 절차에 대한 문의는 아래 연락처로 문의해주시기 바랍니다.<br />
          </div>
        </div>
        <img
          className="signup-contact-img"
          width="173"
          src={`${constants.resourceRoot}/main/signup-contact_20160509_2.png`}
        />
        <div className="button-line">
          <button onClick={goNext} className="button-next">{i18n.get('pcMain.signup.goHome')}</button>
        </div>
      </div>
    );
  },
});
