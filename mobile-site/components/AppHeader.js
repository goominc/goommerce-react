import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import orderUtil from 'commons/utils/orderUtil';
import { constants } from 'commons/utils/constants';

export default React.createClass({
  propTypes: {
    toggle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    header: PropTypes.object.isRequired,
    toggleSearch: PropTypes.func.isRequired,
    toggleSignRegister: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  handleWithAuth(path) {
    // 2016. 05. 02. [heekyu] router will be go signin page if not logged in
    return this.context.router.push(path);
    /*
    const { auth } = this.props;
    if (auth.bearer) {
      return this.context.router.push(path);
    }
    this.props.toggleSignRegister(true, 'sign');
    return null;
    */
  },
  render() {
    const { header, cart } = this.props;
    const cartCount = orderUtil.getProductVariantsFromCart(cart).length;
    const renderLogo = () => {
      if (header.showLogo) {
        return (
          <Link to="/" className="logo">
            <img className="logo-img"
              src={`${constants.resourceRoot}/mobile/main/mobile_linkshops_logo.png`}
            />
          </Link>
          );
      }
      return (
          <Link to="/"><span id="gm-title" className="title">{header.titleText}</span></Link>
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
    const renderCart = () => {
      if (header.showCart) {
        return (
          <div className="cart" onClick={() => this.handleWithAuth('/cart')}>
            <span className="cart-count">{cartCount}</span>
          </div>
          );
      }
      return null;
    };

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
