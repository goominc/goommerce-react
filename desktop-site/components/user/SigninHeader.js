// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { Link } from 'react-router';

import { constants } from 'commons/utils/constants';

export default React.createClass({
  render() {
    return (
      <div className="signin-header-box">
        <Link to="/">
          <img src={`${constants.resourceRoot}/header/logo.png`} />
        </Link>
      </div>
    );
  },
});
