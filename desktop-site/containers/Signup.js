import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import App from 'containers/App'
import SigninHeader from 'components/user/SigninHeader';
import SignupPage from 'components/user/SignupPage';
import SignupStep1 from 'components/user/SignupStep1';
import SignupStep3 from 'components/user/SignupStep3';

import { ApiAction } from 'redux/actions';
const { signup } = ApiAction;

const Signup = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    signup: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return { step: 2 };
  },
  handleSubmit(newUser) {
    const { email, password, name, data, passwordConfirm } = newUser;
    // 2016. 02. 23. [heekyu] interactive
    if (!password) {
      alert('type password'); // eslint-disable-line no-alert
      return;
    }
    if (password !== passwordConfirm) {
      alert('password mismatch'); // eslint-disable-line no-alert
      return;
    }
    this.props.signup({
      email,
      password,
      data,
      name,
    }).then(
      () => this.setState({ step: 3 }),
      (err) => alert(err) // eslint-disable-line no-alert
    );
  },
  render() {
    const step1Back = () => console.log('where to go?');
    const step1Next = (flags) => {
      const keys = Object.keys(flags);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!flags[key].value) {
          window.alert(flags[key].errorMessage);
          return;
        }
      }
      this.setState({ step: 2 });
    };
    const step2Back = () => {
      this.setState({ step: 1 });
    };
    const renderStep = () => {
      if (this.state.step === 2) {
        return (<SignupPage goBack={step2Back} handleSignup={this.handleSubmit} />);
      } else if (this.state.step === 3) {
        return (<SignupStep3 auth={this.props.auth} goNext={() => this.context.router.push('/')} />);
      }
      return (<SignupStep1 goBack={step1Back} goNext={step1Next} />);
    };
    return (
      <div className="signup-global-container">
        <SigninHeader />
        {renderStep()}
      </div>
    );
  },
});

export default connect(
  (state) => ({ auth: state.auth, error: state.errorHandler.error }),
  { signup }
)(Signup);
