import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import SignRegister from './SignRegister';

export default React.createClass({
  propTypes: {
    menuState: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  },
  _toggle() {
    this.props.toggle();
  },
  _login(email, password) {
    this.props.login(email, password);
  },
  _register(params) {
    this.props.register(params);
  },
  _logout() {
    this.props.logout();
  },
  _showSignin() {
    this.props.showSignin();
  },
  _showRegister() {
    this.props.showRegister();
  },
  _hideSignRegister() {
    this.props.hideSignRegister();
  },
  renderAuth() {
    const { auth } = this.props;
    if (auth.bearer) {
      return (
          <div className="drawer-logined">
            <div className="drawer-username">Hi, {auth.email}!</div>
          </div>
        );
    }
    else {
      return (
          <div className="drawer-unlogin">
            <span className="drawer-signin" onClick={this._showSignin}>Sign In</span>
            <span className="drawer-join" onClick={this._showRegister}>Join Free</span>
          </div>
        );
    }
  },
  renderLogout() {
    const { auth } = this.props;
    if (auth.bearer) {
      return (
          <li className="drawer-loginout" onClick={this._logout}>
            <a href="#">Sign Out</a>
          </li>
        );
    }
    else {
      return (
          <li></li>
        );
    }
  },
  render() {
    const { menuState } = this.props;
    const showStyle = {
      display: menuState.show ? 'block' : 'none',
    };
    const sideClassName = 'ms-drawer' + (menuState.show ? ' open' : '');

    return (
      <div className="ms-drawer-wrapper">
        <div className="ms-drawer-mask" style={showStyle} onClick={this._toggle}><span className="ms-drawer-back"></span></div>

        <section className={sideClassName}>
          <div className="ms-drawer-loginInfo">
          {this.renderAuth()}

          </div>

          <ul className="drawer-guide">
            <li className="drawer-home"><a href="http://m.aliexpress.com/"><i className="ms-icon icon-home"></i><span>Home</span></a></li>
            <li className="drawer-myOrder"><a className="drawer-myOrder" href="http://m.aliexpress.com/downloadapp/myOrder.htm"><i className="ms-icon icon-order"></i><span>My Orders</span></a></li>
            <li className="drawer-cart"><a href="http://m.aliexpress.com/shopcart/detail.htm"><i className="ms-icon icon-shippingcart"></i><span>Cart</span></a></li>
            <li className="drawer-wishList"><a href="http://m.aliexpress.com/myaccount/wishlist/detail.htm"><i className="ms-icon icon-wishlist"></i><span>Wish List</span></a></li>

            <li className="drawer-language"><i className="ms-icon icon-translation"></i><b>Language</b><span>English</span></li>
            <li className="drawer-download"><a href="http://m.aliexpress.com/d.do?p=a4&amp;ck=in_msite_download"><i className="ms-icon icon-downward"></i><span>Download APP</span></a></li>
          </ul>
          <ul className="drawer-feature">
            <li className="drawer-help"><a href="http://activities.aliexpress.com/h5_help_center.php"><span>Help Center</span></a></li>
            <li className="drawer-feedback"><a href="http://m.aliexpress.com/app_feedback_form/msite.html"><span>Feedback</span></a></li>
            <li className="drawer-questionnaire"><a href="https://www.surveymonkey.com/s/8LNTJFB"><span>Questionnaire</span></a></li>
            {this.renderLogout()}
          </ul>

        </section>

        <SignRegister show={menuState.showSign} hide={this._hideSignRegister} toggleSignin={this._showSignin} toggleRegister={this._showRegister} login={this._login} register={this._register}/>
      </div>

    );
  },
});
