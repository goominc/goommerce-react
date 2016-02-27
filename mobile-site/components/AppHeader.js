import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    header: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
  },
  _toggle() {
    this.props.toggle();
  },
  render() {
    const { header, cart } = this.props;
    let cartCount = 0;
    if (cart && cart.productVariants) {
      cartCount = cart.productVariants.length;
    }
    function renderLogo() {
      if (header.showLogo) {
        return (
            <Link to="/" className="logo">
              <img className="logo-img" src="http://img.alicdn.com/tps/i4/TB1cCb4HpXXXXcZXVXXyo3wIXXX-220-54.png" alt="AE Logo" />
            </Link>
          );
      }
      else {
        return (
            <span id="gm-title" className="title">{header.titleText}</span>
          );
      }
    }
    function renderSearch() {
      if (header.showSearch) {
        return (
          <span className="search"></span>
          );
      }
    }
    function renderCart() {
      if (header.showCart) {
        return (
          <Link to="/cart" className="cart">
            <span className="cart-count">{cartCount}</span>
          </Link>
          );
      }
    }

    return (
      <header className="gm-header">
        <span className="drawer" onClick={this._toggle}></span>
        {renderLogo()}

        <div className="position-right">
          {renderSearch()}
          {renderCart()}
        </div>
      </header>
    );
  },
});
