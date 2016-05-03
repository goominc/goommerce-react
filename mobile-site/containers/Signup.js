// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import SignupForm from 'components/user/SignupForm';

import { ApiAction, updateSignupUser, clearSignupUser } from 'redux/actions';
const { signup } = ApiAction;

const Signup = React.createClass({
  propTypes: {
    signup: PropTypes.func,
    clearSignupUser: PropTypes.func,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  render() {
    const handleSubmit = (user) => {
      const { email, password, name, data, passwordConfirm } = user;
      // 2016. 02. 23. [heekyu] interactive
      if (!password) {
        alert('type password'); // eslint-disable-line no-alert
        return;
      }
      if (password !== passwordConfirm) {
        alert('password mismatch'); // eslint-disable-line no-alert
        return;
      }
      this.props.signup({
        email,
        password,
        data,
        name,
      }).then(
        () => {
          this.props.clearSignupUser();
          this.context.router.push('/accounts/signup/done');
        }
      );
    };
    return (
      <SignupForm {...this.props} handleSubmit={handleSubmit} />
    );
  },
});

export default connect(
  (state) => ({
    signupUser: _.get(state, 'pageSignup.user'),
  }),
  { signup, updateSignupUser, clearSignupUser },
)(Signup);
