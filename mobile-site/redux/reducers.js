import { assign, merge, get, set, union, forEach, omit } from 'lodash';
import { combineReducers } from 'redux';
import CommonReducers from '../../commons/redux/reducers';

function errorHandler(state = {}, action) {
  if (action.type === 'RESET_ERROR') {
    return assign({}, state, {error: {}});
  }
  return state;
}

function checkout(state = {}, action) {
  if (action.type === 'CHECKOUT_SET_STEP') {
    const nextState = assign({}, state);
    nextState.step = action.step;
    return nextState;
  }
  return state;
}

const rootReducer = combineReducers(
  Object.assign({}, CommonReducers.reducers, { errorHandler, checkout } )
);

export default (state = {}, action) => {
  if (action.error) {
    return assign({}, state, { errorHandler: {error: action.error} });
  }
  if (action.type === 'RESET') {
    return rootReducer({}, action);
  }
  return rootReducer(state, action);
};
