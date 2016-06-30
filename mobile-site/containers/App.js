import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { cloudinaryConfig } from 'react-cloudinary';

import { ApiAction, toggleMenu, toggleSignRegister, toggleSearch,
         toggleLanguage, toggleCurrency } from 'redux/actions';

import AppHeader from 'components/AppHeader';
import CommonFooter from 'components/CommonFooter';
import LeftSideBar from 'components/LeftSideBar';
import SignRegister from 'components/SignRegister';
import Search from 'components/Search';
import Language from 'components/Language';
import Currency from 'components/Currency';
import LanguageSelectPopup from 'components/LanguageSelectPopup';
import OptionButton from 'components/OptionButton';

cloudinaryConfig({ cloud_name: 'linkshops', crop: 'limit' });

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    auth: PropTypes.object,
    cart: PropTypes.object,
    header: PropTypes.object,
    showMenu: PropTypes.bool.isRequired,
    showSign: PropTypes.object.isRequired,
    showSearch: PropTypes.bool.isRequired,
    showLanguage: PropTypes.bool.isRequired,
    showCurrency: PropTypes.bool.isRequired,
    loadCartIfEmpty: PropTypes.func.isRequired,
    changeCurrency: PropTypes.func.isRequired,
    changeLocale: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    searchKeyword: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleSignRegister: PropTypes.func.isRequired,
    toggleSearch: PropTypes.func.isRequired,
    toggleLanguage: PropTypes.func.isRequired,
    toggleCurrency: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  childContextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
    ApiAction: PropTypes.object,
  },
  getChildContext() {
    const res = {
      activeLocale: this.props.activeLocale,
      activeCurrency: this.props.activeCurrency,
      currencySign: { KRW: '￦', USD: '$', CNY: '￥' }, // TODO remove
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
    // this.props.loadCategories();
  },
  _login(email, password) {
    this.props.login({ email, password }).then(
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
  handleSearch(query) {
    const url = `/search/${query || ''}?sorts=-id`;
    this.context.router.push(url);
    return null;
  },
  render() {
    const { children, auth, cart, header, showMenu, showSign, showSearch,
            showLanguage, showCurrency, activeLocale, activeCurrency } = this.props;
    const locales = {
      ko: '한국어',
      en: 'English',
      'zh-cn': '中文(简体)',
      'zh-tw': '中文(繁體)',
    };
    const currencies = [
      'KRW',
      'USD',
      'CNY',
    ];
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
        <AppHeader toggle={this.props.toggleMenu} auth={auth} cart={cart} header={header}
          toggleSearch={this.props.toggleSearch} toggleSignRegister={this.props.toggleSignRegister}
        />
        {children}
        <OptionButton />
        <CommonFooter />
        <LeftSideBar show={showMenu} toggle={this.props.toggleMenu} toggleSignRegister={this.props.toggleSignRegister}
          locales={locales} toggleLanguage={this.props.toggleLanguage} toggleCurrency={this.props.toggleCurrency}
          auth={auth} cart={cart} logout={this._logout}
        />
        <SignRegister show={showSign} toggleSignRegister={this.props.toggleSignRegister}
          login={this._login} register={this._signup}
        />
        <Search show={showSearch} toggle={this.props.toggleSearch} searchKeyword={this.props.searchKeyword}
          search={this.handleSearch}
        />
        <Language locales={locales} activeLocale={activeLocale}
          show={showLanguage} toggle={this.props.toggleLanguage} change={this.props.changeLocale}
        />
        <Currency currencies={currencies} activeCurrency={activeCurrency}
          show={showCurrency} toggle={this.props.toggleCurrency} change={this.props.changeCurrency}
        />
        <LanguageSelectPopup change={this.props.changeLocale} />
      </div>
    );
  },
});

export default connect(
  (state, ownProps) => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error,
    showMenu: state.menu.showMenu, showSign: state.sign, showSearch: state.headerSearch.showSearch,
    showLanguage: state.menuAddon.showLanguage, showCurrency: state.menuAddon.showCurrency,
    activeLocale: state.i18n.activeLocale, activeCurrency: state.currency.activeCurrency,
    header: state.header }),
  Object.assign({}, ApiAction, { toggleMenu, toggleLanguage, toggleCurrency, toggleSignRegister, toggleSearch })
)(App);
