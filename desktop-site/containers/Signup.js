import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SigninHeader from 'components/user/SigninHeader';
import SignupPage from 'components/user/SignupPage';

import { ApiAction } from 'redux/actions';
const { signup } = ApiAction;

const Signup = React.createClass({
  propTypes: {
    signup: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  handleSubmit(newUser) {
    const { email, password, passwordConfirm } = newUser;
    // 2016. 02. 23. [heekyu] interactive
    if (!password || password === '') {
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
    }).then(
      () => this.context.router.push('/'),
      (err) => alert(err.message) // eslint-disable-line no-alert
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
