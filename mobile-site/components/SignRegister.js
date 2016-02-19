import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

export default React.createClass({
  propTypes: {
    show: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired,
    toggleSignin: PropTypes.func.isRequired,
    toggleRegister: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  },
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {};
  },
  handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  },
  handleRegister(e) {
    e.preventDefault();
    const { emailNew, passwordNew } = this.state;
    this.props.register({
      email: emailNew,
      password: passwordNew,
    });
  },
  _hide() {
    this.props.hide();
  },
  _toggleSignin() {
    this.props.toggleSignin();
  },
  _toggleRegister() {
    this.props.toggleRegister();
  },
  render() {
    const { show } = this.props;
    let mainStyle = {
      top: '100%',
      visibility: 'hidden',
      position: 'absolute',
      left: '-999em',
    };
    let mainClass = 'ms-panel';

    if (show.show) {
      mainStyle = {
        top: '0px',
      };
      mainClass = 'ms-panel panel-show';
    }
    let signClassName = '';
    let registerClassName = '';
    let signStyle = {};
    let registerStyle = {};
    if (show.type === 'signin') {
      signClassName = 'tab-actived';
      signStyle = {
        display: 'block',
      };
    }
    else {
      registerClassName = 'tab-actived';
      registerStyle = {
        display: 'block',
      };
    }

    return (
      <div id="ms-man" className={mainClass} style={mainStyle}>
        <div className="ms-panel-header">
          <span className="ms-panel-title" data-role="panel-title"></span>
          <span className="ms-panel-cancel" onClick={this._hide}></span>
        </div>
        <div className="ms-panel-bodyer" data-role="panel-body">
          <div id="login-join-box" className="ms-tab">
            <ul className="tab-head">
              <li className={signClassName} onClick={this._toggleSignin}>Sign In</li>
              <li className={registerClassName} onClick={this._toggleRegister}>Register</li>
            </ul>
            <div className="tab-body">
              <div className="tab-pane" style={signStyle}>
                <div id="login-wrap" className="login-static nc-outer-box">
                  <form id="login-form" name="login-form" className="form clr style-type-auto" onSubmit={this.handleLogin}>
                    <div id="login-loading" className="loading-mask">
                      <div className="loading-icon"></div>
                      <div className="loading-mask-body"></div>
                    </div>
                    <div id="login-error" className="form-error notice notice-error">
                      <span className="icon-notice icon-error"></span>
                      <span className="notice-descript"></span>
                    </div>
                    <div id="login-content" className="form clr">
                      <dl>
                        <dt className="fm-label">
                          <div className="fm-label-wrap clr">
                            <span id="login-id-label-extra" className="fm-label-extra"></span>
                            <label htmlFor="fm-login-id">Account:</label>
                          </div>
                        </dt>
                        <dd id="fm-login-id-wrap" className="fm-field">
                          <div className="fm-field-wrap">
                            <div id="account-check-loading" className="loading-mask">
                              <div className="loading-icon"></div>
                              <div className="loading-mask-body"></div>
                            </div>
                            <input id="fm-login-id" className="fm-text" type="text" name="loginId" tabIndex="1" placeholder="Email address or member ID" autoComplete="off" autoCorrect="off" autoCapitalize="off" valueLink={this.linkState('email')}/>
                          </div>
                        </dd>
                      </dl>
                      <dl>
                        <dt className="fm-label">
                          <div className="fm-label-wrap clr">
                            <span className="fm-label-extra">
                              <a id="forgot-password-link" href="http://accounts.alibaba.com/user/company/forget_password_input_email.htm?lang=en_US&amp;aeHelpFlag=true " target="_blank" data-spm-protocol="i">Forgot Password?</a>
                            </span>
                            <label htmlFor="fm-login-password">Password:</label>
                          </div>
                        </dt>
                        <dd id="fm-login-password-wrap" className="fm-field">
                          <div className="fm-field-wrap">
                            <input id="fm-login-password" className="fm-text" type="password" name="password" tabIndex="2" autoComplete="off" placeholder="Password" autoCorrect="off" autoCapitalize="off" valueLink={this.linkState('password')}/>
                          </div>
                        </dd>
                      </dl>
                    </div>
                    <div id="login-submit">
                      <input type="hidden" name="event_submit_do_login" value="submit" />
                      <input id="fm-login-submit" value="Sign In" className="fm-button fm-submit" type="submit" tabIndex="3" name="submit-btn" />
                    </div>
                    <div id="login-other">
                      <div className="login-login-links">
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="tab-pane" style={registerStyle}>
                <div id="wap-register">
                  <form id="register-form" onSubmit={this.handleRegister}>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Email" name="email" data-verify-type="email" valueLink={this.linkState('emailNew')} />
                      <div className="ms-msg-error">Please enter a valid Email Address</div>
                      <div className="ms-man-loading"></div>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="First Name" name="firstName" data-verify-type="userName" />
                      <div className="ms-msg-error">Please enter a valid First Name</div>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Last Name" name="lastName" data-verify-type="userName" />
                      <div className="ms-msg-error">Please enter a valid Last Name</div>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Password" name="password" data-verify-type="password" valueLink={this.linkState('passwordNew')} />
                      <div className="ms-msg-error">Please enter 6 - 20 characters (A-Z, a-z, 0-9 only)</div>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Reenter Password" name="" data-verify-type="repassword" />

                      <div className="ms-msg-error">Passwords are not the same</div>
                    </div>
                    <div className="form-group">
                      <input type="text" className="check-code" placeholder="" name="imagePassword" data-verify-type="checkCode" /><img src="http://captcha.alibaba.com/get_img?identity=aliexpress.com&amp;sessionid=7b2202b33fb24033a112363b1bc1e7fa&amp;kjtype=b2b_default&amp;t=0.43626335402950644" />
                      <div className="ms-msg-error">Please enter valid Code</div>
                    </div>

                    <div className="agreement-box"><a href="http://news.alibaba.com/article/detail/help/100453670-1-alibaba.com-free-membership-agreement.html">Read Aliexpress.com Free Membership Agreement</a></div>
                    <div className="form-group">
                      <button type="button" onClick={this.handleRegister} className="ms-button-primary" data-stat="joininfree_page::joininfree_create::joininfree_create_button">Agree &amp; Create My Account</button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  },
});
