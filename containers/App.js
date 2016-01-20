import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { History } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

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
              <form className="navbar-form navbar-left" role="search" onSubmit={this.handleSearch}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    required
                    valueLink={this.linkState('query')}
                  />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
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
