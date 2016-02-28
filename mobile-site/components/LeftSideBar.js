import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    show: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    toggleSignRegister: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  },
  _toggle() {
    this.props.toggle();
  },
  _logout() {
    this.props.logout();
  },
  _showSignin() {
    this.props.toggleSignRegister(true, 'sign');
  },
  _showRegister() {
    this.props.toggleSignRegister(true, 'register');
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
    const { show } = this.props;
    const showStyle = {
      display: show ? 'block' : 'none',
    };
    const sideClassName = 'ms-drawer' + (show ? ' open' : '');

    return (
      <div className="ms-drawer-wrapper">
        <div className="ms-drawer-mask" style={showStyle} onClick={this.props.toggle}><span className="ms-drawer-back"></span></div>

        <section className={sideClassName}>
          <div className="ms-drawer-loginInfo">
          {this.renderAuth()}

          </div>

          <ul className="drawer-guide">
            <li className="drawer-home"><Link to="/" onClick={this.props.toggle}><i className="ms-icon icon-home"></i><span>Home</span></Link></li>
            <li className="drawer-myOrder"><a className="drawer-myOrder" href="http://m.aliexpress.com/downloadapp/myOrder.htm"><i className="ms-icon icon-order"></i><span>My Orders</span></a></li>
            <li className="drawer-cart"><Link to="/cart"><i className="ms-icon icon-shippingcart"></i><span>Cart</span></Link></li>
            <li className="drawer-wishList"><a href="http://m.aliexpress.com/myaccount/wishlist/detail.htm"><i className="ms-icon icon-wishlist"></i><span>Wish List</span></a></li>

            <li className="drawer-language"><i className="ms-icon icon-translation"></i><b>Language</b><span>English</span></li>
            {/* <li className="drawer-download"><a href="http://m.aliexpress.com/d.do?p=a4&amp;ck=in_msite_download"><i className="ms-icon icon-downward"></i><span>Download APP</span></a></li>*/}
          </ul>
          <ul className="drawer-feature">
            {/* <li className="drawer-help"><a href="http://activities.aliexpress.com/h5_help_center.php"><span>Help Center</span></a></li>
            <li className="drawer-feedback"><a href="http://m.aliexpress.com/app_feedback_form/msite.html"><span>Feedback</span></a></li>
            <li className="drawer-questionnaire"><a href="https://www.surveymonkey.com/s/8LNTJFB"><span>Questionnaire</span></a></li>*/}
            {this.renderLogout()}
          </ul>

        </section>
      </div>

    );
  },
});
