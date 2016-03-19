import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, toggleMenu, toggleSignRegister, toggleSearch } from 'redux/actions';
const { loadCartIfEmpty, loadCategories, login, signup, logout } = ApiAction;

import AppHeader from 'components/AppHeader';
import CommonFooter from 'components/CommonFooter';
import LeftSideBar from 'components/LeftSideBar';
import SignRegister from 'components/SignRegister';
import Search from 'components/Search';

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    auth: PropTypes.object,
    cart: PropTypes.object,
    header: PropTypes.object,
    showMenu: PropTypes.bool.isRequired,
    showSign: PropTypes.object.isRequired,
    showSearch: PropTypes.bool.isRequired,
    loadCartIfEmpty: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleSignRegister: PropTypes.func.isRequired,
    toggleSearch: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.props.loadCartIfEmpty();
    this.props.loadCategories();
  },
  _login(email, password) {
    this.props.login(email, password).then(
      () => {
        this.props.toggleSignRegister(false);
        this.props.loadCartIfEmpty();
      },
      () => alert('Invalid username/password.')
    );
  },
  _signup(params) {
    this.props.signup(params).then(
      () => {
        this.props.toggleSignRegister(false);
        return this.context.router.push('/');
      },
      (err) => alert(err.msg)
    );
  },
  _logout() {
    this.props.logout().then(
      () => {
        window.location.href = '/';
      }
    );
  },
  render() {
    const { children, auth, cart, header, showMenu, showSign, showSearch } = this.props;
    let fixedStyle = {};
    if (showMenu) {
      const windowHeight = $(window).height();
      fixedStyle = {
        height: windowHeight,
        overflowY: 'hidden',
      };
    }
    return (
      <div id="" style={fixedStyle}>
        <AppHeader toggle={this.props.toggleMenu} cart={cart} header={header} toggleSearch={this.props.toggleSearch} />
        {children}
        <CommonFooter />
        <LeftSideBar show={showMenu} toggle={this.props.toggleMenu} toggleSignRegister={this.props.toggleSignRegister}
          auth={auth} cart={cart} logout={this._logout}
        />
        <SignRegister show={showSign} toggleSignRegister={this.props.toggleSignRegister}
          login={this._login} register={this._signup}
        />
        <Search show={showSearch} toggle={this.props.toggleSearch} />
      </div>
    );
  },
});

export default connect(
  (state) => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error,
    showMenu: state.menu.showMenu, showSign: state.sign, showSearch: state.search.showSearch,
    header: state.header }),
  { loadCartIfEmpty, loadCategories, login, signup, logout, toggleMenu, toggleSignRegister, toggleSearch }
)(App);
