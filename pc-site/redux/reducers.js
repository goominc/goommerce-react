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

// BEGIN page-wide reducers
function pageProductDetail(state = {}, action) {
  if (action.type === 'ACTIVE_IMAGE') {
    return assign({}, state, { image_url: action.url });
  } else if (action.type === 'CHANGE_VARIANT_SELECTION') {
    return assign({}, state, { selected_variant: action.selected_variant });
  }
  return state;
}
function pageProductList(state = {}, action) {
  // TODO query related state management
  return state;
}
const pageReducers = combineReducers({
  pageProductDetail,
  pageProductList,
});
// END page-wide reducers

const rootReducer = combineReducers(
  Object.assign({}, CommonReducers.reducers, { errorHandler, checkout, page: pageReducers } )
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
