import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, resetError, logout } from '../redux/actions';
const { loadCartIfEmpty, login, signup } = ApiAction;

import AppHeader from '../components/AppHeader';
import CommonFooter from '../components/CommonFooter';
import LeftSideBar from '../components/LeftSideBar';

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  getInitialState() {
    return {
      menuState: {
        show: false,
        showSign: {
          show: false,
          type: 'signin',
        },
      },
      logoType: {
        isDefaultLogo: false,
        titleText: 'App & Accesories',
      },
    };
  },
  componentDidMount() {
    this.props.loadCartIfEmpty();
  },
  toggleMenu() {
    this.setState({
      menuState: {
        show: !this.state.menuState.show,
        showSign: {
          show: this.state.menuState.showSign.show,
          type: this.state.menuState.showSign.type,
        },
      },
    });
  },
  showSignin() {
    this.setState({
      menuState: {
        show: this.state.menuState.show,
        showSign: {
          show: true,
          type: 'signin',
        },
      },
    });
  },
  showRegister() {
    this.setState({
      menuState: {
        show: this.state.menuState.show,
        showSign: {
          show: true,
          type: 'register',
        },
      },
    });
  },
  hideSignRegister() {
    this.setState({
      menuState: {
        show: this.state.menuState.show,
        showSign: {
          show: false,
          type: 'signin',
        },
      },
    });
  },
  _login(email, password) {
    // TODO show loading gif
    this.props.login(email, password).then(
      () => {
        this.hideSignRegister();
        return this.context.router.push('/');
      },
      () => alert('Invalid username/password.')
    );
  },
  _signup(params) {
    this.props.signup(params).then(
      () => {
        this.hideSignRegister();
        return this.context.router.push('/');
      },
      (err) => alert(err.msg)
    );
  },
  _logout() {
    this.props.logout();
  },
  render() {
    const { children, auth, cart } = this.props;
    let fixedStyle = {};
    if (this.state.showSide) {
      fixedStyle = {
        position: 'fixed',
      };
    }
    return (
      <div id="" style={fixedStyle}>
        <AppHeader toggle={this.toggleMenu} cart={cart} logoType={this.state.logoType}/>
        {children}
        <CommonFooter />
        <LeftSideBar menuState={this.state.menuState} toggle={this.toggleMenu} auth={auth} cart={cart} login={this._login} register={this._signup} logout={this._logout}
          showSignin={this.showSignin} showRegister={this.showRegister} hideSignRegister={this.hideSignRegister}
        />
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error }),
  { loadCartIfEmpty, resetError, login, signup, logout }
)(App);
