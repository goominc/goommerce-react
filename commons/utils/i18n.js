// Copyright (C) 2016 Goom Inc. All rights reserved.

const _ = require('lodash');

let store = null;

exports.init = (reduxStore) => {
  store = reduxStore;
};

exports.get = (key) => {
  const state = store.getState();
  const i18n = state.i18n;
  const locale = state.i18n.activeLocale;
  const res = _.get(i18n[locale], key);
  if (!res) {
    return key;
  }
  return res;
};
