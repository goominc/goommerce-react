import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import orderUtil from 'commons/utils/orderUtil';

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
    const { auth } = this.props;
    if (auth.bearer) {
      return this.context.router.push(path);
    }
    this.props.toggleSignRegister(true, 'sign');
    return null;
  },
  render() {
    const { header, cart } = this.props;
    const cartCount = orderUtil.getProductVariantsFromCart(cart).length;
    const renderLogo = () => {
      if (header.showLogo) {
        return (
          <Link to="/" className="logo">
            <img className="logo-img"
              src="https://s3.ap-northeast-2.amazonaws.com/linkshops/front/resource/extra/01_linkshops_logo.png"
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
