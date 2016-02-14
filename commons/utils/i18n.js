// Copyright (C) 2016 Goom Inc. All rights reserved.

const _ = require('lodash');

let store = null;

exports.init = (reduxStore) => {
  store = reduxStore;
};

exports.get = (key) => {
  const i18n = store.getState().i18n;
  const res = _.get(i18n[i18n.activeLang], key);
  if (!res) {
    return key;
  }
  return res;
};
