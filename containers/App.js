import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  render() {
    const { children } = this.props;
    return (
      <div className="main container">
        {children}
      </div>
    );
  },
});

export default connect(
)(App);
