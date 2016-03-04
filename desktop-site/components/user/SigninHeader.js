import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div className="signin-header-box">
        <Link to="/">
          <img src="http://www.linkshops.com/skin/frontend/linkshops2nd/default/images/logo.png" alt="Linkshops"/>
          <span>Dongdaemun Shopping, Dongdaemun Living</span>
        </Link>
      </div>
    );
  },
});
