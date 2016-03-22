import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <footer className="gm-footer">
        <div className="copyright">
          <div>
            <p>
            <Link rel="nofollow" to="/">Privacy Policy&nbsp;</Link>
            &nbsp;-&nbsp;
            <Link rel="nofollow" to="/">Terms of use&nbsp;</Link>
            &nbsp;-&nbsp;
            <Link to="/">Site Map</Link>
            </p>
          </div>

          <p>© 2010-2015 <Link to="/" className="text-link">goommerce.com</Link>. All rights reserved.</p>
        </div>
      </footer>
    );
  },
});
