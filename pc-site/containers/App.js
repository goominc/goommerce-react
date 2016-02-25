import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SigninPopup from '../components/popup/SigninPopup';
import ErrorPopup from '../components/popup/ErrorPopup';

import { ApiAction, resetError, closePopup } from '../redux/actions';
const { loadCartIfEmpty, loadCategories, changeLocale, changeCurrency, login, logout } = ApiAction;

require('../stylesheets/main.scss');

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  childContextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
  },
  getChildContext() {
    return {
      activeLocale: this.props.activeLocale,
      activeCurrency: this.props.activeCurrency,
    };
  },
  componentDidMount() {
    this.props.loadCartIfEmpty();
    this.props.loadCategories();
  },
  handleLogout() {
    this.props.logout().then(() => window.location.href = '/');
  },
  handleSearch(query) {
    if (query) {
      this.context.router.push(`/search/${query}`);
    }
  },
  render() {
    const { children, auth, cart, error, resetError, changeLocale, changeCurrency,
      login, popup, closePopup } = this.props;
    const renderError = () => {
      if (error && error.message) {
        return (
          <ErrorPopup error={error} resetError={resetError} />
        );
      }
    };
    const renderPopup = () => {
      const handleLogin = (email, password) => {
        login(email, password).then(
          () => closePopup(),
          () => alert('Invalid username/password.')
        );
      };
      if (popup.login) {
        return (
          <SigninPopup closePopup={closePopup} handleSubmit={handleLogin} goForgotPassword={() => console.log('TODO')} />
        );
      }
    };
    return (
      <div>
        {renderError()}
        {renderPopup()}
        <AppHeader
          auth={auth}
          cart={cart}
          handleLogout={this.handleLogout}
          handleSearch={this.handleSearch}
          changeLocale={changeLocale}
          changeCurrency={changeCurrency}
        />
        {children}
        <AppFooter />
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error,
    activeLocale: state.i18n.activeLocale, activeCurrency: state.currency.activeCurrency,
    popup: state.popup }),
  { loadCartIfEmpty, loadCategories, resetError, closePopup, changeLocale, changeCurrency, login, logout }
)(App);
