import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    logoType: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
  },
  _toggle() {
    this.props.toggle();
  },
  render() {
    const { logoType, cart } = this.props;
    let cartCount = 0;
    if (cart && cart.productVariants) {
      cartCount = cart.productVariants.length;
    }
    function renderLogo() {
      if (logoType.isDefaultLogo) {
        return (
            <Link to="/" className="logo">
              <img className="logo-img" src="http://img.alicdn.com/tps/i4/TB1cCb4HpXXXXcZXVXXyo3wIXXX-220-54.png" alt="AE Logo" />
            </Link>
          );
      }
      else {
        return (
            <span id="gm-title" className="title">{logoType.titleText}</span>
          );
      }
    }

    return (
      <header className="gm-header">
        <span className="drawer" onClick={this._toggle}></span>
        {renderLogo()}

        <div className="position-right">
          <span className="search"></span>
          <Link to="/cart" className="cart">
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </header>
    );
  },
});
