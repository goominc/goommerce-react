// Copyright (C) 2016 Goom Inc. All rights reserved.

function getAjaxData(auth, method, url, body) {
  const headers = {};
  if (auth) {
    headers.Authorization = auth.bearer ? `Bearer ${auth.bearer}` : '';
  }
  const res = {
    url,
    method,
    headers,
    processData: false,
    contentType: 'application/json',
  };
  if (body) {
    res.data = JSON.stringify(body);
  }
  return res;
}

export function ajaxReturnPromise(auth, method, url, body) {
  return $.ajax(getAjaxData(auth, method, url, body));
}

export function simpleNotify(auth, method, url, body) {
  ajaxReturnPromise(auth, method, url, body);
}
