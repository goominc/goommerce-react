// Copyright (C) 2016 Goom Inc. All rights reserved.

const _ = require('lodash');

let store = null;

exports.init = (reduxStore) => {
  store = reduxStore;
};

exports.get = (key) => {
  if (!key) {
    return '';
  }
  const state = store.getState();
  const i18n = state.i18n;
  const locale = state.i18n.activeLocale;

  if (_.isObject(key)) {
    return key[locale];
  }
  const res = _.get(i18n[locale], key);
  if (!res) {
    // return key;
    return ''; // there is case when empty string is needed
  }
  return res;
};

exports.getObj = (key) => {
  const res = {};
  const locales = ['en', 'ko', 'zh-cn', 'zh-tw'];
  const state = store.getState();
  locales.forEach((locale) => {
    res[locale] = _.get(state, `i18n.${locale}.${key}`);
  });
  return res;
}
