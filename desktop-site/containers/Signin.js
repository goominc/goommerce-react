import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import SigninHeader from 'components/user/SigninHeader';
import SigninForm from 'components/user/SigninForm';

import { ApiAction } from 'redux/actions';
const { login } = ApiAction;

const Signin = React.createClass({
  propTypes: {
    login: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {};
  },
  handleSubmit(email, password) {
    this.props.login(email, password).then(
      () => this.context.router.push('/'),
      () => alert('Invalid username/password.') // eslint-disable-line no-alert
    );
  },
  render: function render() {
    const goForgotPassword = () => {
      this.context.router.push('/accounts/forgot');
    };
    return (
      <div className="container">
        <SigninHeader />
        <div className="signin-content-container">
          <div className="banner-title">The Best Value Online</div>
          <div className="banner-text">Enjoy unbeatable prices and free shipping <br />
            on almost all products!
          </div>
          <div className="signin-form-box">
            <SigninForm handleSubmit={this.handleSubmit} goForgotPassword={goForgotPassword} />
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
