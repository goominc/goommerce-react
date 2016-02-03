import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History, Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import AppHeader from '../components/AppHeader';
import ErrorPopup from '../components/ErrorPopup';

import { ApiAction, resetError } from '../redux/actions';
const { loadCartIfEmpty } = ApiAction;

require('../stylesheets/main.scss');

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  mixins: [History],
  componentDidMount() {
    this.props.loadCartIfEmpty();
  },
  handleSearch() {
    const query = this.refs.searchQuery.value;
    if (query) {
      this.history.pushState(null, `/search?q=${query}`);
    }
  },
  render() {
    const { children, auth, cart, error, resetError } = this.props;
    function renderError() {
      if (error && error.message) {
        return (
          <ErrorPopup error={error} resetError={resetError} />
        );
      }
    }
    return (
      <div className="main container">
        {renderError()}
        <AppHeader auth={auth} cart={cart} handleSearch={this.handleSearch} />
        {children}
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth, cart: state.cart, error: state.errorHandler.error }),
  { loadCartIfEmpty, resetError }
)(App);
