// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import i18n from 'commons/utils/i18n';

import SigninHeader from 'components/user/SigninHeader';
import SigninForm from 'components/user/SigninForm';
import SignupFooter from 'components/user/SignupFooter';

import { ApiAction } from 'redux/actions';
const { login } = ApiAction;

const Signin = React.createClass({
  propTypes: {
    login: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return {};
  },
  handleSubmit(email, password, rememberMe) {
    this.props.login({ email, password, rememberMe }, this.context.router);
  },
  render: function render() {
    const goForgotPassword = () => {
      this.context.router.push('/accounts/forgot');
    };
    return (
      <div className="signup-global-container">
        <SigninHeader />
        <div className="signup-container">
          <div className="desc1">{i18n.get('pcMain.modalLogin.onlyRetailerLinkshopsService')}</div>
          <div className="desc2">{i18n.get('pcMain.modalLogin.ifYouWantToUseFurtherService')}</div>
          <div className="signin-form-box">
            <SigninForm handleSubmit={this.handleSubmit} goForgotPassword={goForgotPassword} />
          </div>
          <SignupFooter />
        </div>
      </div>
    );
  },
});

export default connect(
  undefined,
  { login }
)(Signin);
