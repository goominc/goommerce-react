// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ApiAction } from 'redux/actions';

// TODO remove same logic from App.js
const GlobalWrapper = React.createClass({
  propTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    children: PropTypes.node,
    closePopup: PropTypes.func,
    error: PropTypes.object,
  },
  childContextTypes: {
    activeLocale: PropTypes.string,
    activeCurrency: PropTypes.string,
    currencySign: PropTypes.object,
    ApiAction: PropTypes.object,
  },
  getChildContext() {
    const res = {
      activeLocale: this.props.activeLocale,
      activeCurrency: this.props.activeCurrency,
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
  (state, ownProps) => ({
    activeLocale: state.i18n.activeLocale,
    activeCurrency: state.currency.activeCurrency,
  }),
  Object.assign({}, ApiAction)
)(GlobalWrapper);
