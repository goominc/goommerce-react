import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import { forgotPassword } from '../redux/actions';

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
      <form onSubmit={this.handleSubmit}>
        <h2>Please enter your email</h2>
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
        <button className="btn btn-lg btn-primary btn-block" type="submit">Forgot Password</button>
      </form>
    );
  },
});

export default connect(
  undefined,
  { forgotPassword }
)(ForgotPassword);
