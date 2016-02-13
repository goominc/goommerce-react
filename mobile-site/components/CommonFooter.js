import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <footer className="gm-footer">
        <div className="copyright">
          <div>
            <p>
            <Link rel="nofollow" to="http://news.alibaba.com/article/detail/help/100453303-1-privacy-policy.html">Privacy Policy&nbsp;</Link>
            &nbsp;-&nbsp;
            <Link rel="nofollow" to="http://news.alibaba.com/article/detail/help/100453293-1-terms-use.html">Terms of use&nbsp;</Link>
            &nbsp;-&nbsp;
            <Link to="http://m.aliexpress.com/sitemap.html">Site Map</Link>
            </p>
          </div>

          <p>© 2010-2015 <Link to="http://m.aliexpress.com/website.html" className="text-link">goommerce.com</Link>. All rights reserved.</p>
        </div>
      </footer>
    );
  },
});
