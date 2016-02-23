// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    handleSignup: PropTypes.func.isRequired,
  },
  // only used when two-way binding is used. form input is that case
  getInitialState() {
    return {};
  },
  render() {
    const { handleSignup } = this.props;
    const renderHeader = () => {
      return (
        <div className="signup-header">
          <div className="signup-step-wrap active">
            <div className="step-number">1</div>
            <span>Informations</span>
          </div>
          <div className="signup-step-wrap">
            <div className="step-number">V</div>
            <span>Completes</span>
          </div>
        </div>
      );
    };
    const renderBody = () => {
      const clickSignup = () => {
        const user = _.pick(this.state, ['email', 'password', 'passwordConfirm']);
        handleSignup(user);
      };
      return (
        <div className="signup-form-body">
          <div className="form-group">
            <div className="field-label">Email <span className="required"> * </span></div>
            <input type="email" placeholder="enter email"
                   value={this.state.email}
                   onChange={(e) => this.setState({ email: e.target.value })} />
          </div>
          <div className="form-group">
            <div className="field-label">Password <span className="required"> * </span></div>
            <input type="password" placeholder="password"
                   value={this.state.password}
                   onChange={(e) => this.setState({ password: e.target.value })} />
          </div>
          <div className="form-group">
            <div className="field-label">Password Confirm <span className="required"> * </span></div>
            <input type="password" placeholder="password(again)"
                   value={this.state.passwordConfirm}
                   onChange={(e) => this.setState({ passwordConfirm: e.target.value })} />
          </div>
          <button className="next-button" onClick={clickSignup}>Next</button>
        </div>
      );
    };
    return (
      <div>
        {renderHeader()}
        {renderBody()}
      </div>
    );
  },
});
