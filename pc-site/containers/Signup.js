import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { History, Link } from 'react-router';

import { signup } from '../redux/actions';

import SigninHeader from '../components/SigninHeader';

const Signup = React.createClass({
  propTypes: {
    signup: PropTypes.func.isRequired,
  },
  mixins: [LinkedStateMixin, History],
  getInitialState() {
    return {};
  },
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
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
        <div className="signin-content-container">
          <div className="banner-title">Living together</div>
          <div className="banner-text">We are a one!
          </div>
          <div className="signin-form-box">
            <form onSubmit={this.handleSubmit}>
              <h2>Please sign up</h2>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
                valueLink={this.linkState('email')}
              />
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required
                valueLink={this.linkState('password')}
              />
              <Link to="/accounts/forgot">forgot password?</Link>
              <button className="btn-signin" type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  },
});

export default connect(
  undefined,
  { signup }
)(Signup);
