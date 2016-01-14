import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    auth: PropTypes.object,
  },
  renderProfile() {
    const { auth } = this.props;
    if (auth.bearer) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/">{auth.email}</Link></li>
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
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">GOOMMERCE</Link>
            </div>
            <div className="collapse navbar-collapse">
              {this.renderProfile()}
            </div>
          </div>
        </nav>
        {children}
      </div>
    );
  },
});

export default connect(
  state => ({ auth: state.auth })
)(App);
