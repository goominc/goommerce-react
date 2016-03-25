import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import orderUtil from 'commons/utils/orderUtil';

export default React.createClass({
  propTypes: {
    toggle: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
    header: PropTypes.object.isRequired,
    toggleSearch: PropTypes.func.isRequired,
  },
  render() {
    const { header, cart } = this.props;
    const cartCount = orderUtil.getProductVariantsFromCart(cart).length;
    const renderLogo = () => {
      if (header.showLogo) {
        return (
            <Link to="/" className="logo">
              <img className="logo-img" src="http://img.alicdn.com/tps/i4/TB1cCb4HpXXXXcZXVXXyo3wIXXX-220-54.png" />
            </Link>
          );
      }
      return (
          <span id="gm-title" className="title">{header.titleText}</span>
        );
    };
    const renderSearch = () => {
      if (header.showSearch) {
        return (
          <span className="search" onClick={this.props.toggleSearch}></span>
          );
      }
      return null;
    };
    function renderCart() {
      if (header.showCart) {
        return (
          <Link to="/cart" className="cart">
            <span className="cart-count">{cartCount}</span>
          </Link>
          );
      }
      return null;
    }

    return (
      <header className="gm-header">
        <span className="drawer" onClick={this.props.toggle}></span>
        {renderLogo()}

        <div className="position-right">
          {renderSearch()}
          {renderCart()}
        </div>
      </header>
    );
  },
});
