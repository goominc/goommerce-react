// Copyright (C) 2016 Goom Inc. All rights reserved.

exports.getSearchItems = (searchResult, fnGetText) => {
  const res = [];
  if (!searchResult) {
    return res;
  }
  const maxResultCount = 10;
  const count = Math.min((searchResult || []).length, maxResultCount);
  for (let i = 0; i < count; i++) {
    const item = searchResult[i];
    res.push({ text: fnGetText(item), item });
  }
  return res;
};
