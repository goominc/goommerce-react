// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import { getUserTerms } from 'commons/components/I18nComponentSelector';

export default React.createClass({
  contextTypes: {
    activeLocale: PropTypes.string,
  },
  componentDidMount() {
    $('body').scrollTop(0);
  },
  render() {
    const { activeLocale } = this.context;
    return (
      <div className="policies-container">
        { getUserTerms(activeLocale) }
      </div>
    );
  },
});
