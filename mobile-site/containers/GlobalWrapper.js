// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction } from 'redux/actions';

// TODO remove same logic from App.js
const GlobalWrapper = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  childContextTypes: {
    currencySign: PropTypes.object,
    ApiAction: PropTypes.object,
  },
  getChildContext() {
    const res = {
      currencySign: { KRW: '￦', USD: '$', CNY: '￥' }, // TODO remove
    };
    const actions = {};
    const apiFuncs = Object.keys(ApiAction);
    apiFuncs.forEach((api) => {
      actions[api] = this.props[api];
    });
    res.ApiAction = actions;
    return res;
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  },
});

export default connect(
  undefined,
  Object.assign({}, ApiAction)
)(GlobalWrapper);
