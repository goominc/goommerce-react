// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

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

const getErrorObj = (jqXHR, textStatus, errorThrown) => {
  let error = jqXHR.responseJSON;
  if (!error) {
    if (errorThrown) {
      error = { message: errorThrown };
    } else if (jqXHR.status === 0) {
      error = { message: 'Network Error' };
    } else {
      error = { message: 'Unknown Error' };
    }
  }
  return error;
};

export function handleErrorDispatch(jqXHR, textStatus, errorThrown, dispatch) {
  const error = getErrorObj(jqXHR, textStatus, errorThrown);
  if (dispatch) {
    dispatch({
      type: 'FIRE_ERROR',
      error,
    });
  }
}

export function handleErrorAlert(jqXHR, textStatus, errorThrown) {
  const error = getErrorObj(jqXHR, textStatus, errorThrown);
  window.alert(error.message);
}
