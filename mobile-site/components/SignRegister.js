import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

export default React.createClass({
  propTypes: {
    show: PropTypes.object,
    toggleSignRegister: PropTypes.func.isRequired,
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
    this.props.login({ email, password });
  },
  handleRegister(e) {
    e.preventDefault();
    const { emailNew, passwordNew, passwordNewRepeat } = this.state;
    const emailRegExp = '/[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/';

    if (!emailNew.match(emailRegExp)) {
      $('#reg-email').addClass('verify-error');
      $('#reg-email .ms-msg-error').show();
      return;
    } else {
      $('#reg-email').removeClass('verify-error');
      $('#reg-email .ms-msg-error').hide();
    }

    /* TODO password validation(special char, length, etc)
    if (passwordNew.length < 6) {
      $('#reg-password').addClass('verify-error');
      $('#reg-password .ms-msg-error').show();
      return;
    } else {
      $('#reg-password').removeClass('verify-error');
      $('#reg-password .ms-msg-error').hide();
    } */

    if (passwordNew !== passwordNewRepeat) {
      $('#reg-password-repeat').addClass('verify-error');
      $('#reg-password-repeat .ms-msg-error').show();
      return;
    } else {
      $('#reg-password-repeat').removeClass('verify-error');
      $('#reg-password-repeat .ms-msg-error').hide();
    }

    this.props.register({
      email: emailNew,
      password: passwordNew,
    });
  },
  _hide() {
    this.props.toggleSignRegister(false, 'sign');
  },
  _toggleSignin() {
    this.props.toggleSignRegister(true, 'sign');
  },
  _toggleRegister() {
    this.props.toggleSignRegister(true, 'register');
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
    if (show.flag === 'sign') {
      signClassName = 'tab-actived';
      signStyle = {
        display: 'block',
      };
    } else {
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
                  <form id="login-form" className="form clr style-type-auto" onSubmit={this.handleLogin}>
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
                            <input id="fm-login-id" className="fm-text" type="email" tabIndex="1"
                              placeholder="Email address or member ID" autoComplete="off" autoCorrect="off"
                              autoCapitalize="off" valueLink={this.linkState('email')}
                            />
                          </div>
                        </dd>
                      </dl>
                      <dl>
                        <dt className="fm-label">
                          <div className="fm-label-wrap clr">
                            <span className="fm-label-extra">
                              <a id="forgot-password-link" href="/">Forgot Password?</a>
                            </span>
                            <label htmlFor="fm-login-password">Password:</label>
                          </div>
                        </dt>
                        <dd id="fm-login-password-wrap" className="fm-field">
                          <div className="fm-field-wrap">
                            <input id="fm-login-password" className="fm-text" type="password" tabIndex="2"
                              autoComplete="off" placeholder="Password" autoCorrect="off" autoCapitalize="off"
                              valueLink={this.linkState('password')}
                            />
                          </div>
                        </dd>
                      </dl>
                    </div>
                    <div id="login-submit">
                      <input type="hidden" name="event_submit_do_login" value="submit" />
                      <input id="fm-login-submit" value="Sign In" className="fm-button fm-submit" type="submit"
                        tabIndex="3" name="submit-btn"
                      />
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
                    <div className="form-group" id="reg-email">
                      <input type="email" className="form-control" placeholder="Email" name="email"
                        autoComplete="off" autoCorrect="off" autoCapitalize="off"
                        valueLink={this.linkState('emailNew')}
                      />
                      <div className="ms-msg-error">Please enter a valid Email Address</div>
                      <div className="ms-man-loading"></div>
                    </div>
                    { /*
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="First Name" name="firstName" />
                      <div className="ms-msg-error">Please enter a valid First Name</div>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Last Name" name="lastName" />
                      <div className="ms-msg-error">Please enter a valid Last Name</div>
                    </div>
                    */ }
                    <div className="form-group" id="reg-password">
                      <input type="password" className="form-control" placeholder="Password" name="password"
                        valueLink={this.linkState('passwordNew')}
                      />
                      <div className="ms-msg-error">Please enter 6 - 20 characters (A-Z, a-z, 0-9 only)</div>
                    </div>
                    <div className="form-group" id="reg-password-repeat">
                      <input type="password" className="form-control" placeholder="Reenter Password" name=""
                        valueLink={this.linkState('passwordNewRepeat')}
                      />
                      <div className="ms-msg-error">Passwords are not the same</div>
                    </div>
                    <div className="form-group">
                      <button type="button" onClick={this.handleRegister} className="ms-button-primary">
                        Agree &amp; Create My Account
                      </button>
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
