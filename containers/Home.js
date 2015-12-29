import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const HomePage = React.createClass({
  render: function render() {
    return (
      <div>HOME</div>
    );
  },
});

export default connect(
)(HomePage);
