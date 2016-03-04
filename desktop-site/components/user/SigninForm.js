// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    handleSubmit: PropTypes.func.isRequired,
    goForgotPassword: PropTypes.func.isRequired,
  },
  render() {
    const { handleSubmit, goForgotPassword } = this.props;
    const onSubmit = (e) => {
      e.preventDefault();
      handleSubmit(this.refs.email.value, this.refs.password.value);
    };
    return (
      <form onSubmit={onSubmit}>
        <h2>Please log in</h2>
        <label htmlFor="inputEmail">Email address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          ref="email"
        />
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          ref="password"
        />
        <a onClick={goForgotPassword}>forgot password?</a>
        <div className="remember-me">
          <input type="checkbox" value="remember-me"/> Remember me
        </div>
        <button className="btn-signin" type="submit">Sign in</button>
      </form>
    );
  },
});
