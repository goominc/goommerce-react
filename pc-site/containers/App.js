import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppHeader from '../components/AppHeader';
import ErrorPopup from '../components/ErrorPopup';

import { ApiAction, resetError } from '../redux/actions';
const { loadCartIfEmpty, loadCategories, changeLocale, changeCurrency, logout } = ApiAction;

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
    const { children, auth, cart, error, resetError, changeLocale, changeCurrency } = this.props;
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
          changeCurrency={changeCurrency}
        />
        {children}
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error,
    activeLocale: state.i18n.activeLocale, activeCurrency: state.currency.activeCurrency }),
  { loadCartIfEmpty, loadCategories, resetError, changeLocale, changeCurrency, logout }
)(App);
