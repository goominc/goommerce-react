import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Home = React.createClass({
  render: function render() {
    return (
      <div>HOME</div>
    );
  },
});

export default connect(
)(Home);
