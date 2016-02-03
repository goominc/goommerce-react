import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { History, Link } from 'react-router';

import SigninHeader from '../components/SigninHeader';

import { ApiAction } from '../redux/actions';
const { login } = ApiAction;

const Signin = React.createClass({
  propTypes: {
    login: PropTypes.func.isRequired,
  },
  mixins: [LinkedStateMixin, History],
  getInitialState() {
    return {};
  },
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password).then(
      () => this.history.pushState(null, '/'),
      () => alert('Invalid username/password.')
    );
  },
  render: function render() {
    return (
      <div className="container">
        <SigninHeader />
        <div className="signin-content-container">
          <div className="banner-title">The Best Value Online</div>
          <div className="banner-text">Enjoy unbeatable prices and free shipping <br/>
            on almost all products!
          </div>
          <div className="signin-form-box">
            <form onSubmit={this.handleSubmit}>
              <h2>Please log in</h2>
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
              <div className="remember-me">
                <input type="checkbox" value="remember-me"/> Remember me
              </div>
              <button className="btn-signin" type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    );
  },
});

export default connect(
  undefined,
  { login }
)(Signin);
