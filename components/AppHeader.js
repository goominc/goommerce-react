import React from 'react';
import { connect } from 'react-redux';

const Header = React.createClass({
  renderAccount() {
    const { auth } = this.props;
    if (auth.bearer) {
      return (
        <div className="account-menus-wrap">
          <span>Hi, </span>
          <div className="my-linkshops">
            <span>{auth.email}</span>
          </div>
        </div>
      );
    }
    return (
      <div className="account-menus-wrap">
        <a href="/accounts/signin"><span>Sign In</span></a>
        <span className="ua-line">|</span>
        <a href="/accounts/signup"><span>Join</span></a>
        <div className="my-linkshops">
          <span>My Linkshops</span>
        </div>
      </div>
    );
  },
  render() {
    return (
      <div className="container header">
        <div className="header-wrap">
          <a href="/">
            <div className="header-logo">LINKSHOPS</div>
          </a>
          <div className="header-search-box">
            <input placeholder="I'm shopping for..." />
            <div className="header-search-right">
              <button className="header-search-button">
              </button>
            </div>
          </div>
          <div className="header-mymenu-wrap">
            <a href="/cart">
              <div className="header-mymenu-cart">
                <div className="cart-icon"></div>
                <span>Cart</span>
              </div>
            </a>
            <div className="header-mymenu-account">
              <div className="account-icon"></div>
              {this.renderAccount()}
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth })
)(Header);
