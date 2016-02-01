import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History, Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import AppHeader from '../components/AppHeader';

import { loadCartIfEmpty } from '../redux/actions';

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
    const { children, auth, cart } = this.props;
    return (
      <div className="main container">
        <AppHeader auth={auth} cart={cart} handleSearch={this.handleSearch} />
        {children}
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth, cart: state.cart }),
  { loadCartIfEmpty }
)(App);
