import merge from 'lodash/object/merge';
import config from '../../config';

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
    return $.ajax({
      url: resolve(endpoint),
      method,
      headers,
      data: body,
    }).then((data, textStatus, jqXHR) => {
      if (doDispatch) {
        dispatch(merge({
          type,
          payload: transform ? transform({ data, state }) : data,
        }, resolve(success)));
      }
      return data;
    }, (jqXHR, textStatus, errorThrown) => {
      if (doDispatch) {
        dispatch(merge({
          type,
          error: jqXHR.responseJSON,
        }, resolve(failure)));
      }
      return Promise.reject(response.data);
    });
  };
}
