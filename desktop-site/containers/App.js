import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { cloudinaryConfig } from 'react-cloudinary';

import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import ErrorPopup from 'components/popup/ErrorPopup';
import SigninPopup from 'components/popup/SigninPopup';

import { ApiAction, resetError, closePopup, toggleSearchDropdown, selectSearchDropdown } from 'redux/actions';

require('../stylesheets/main.scss');

cloudinaryConfig({ cloud_name: 'linkshops', crop: 'limit' });

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    closePopup: PropTypes.func,
    error: PropTypes.func,
    loadCMSData: PropTypes.func,
    loadCartIfEmpty: PropTypes.func,
    loadCategories: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func,
    params: PropTypes.object,
    popup: PropTypes.object,
    resetError: PropTypes.func,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  childContextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    ApiAction: PropTypes.object,
  },
  getChildContext() {
    const res = {
      activeLocale: this.props.activeLocale,
      activeCurrency: this.props.activeCurrency,
    };
    const actions = {};
    const apiFuncs = Object.keys(ApiAction);
    apiFuncs.forEach((api) => {
      actions[api] = this.props[api];
    });
    res.ApiAction = actions;
    return res;
  },
  componentDidMount() {
    this.props.loadCartIfEmpty();
    this.props.loadCategories();
    this.props.loadCMSData('main_categories');
  },
  handleLogout() {
    this.props.logout().then(() => { window.location.href = '/'; });
  },
  handleSearch(query) {
    if (query) {
      this.context.router.push(`/search/${query}`);
    }
  },
  render() {
    const { children, error, login, popup } = this.props;
    const renderError = () => {
      if (error && error.message) {
        return (
          <ErrorPopup error={error} resetError={this.props.resetError} />
        );
      }
      return '';
    };
    const renderPopup = () => {
      const handleLogin = (email, password) => {
        login(email, password).then(
          () => this.props.closePopup(),
          () => alert('Invalid username/password.') // eslint-disable-line no-alert
        );
      };
      if (popup.login) {
        return (
          <SigninPopup closePopup={closePopup} handleSubmit={handleLogin}
            goForgotPassword={() => console.log('TODO')} // eslint-disable-line no-console
          />
        );
      }
      return '';
    };
    return (
      <div>
        {renderError()}
        {renderPopup()}
        <AppHeader
          {...this.props}
          handleLogout={this.handleLogout}
          handleSearch={this.handleSearch}
        />
        {children}
        <AppFooter />
      </div>
    );
  },
});

export default connect(
  (state) => ({
    auth: state.auth,
    cart: state.cart,
    categories: state.categories,
    showSearchDropdown: state.search.showDropdown,
    activeCategory: state.search.activeCategory,
    error: state.errorHandler.error,
    activeLocale: state.i18n.activeLocale, activeCurrency: state.currency.activeCurrency,
    popup: state.popup,
  }),
  Object.assign({}, ApiAction, { resetError, closePopup, toggleSearchDropdown, selectSearchDropdown })
)(App);
