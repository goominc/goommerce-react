import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import { ApiAction } from '../redux/actions';
const { resetPassword } = ApiAction;

const ResetPassword = React.createClass({
  propTypes: {
    access_token: PropTypes.string.isRequired,
    resetPassword: PropTypes.func.isRequired,
  },
  mixins: [History, LinkedStateMixin],
  getInitialState() {
    return {};
  },
  handleSubmit(e) {
    e.preventDefault();
    const { access_token } = this.props;
    const { password } = this.state;
    this.props.resetPassword({
      access_token,
      password,
    }).then(() => this.history.pushState(null, '/'));
  },
  render: function render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Please enter your email</h2>
        <label htmlFor="inputPassword" className="sr-only">Email address</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          autoFocus
          valueLink={this.linkState('password')}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Reset Password</button>
      </form>
    );
  },
});

export default connect(
  (state, ownProps) => ({ access_token: ownProps.location.query.access_token }),
  { resetPassword }
)(ResetPassword);
