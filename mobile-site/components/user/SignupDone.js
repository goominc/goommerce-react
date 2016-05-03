// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
  },
  render() {
    const { auth } = this.props;
    let name = auth.name;
    if (!name) {
      if (_.get(auth, 'data.lastName')) {
        name = `${_.get(auth, 'data.lastName')}${_.get(auth, 'data.firstName') || ''}`;
      } else {
        let end = auth.email.indexOf('@');
        if (end < 1) {
          end = auth.email.length;
        }
        name = auth.email.substring(0, end);
      }
    }
    return (
      <div>
        <div className="signup-done-body">
          <div className="title">{name}님</div>
          <div className="hello">LinkShops 가입을 환영합니다.</div>
          <p>
            바이어 승인 절차를 위해 약 24시간 정도<br />
            소요될 예정입니다.
          </p>
          <p>
            승인 여부에 대한 안내는 가입시 입력하신 이메일<br />
            <strong>{auth.email}</strong><br />
            으로 전달드릴 예정입니다.
          </p>
        </div>
        <div className="signup-done-contact">
          <h3>가입절차 문의</h3>
          <p>카카오톡 ID : linkshops_brand</p>
          <p>이메일 : <a href="mailto:cs@linkshops.com">cs@linkshops.com</a></p>
          <p>고객센터 : 02-2272-1122</p>
          <Link to="/" className="signin-button go-home">홈으로 가기</Link>
        </div>
      </div>
    );
  },
});
