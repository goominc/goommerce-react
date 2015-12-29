import merge from 'lodash/object/merge';
import config from '../config';
if (typeof fetch === 'undefined') {
  require('isomorphic-fetch');
}

export default function createFetchAction(options) {
  const {
    bailout,
    body,
    credentials,
    endpoint,
    method = 'GET',
    transform,
    type,
    doDispatch = true,
  } = options;
  const { request, success = {}, failure = {} } = options;
  return (dispatch, getState) => {
    const state = getState();
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': state.auth.token ? `Bearer ${state.auth.token}` : '',
    };
    function resolve(obj) {
      return typeof obj === 'function' ? obj(state) : obj;
    }

    if (bailout && bailout(state)) return null;

    if (request && doDispatch) dispatch({ type, ...request });

    const apiRoot = config.get('apiRoot') || '';
    return fetch(apiRoot + resolve(endpoint), {
      method,
      headers,
      credentials,
      body: JSON.stringify(body),
    }).then(response => response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        if (doDispatch) {
          dispatch(merge({
            type,
            error: json,
          }, resolve(failure)));
        }
        return Promise.reject(json);
      }
      if (doDispatch) {
        dispatch(merge({
          type,
          payload: transform ? transform({ json, response, state }) : json,
        }, resolve(success)));
      }
      return Promise.resolve(json);
    });
  };
}
