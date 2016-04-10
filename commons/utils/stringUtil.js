// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

exports.shorten = (str, maxLength) => {
  if (!str) {
    return str;
  }
  if (!maxLength) {
    maxLength = 11;
  }
  if (str.length <= maxLength) {
    return str;
  }
  return `${str.substring(0, maxLength)}...`;
};

exports.getUserName = (auth) => {
  const firstName = _.get(auth, 'data.firstName');
  const lastName = _.get(auth, 'data.lastName');
  if (firstName && lastName) {
    return `${lastName}${firstName}`;
  }
  if (auth.email) {
    const email = auth.email;
    const idx = email.indexOf('@');
    if (idx > 0) {
      return email.substring(0, idx);
    }
    return email;
  }
  return '';
};
