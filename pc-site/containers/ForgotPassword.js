import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import SigninHeader from '../components/user/SigninHeader';

import { ApiAction } from '../redux/actions';
const { forgotPassword } = ApiAction;

const ForgotPassword = React.createClass({
  propTypes: {
    forgotPassword: PropTypes.func.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {
      resetBaseUrl: window.location.href.slice(0, -6) + 'reset',
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.forgotPassword(this.state).then(res => alert(res.message));
  },
  render: function render() {
    return (
      <div className="container">
        <SigninHeader />
        <div className="signin-content-container">
          <div className="banner-title">Smart shopping</div>
          <div className="banner-text">Fashion Leader!
          </div>
          <div className="signin-form-box">
            <form onSubmit={this.handleSubmit}>
              <h2>Please enter your email</h2>
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
                valueLink={this.linkState('email')}
              />
              <Link to="/accounts/signin">Sign in?</Link>
              <Link to="/accounts/signup">Sign up?</Link>
              <button className="btn-signin" type="submit">Forgot Password</button>
            </form>
          </div>
        </div>
      </div>
    );
  },
});

export default connect(
  undefined,
  { forgotPassword }
)(ForgotPassword);
