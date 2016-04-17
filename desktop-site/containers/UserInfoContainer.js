// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { connect } from 'react-redux';

import UserInfo from 'components/mypage/UserInfo';

const UserInfoContainer = React.createClass({
  render() {
    const onChange = (e, key) => {
      console.log(key)
    };
    return (
      <UserInfo {...this.props} onChange={onChange} />
    );
  },
});

export default connect(
  (state) => ({ auth: state.auth })
)(UserInfoContainer);
