// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div>
        <div className="signup-footer-link-line">
          <Link className="item" to="/">회사소개</Link>
          <Link className="item" to="/">이용약관</Link>
          <Link className="item" to="/">개인정보 취급방침</Link>
          <Link className="item" to="/">제휴안내</Link>
        </div>
        <div className="signup-footer-copywrite">
          APRIL INC.    2016 LINKSHOPS.COM. ALL RIGHTS RESERVED.
        </div>
      </div>
    );
  },
});
