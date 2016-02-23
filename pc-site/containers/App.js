import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History, Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import AppHeader from '../components/AppHeader';
import ErrorPopup from '../components/ErrorPopup';

import { ApiAction, resetError } from '../redux/actions';
const { loadCartIfEmpty, changeLocale, changeCurrency, logout } = ApiAction;

require('../stylesheets/main.scss');

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  mixins: [History],
  componentDidMount() {
    this.props.loadCartIfEmpty();
  },
  handleLogout() {
    this.props.logout().then(() => window.location.href = '/');
  },
  handleSearch(query) {
    if (query) {
      this.history.pushState(null, `/search?q=${query}`);
    }
  },
  render() {
    const { children, auth, cart, error, resetError, changeLocale, changeCurrency, activeLocale, activeCurrency } = this.props;
    function renderError() {
      if (error && error.message) {
        return (
          <ErrorPopup error={error} resetError={resetError} />
        );
      }
    }
    return (
      <div>
        {renderError()}
        <AppHeader
          auth={auth}
          cart={cart}
          handleLogout={this.handleLogout}
          handleSearch={this.handleSearch}
          changeLocale={changeLocale}
          activeLocale={activeLocale}
          changeCurrency={changeCurrency}
          activeCurrency={activeCurrency} />
        {children}
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error,
    activeLocale: state.i18n.activeLocale, activeCurrency: state.currency.activeCurrency }),
  { loadCartIfEmpty, resetError, changeLocale, changeCurrency, logout }
)(App);
