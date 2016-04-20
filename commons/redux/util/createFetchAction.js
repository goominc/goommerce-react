import _ from 'lodash';

export default function createFetchAction(options) {
  const {
    bailout,
    body,
    endpoint,
    method = 'get',
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

    return $.ajax({
      url: resolve(endpoint),
      method,
      headers,
      data: JSON.stringify(body),
      processData: false,
      contentType: 'application/json',
    }).then((data, textStatus, jqXHR) => {
      if (doDispatch) {
        dispatch(_.merge({
          type,
          payload: transform ? transform({ data, state }) : data,
        }, resolve(success)));
      }
      return data;
    }, (jqXHR, textStatus, errorThrown) => {
      // TODO change this to ajaxUtil.handleErrorDispatch
      if (doDispatch) {
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
        dispatch(_.merge({
          type,
          error,
        }, resolve(failure)));
      }
      // 2016. 02. 01. [heekyu] there are cases that caller cannot handle error
      // action creator must be handle actions via state transition(dispatch)
      // return Promise.reject(errorThrown);
    });
  };
}
