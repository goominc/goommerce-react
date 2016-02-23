import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History, Link } from 'react-router';

import SigninHeader from '../components/SigninHeader';
import SignupPage from '../components/SignupPage';

import { ApiAction } from '../redux/actions';
const { signup } = ApiAction;

const Signup = React.createClass({
  propTypes: {
    signup: PropTypes.func.isRequired,
  },
  mixins: [History],
  handleSubmit(newUser) {
    const { email, password, passwordConfirm } = newUser;
    // 2016. 02. 23. [heekyu] interactive
    if (!password || password === '') {
      window.alert('type password');
      return;
    }
    if (password !== passwordConfirm) {
      window.alert('password mismatch');
      return;
    }
    this.props.signup({
      email,
      password,
    }).then(
      () => this.history.pushState(null, '/'),
      err => alert(err.message)
    );
  },
  render: function render() {
    return (
      <div className="container">
        <SigninHeader />
        <SignupPage handleSignup={this.handleSubmit} />
      </div>
    );
  },
});

export default connect(
  undefined,
  { signup }
)(Signup);
