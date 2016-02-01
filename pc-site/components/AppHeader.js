import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired,
  },
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
        <Link to="/accounts/signin"><span>Sign In</span></Link>
        <span className="ua-line">|</span>
        <Link to="/accounts/signup"><span>Join</span></Link>
        <div className="my-linkshops">
          <span>My Linkshops</span>
        </div>
      </div>
    );
  },
  render() {
    const { handleSearch, cart } = this.props;
    let cartCount = 0;
    if (cart && cart.productVariants) {
      cartCount = cart.productVariants.length;
    }
    return (
      <div className="container header">
        <div className="header-wrap">
          <Link to="/">
            <div className="header-logo">
              <img width="100%" height="100%" src="http://www.linkshops.com/skin/frontend/linkshops2nd/default/images/logo.png" alt="Linkshops"/>
            </div>
          </Link>
          <div className="header-search-box">
            <input ref="searchQuery" placeholder="I'm shopping for..." />
            <div className="header-search-category-box">
              <div className="search-divider"></div>
              <div className="arrow-down"></div>
              All Categories
              <div className="search-dropdown-box">
                <div className="search-dropdown-item">C1</div>
              </div>
            </div>
            <button className="header-search-button" onClick={handleSearch}>
            </button>
          </div>
          <div className="header-mymenu-wrap">
            <Link to="/cart">
              <div className="header-mymenu-cart">
                <div className="cart-icon"></div>
                <span className="cart-count">{cartCount}</span>
                <span>Cart</span>
              </div>
            </Link>
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
