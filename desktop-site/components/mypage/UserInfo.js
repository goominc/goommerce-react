// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import InputPersonalInfo from 'components/user/InputPersonalInfo';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object,
  },
  render() {
    const { auth } = this.props;
    if (!auth || !auth.id) {
      return null;
    }
    return (
      <div className="user-info-container">
        <div className="signup-form-section">
          <div className="title">아이디 / 비밀번호</div>
          <div className="row">
            <div className="label">아이디</div>
            <div className="control">
              <input type="text" value={auth.email} readOnly />
            </div>
          </div>
        </div>
        <InputPersonalInfo auth={auth} {...this.props} />
      </div>
    );
  },
});
