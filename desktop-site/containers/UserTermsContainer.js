// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';

import UserTerms from 'components/user/UserTerms';

export default React.createClass({
  componentDidMount() {
    $('body').scrollTop(0);
  },
  render() {
    return (
      <div className="policies-container">
        <UserTerms />
      </div>
    );
  },
});
