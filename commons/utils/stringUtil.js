// Copyright (C) 2016 Goom Inc. All rights reserved.

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
