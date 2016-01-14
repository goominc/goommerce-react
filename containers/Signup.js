import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { History } from 'react-router';

import { signup } from '../redux/actions';

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
      data: this.state,
    }).then(
      () => this.history(null, '/'),
      err => alert(err.message)
    );
  },
  render: function render() {
    return (
      <form className="form-signup" onSubmit={this.handleSubmit}>
        <h2 className="form-signup-heading">Please sign up</h2>
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
        <label htmlFor="inputTel" className="sr-only">Tel</label>
        <input
          id="inputTel"
          className="form-control"
          placeholder="Tel"
          required
          valueLink={this.linkState('tel')}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
      </form>
    );
  },
});

export default connect(
  undefined,
  { signup }
)(Signup);
