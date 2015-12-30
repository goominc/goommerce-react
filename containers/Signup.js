import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Signup = React.createClass({
  render: function render() {
    return (
      <form className="form-signup">
        <h2 className="form-signup-heading">Please sign up</h2>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
      </form>
    );
  },
});

export default connect(
)(Signup);
