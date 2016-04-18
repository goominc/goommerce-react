// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import UserPolicies from 'components/user/UserPolicies';

export default React.createClass({
  componentDidMount() {
    $('body').scrollTop(0);
  },
  render() {
    return (
      <div className="policies-container">
        <UserPolicies />
      </div>
    );
  },
});
