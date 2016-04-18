// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

import ReorderCart from './ReorderCart';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  propTypes: {
    cart: PropTypes.object,
  },
  render() {
    return (
      <div className="mypage-right-box">
        <h2>{i18n.get('word.reorder')}</h2>
        <div className="order-list-container">
          <ReorderCart {...this.props} />
        </div>
      </div>
    );
  },
});
