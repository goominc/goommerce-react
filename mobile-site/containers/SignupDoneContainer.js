// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { connect } from 'react-redux';

import SignupDone from 'components/user/SignupDone';

const SignupDoneContiner = React.createClass({
  render() {
    return (
      <SignupDone {...this.props} />
    );
  },
});

export default connect(
  (state) => {
    return { auth: state.auth };
  }
)(SignupDoneContiner);
