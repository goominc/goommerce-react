import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction, toggleMenu, toggleSignRegister, toggleSearch,
         toggleLanguage, toggleCurrency } from 'redux/actions';
const { loadCartIfEmpty, changeLocale, changeCurrency, loadCategories, login, signup, logout } = ApiAction;

import AppHeader from 'components/AppHeader';
import CommonFooter from 'components/CommonFooter';
import LeftSideBar from 'components/LeftSideBar';
import SignRegister from 'components/SignRegister';
import Search from 'components/Search';
import Language from 'components/Language';
import Currency from 'components/Currency';

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
  },
  getChildContext() {
    const res = {
      activeLocale: this.props.activeLocale,
      activeCurrency: this.props.activeCurrency,
    };
    return res;
  },
  componentDidMount() {
    this.props.loadCartIfEmpty();
    // this.props.loadCategories();
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
  handleSearch(keyword) {
    if (keyword && keyword.length) {
      return this.context.router.push(`/search/${keyword}`);
    }
    return null;
  },
  render() {
    const { children, auth, cart, header, showMenu, showSign, showSearch,
            showLanguage, showCurrency, activeLocale, activeCurrency } = this.props;
    const locales = {
      ko: '한국어',
      en: 'English',
      'zh-cn': '简体',
      'zh-tw': '繁體',
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
        <AppHeader toggle={this.props.toggleMenu} cart={cart} header={header} toggleSearch={this.props.toggleSearch} />
        {children}
        <CommonFooter />
        <LeftSideBar show={showMenu} toggle={this.props.toggleMenu} toggleSignRegister={this.props.toggleSignRegister}
          locales={locales} toggleLanguage={this.props.toggleLanguage} toggleCurrency={this.props.toggleCurrency}
          auth={auth} cart={cart} logout={this._logout}
        />
        <SignRegister show={showSign} toggleSignRegister={this.props.toggleSignRegister}
          login={this._login} register={this._signup}
        />
        <Search show={showSearch} toggle={this.props.toggleSearch} search={this.handleSearch} />
        <Language locales={locales} activeLocale={activeLocale}
          show={showLanguage} toggle={this.props.toggleLanguage} change={this.props.changeLocale}
        />
        <Currency currencies={currencies} activeCurrency={activeCurrency}
          show={showCurrency} toggle={this.props.toggleCurrency} change={this.props.changeCurrency}
        />
      </div>
    );
  },
});

export default connect(
  (state) => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error,
    showMenu: state.menu.showMenu, showSign: state.sign, showSearch: state.search.showSearch,
    showLanguage: state.menuAddon.showLanguage, showCurrency: state.menuAddon.showCurrency,
    activeLocale: state.i18n.activeLocale, activeCurrency: state.currency.activeCurrency,
    header: state.header }),
  { loadCartIfEmpty, changeLocale, changeCurrency, loadCategories, login, signup, logout, toggleMenu,
    toggleLanguage, toggleCurrency, toggleSignRegister, toggleSearch }
)(App);
