import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import { ApiAction } from 'redux/actions';
const { resetPassword } = ApiAction;

import SigninHeader from 'components/user/SigninHeader';
import SignupFooter from 'components/user/SignupFooter';

const ResetPassword = React.createClass({
  propTypes: {
    access_token: PropTypes.string.isRequired,
    resetPassword: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {};
  },
  handleSubmit(e) {
    e.preventDefault();
    const { access_token } = this.props;
    const password = this.state.password;
    if (!password) {
      window.alert('비밀번호를 입력하세요');
      return;
    }
    if (password !== this.state.passwordRe) {
      window.alert('비밀번호가 일치하지 않습니다');
      return;
    }
    this.props.resetPassword({
      access_token,
      password,
    }).then(() => {
      window.alert('비밀번호가 변경되었습니다. 로그인해 주세요');
      this.context.router.push('/accounts/signin');
    });
  },
  render: function render() {
    const renderWarning = () => {
      if (this.state.password && this.state.password !== this.state.passwordRe) {
        return (<div className="form-input-warning">비밀번호가 일치해야 합니다</div>);
      }
      return null;
    };
    return (
      <div className="signup-global-container">
        <SigninHeader />
        <div className="signup-container">
          <div className="signin-form-box">
            <form onSubmit={this.handleSubmit}>
              <input
                type="password"
                className="form-control"
                placeholder="비밀번호"
                required
                autoFocus
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <input
                type="password"
                className="form-control"
                placeholder="비밀번호 재입력"
                required
                onChange={(e) => this.setState({ passwordRe: e.target.value })}
                style={({ margin: 0 })}
              />
              {renderWarning()}
              <button className="btn-signin" type="submit">비밀번호 변경</button>
              <Link to="/accounts/signin">로그인</Link>
              <Link to="/accounts/signup">회원가입</Link>
              <Link to="/accounts/forgot">비밀번호 찾기</Link>
            </form>
          </div>
          <SignupFooter />
        </div>
      </div>
    );
    /*
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
    */
  },
});

export default connect(
  (state, ownProps) => ({ access_token: ownProps.location.query.access_token }),
  { resetPassword }
)(ResetPassword);
