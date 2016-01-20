import merge from 'lodash/object/merge';
import config from '../../config';
import axios from 'axios';

export default function createFetchAction(options) {
  const {
    bailout,
    body,
    endpoint,
    method = 'get',
    params,
    transform,
    type,
    doDispatch = true,
  } = options;
  const { request, success = {}, failure = {} } = options;
  return (dispatch, getState) => {
    const state = getState();
    const headers = {
      'Authorization': state.auth.bearer ? `Bearer ${state.auth.bearer}` : '',
    };
    function resolve(obj) {
      return typeof obj === 'function' ? obj(state) : obj;
    }

    if (bailout && bailout(state)) return null;

    if (request && doDispatch) dispatch({ type, ...request });

    const apiRoot = config.apiRoot;
    return axios({
      url: resolve(endpoint),
      baseURL: apiRoot,
      method,
      headers,
      params,
      data: body,
    }).then(response => {
      if (doDispatch) {
        dispatch(merge({
          type,
          payload: transform ? transform({ response, state }) : response.data,
        }, resolve(success)));
      }
      return response.data;
    }).catch(response => {
      if (doDispatch) {
        dispatch(merge({
          type,
          error: response.data,
        }, resolve(failure)));
      }
      return Promise.reject(response.data);
    });
  };
}
