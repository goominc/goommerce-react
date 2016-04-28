// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { Link } from 'react-router';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  render() {
    return (
      <div className="container">
        <Link to="/" className="signin-title">
          <img className="logo-img" src={`${constants.resourceRoot}/extra/01_linkshops_logo.png`} />
        </Link>
        <input className="signin-input" type="text" placeholder="아이디(이메일)" />
        <button className="signin-button">비밀번호 찾기</button>
      </div>
    );
  },
});
