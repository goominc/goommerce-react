// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

exports.getSearchItems = (searchResult, dataKey) => {
  const res = [];
  if (!searchResult) {
    return res;
  }
  const maxResultCount = 10;
  const count = Math.min((searchResult || []).length, maxResultCount);
  for (let i = 0; i < count; i++) {
    const item = searchResult[i];
    res.push({ text: _.get(item, dataKey), item });
  }
  return res;
};
