import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { History, Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import AppHeader from '../components/AppHeader';

require('../stylesheets/main.scss');

export default React.createClass({
  propTypes: {
    children: PropTypes.node,
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
