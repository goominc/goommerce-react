import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { History } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import AppHeader from '../components/AppHeader';

require('../stylesheets/main.scss');

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    auth: PropTypes.object,
  },
  mixins: [LinkedStateMixin, History],
  getInitialState() {
    return {};
  },
  handleSearch(e) {
    e.preventDefault();
    const { query } = this.state;
    if (query) {
      this.history.pushState(null, `/search?q=${query}`);
    }
  },
  renderProfile() {
    const { auth } = this.props;
    if (auth.bearer) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/">{auth.email}</Link></li>
          <li><Link to="/cart">CART</Link></li>
        </ul>
      );
    }
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/accounts/signin">LOGIN</Link></li>
        <li><Link to="/accounts/signup">JOIN</Link></li>
      </ul>
    );
  },
  render() {
    const { children } = this.props;
    return (
      <div className="main container">
        <AppHeader />
        {children}
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth })
)(App);
