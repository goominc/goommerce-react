import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  /*propTypes: {

  },
  renderAccount() {
    const { auth } = this.props;
    if (auth.bearer) {
      return (
        <Link to="/mypage">
        </Link>
      );
    }
    else {
      return (
        <div className="account-menus-wrap">
        </div>
      );      
    }
  },*/
  render() {
    /*const { handleSearch, cart } = this.props;
    let cartCount = 0;
    if (cart && cart.productVariants) {
      cartCount = cart.productVariants.length;
    }*/
    return (
      <header className="gm-header">
        <span className="drawer"></span>
        <Link to="/" className="logo">
          <img src="http://img.alicdn.com/tps/i4/TB1cCb4HpXXXXcZXVXXyo3wIXXX-220-54.png" alt="AE Logo" />
        </Link>

        <div className="position-right">
          <span className="search"></span>
          <Link to="/cart" className="cart">
            <span className="cart-count">0</span>
          </Link>
        </div>        
      </header>
    );
  },
});
