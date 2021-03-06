// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { cloudinaryConfig } from 'react-cloudinary';
import DocumentTitle from 'react-document-title';

import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import ErrorPopup from 'components/popup/ErrorPopup';
import SigninPopup from 'components/popup/SigninPopup';
import AfterAddToCartPopup from 'components/popup/AfterAddToCartPopup';
import AfterAddToWishListPopup from 'components/popup/AfterAddToWishListPopup';
import ServiceStopped from 'components/ServiceStopped';

import i18n from 'commons/utils/i18n';

import { ApiAction, resetError, closePopup, toggleSearchDropdown, selectSearchDropdown } from 'redux/actions';

require('../stylesheets/main.scss');

cloudinaryConfig({ cloud_name: 'linkshops', crop: 'limit' });

const App = React.createClass({
  propTypes: {
    auth: PropTypes.object,
    children: PropTypes.node,
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    closePopup: PropTypes.func,
    error: PropTypes.object,
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
    currencySign: PropTypes.object,
    isLogin: PropTypes.func,
    hasRole: PropTypes.func,
    ApiAction: PropTypes.object,
  },
  getChildContext() {
    const res = {
      activeLocale: this.props.activeLocale,
      activeCurrency: this.props.activeCurrency,
      currencySign: { KRW: '￦', USD: '$', CNY: '￥' }, // TODO remove
      isLogin: this.isLogin,
      hasRole: () => true, // TODO
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
    if (this.isLogin()) {
      this.props.loadCartIfEmpty();
    }
    this.props.loadCMSData('desktop_top_banner');
    this.props.loadCategories();
  },
  isLogin() {
    return !!this.props.auth.id;
  },
  handleLogout() {
    this.props.logout().then(() => { window.location.href = '/'; });
  },
  handleSearch(query, categoryId) {
    const url = `/search/${query}?sorts=-id${categoryId ? `&categoryId=${categoryId}` : ''}`;
    this.context.router.push(url);
  },
  render() {
    const { children, error, login, popup } = this.props;
    /*
    const stopped = true;
    if (stopped) {
      return (<ServiceStopped />);
    }
    */
    const renderError = () => {
      if (error && error.message) {
        return (
          <ErrorPopup error={error} resetError={this.props.resetError} />
        );
      }
      return '';
    };
    const renderPopup = () => {
      if (popup.popupName === 'login') {
        const handleLogin = (body) => {
          login(body, this.context.router).then(
            () => this.props.closePopup()
          );
        };
        return (
          <SigninPopup closePopup={this.props.closePopup} handleSubmit={handleLogin} />
        );
      } else if (popup.popupName === 'addCart') {
        return (
          <AfterAddToCartPopup closePopup={this.props.closePopup} />
        );
      } else if (popup.popupName === 'addWish') {
        return (
          <AfterAddToWishListPopup closePopup={this.props.closePopup} />
        );
      }
      return '';
    };
    return (
      <DocumentTitle title={i18n.get('app.title')}>
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
      </DocumentTitle>
    );
  },
});

export default connect(
  (state) => ({
    auth: state.auth,
    cart: state.cart,
    categories: state.categories,
    desktop_top_banner: state.cms.desktop_top_banner,
    showSearchDropdown: state.headerSearchCategory.showDropdown,
    activeCategory: state.headerSearchCategory.activeCategory,
    error: state.errorHandler.error,
    activeLocale: state.i18n.activeLocale, activeCurrency: state.currency.activeCurrency,
    popup: state.popup,
  }),
  Object.assign({}, ApiAction, { resetError, closePopup, toggleSearchDropdown, selectSearchDropdown })
)(App);
