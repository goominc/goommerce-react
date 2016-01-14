import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { History } from 'react-router';

import { login } from '../redux/actions';

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
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h2 className="form-signin-heading">Please sign in</h2>
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
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          valueLink={this.linkState('password')}
        />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    );
  },
});

export default connect(
  undefined,
  { login }
)(Signin);
