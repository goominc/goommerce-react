import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import SigninHeader from 'components/user/SigninHeader';
import SignupFooter from 'components/user/SignupFooter';

import { ApiAction } from 'redux/actions';
const { forgotPassword } = ApiAction;

const ForgotPassword = React.createClass({
  propTypes: {
    forgotPassword: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {
      resetBaseUrl: `${window.location.href.slice(0, -6)}reset`,
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    // this.props.forgotPassword(this.state).then((res) => alert(res.message)); // eslint-disable-line no-alert
    this.props.forgotPassword(this.state).then(() => {
      alert('비밀번호 변경을 위해 이메일을 확인해 주세요');
      this.context.router.push('/');
    }, () => {
      window.alert('failed to request reset email');
      $('.btn-signin').attr('disabled', false);
    }); // eslint-disable-line no-alert
  },
  render: function render() {
    return (
      <div className="signup-global-container">
        <SigninHeader />
        <div className="signup-container">
          <div className="signin-form-box">
            <form onSubmit={this.handleSubmit}>
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="아이디(이메일 주소)"
                required
                autoFocus
                valueLink={this.linkState('email')}
              />
              <Link to="/accounts/signin">로그인</Link>
              <Link to="/accounts/signup">회원가입</Link>
              <button className="btn-signin" type="submit">비밀번호 찾기</button>
            </form>
          </div>
          <SignupFooter />
        </div>
      </div>
    );
  },
});

export default connect(
  undefined,
  { forgotPassword }
)(ForgotPassword);
