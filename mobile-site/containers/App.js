import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, resetError, toggleMenu, toggleSignRegister } from 'redux/actions';
const { loadCartIfEmpty, loadCategories, login, signup, logout } = ApiAction;

import AppHeader from 'components/AppHeader';
import CommonFooter from 'components/CommonFooter';
import LeftSideBar from 'components/LeftSideBar';
import SignRegister from 'components/SignRegister';

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    loadCartIfEmpty: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleSignRegister: PropTypes.func.isRequired,
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
        this.props.toggleSignRegister(false, 'sign');
        return this.context.router.push('/');
      },
      () => alert('Invalid username/password.')
    );
  },
  _signup(params) {
    this.props.signup(params).then(
      () => {
        this.props.toggleSignRegister(false, 'sign');
        return this.context.router.push('/');
      },
      (err) => alert(err.msg)
    );
  },
  _logout() {
    this.props.logout().then(
      () => window.location.href = '/'
    );
  },
  render() {
    const { children, auth, cart, header, showMenu, toggleMenu, showSign, toggleSignRegister } = this.props;
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
        <AppHeader toggle={toggleMenu} cart={cart} header={header} />
        {children}
        <CommonFooter />
        <LeftSideBar show={showMenu} toggle={toggleMenu} toggleSignRegister={toggleSignRegister} auth={auth} cart={cart} logout={this._logout} />
        <SignRegister show={showSign} toggleSignRegister={toggleSignRegister} login={this._login} register={this._signup} />
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error,
    showMenu: state.menu.showMenu, showSign: state.sign, header: state.header }),
  { loadCartIfEmpty, loadCategories, resetError, login, signup, logout, toggleMenu, toggleSignRegister }
)(App);
