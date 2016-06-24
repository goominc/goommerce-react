// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import UserTerms from 'commons/components/user/UserTerms';
import UserTermsCn from 'commons/components/user/UserTermsCn';

export default React.createClass({
  contextTypes: {
    activeLocale: PropTypes.string,
  },
  componentDidMount() {
    $('body').scrollTop(0);
  },
  render() {
    const { activeLocale } = this.context;
    const isChinaLocale = activeLocale === 'zh-cn' || activeLocale === 'zh-tw';
    return (
      <div className="policies-container">
        { isChinaLocale ? <UserTermsCn /> : <UserTerms /> }
      </div>
    );
  },
});
