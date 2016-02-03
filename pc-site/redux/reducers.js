import { assign, merge, get, set, union, forEach, omit } from 'lodash';
import { combineReducers } from 'redux';

function auth(state = {}, action) {
  if (action.type === 'LOGOUT' && !action.error) {
    return {};
  }
  if (action.payload && action.payload.auth) {
    return merge({}, state, action.payload.auth);
  }
  return state;
}

function cart(state = {}, action) {
  if (action.type === 'UPDATE_CART' || action.type === 'LOAD_CART') {
    return action.payload;
  }
  return state;
}

// Updates an entity cache in payload to any action with payload.entities.
function entities(state = { users: {}, products: {}, orders: {} }, action) {
  const nextState = assign({}, state);
  forEach(get(action, 'payload.entities'), (val, key) => {
    if (get(action, 'meta.entities.update')) {
      const next = nextState[key] = assign({}, state[key]);
      forEach(val, (entity, id) => {
        next[id] = merge({}, next[id], entity);
      });
    } else {
      nextState[key] = assign({}, state[key], val);
    }
  });
  return nextState;
}

// Updates the pagination data for different actions.
function pagination(state = {}, action) {
  function mergeId(type, curIds, result) {
    if (result) {
      const newIds = Array.isArray(result) ? result : [result];
      if (type === 'PREPEND') return union(newIds, curIds);
      if (type === 'REFRESH') return newIds;
      return union(curIds, newIds);
    }
    return Array.isArray(curIds) ? curIds : [];
  }

  if (action.pagination) {
    const { key, type } = action.pagination;
    const current = get(state, key, {});

    const { result, nextPageUrl, isFetching } = action.payload;
    const nextIds = mergeId(type, current.ids, result);

    return set(merge({}, state), key, {
      ids: nextIds,
      nextPageUrl,
      isFetching: isFetching || false,
    });
  }
  return state;
}

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

const rootReducer = combineReducers({
  auth,
  cart,
  entities,
  pagination,
  errorHandler,
  checkout,
});

export default (state = {}, action) => {
  if (action.error) {
    return assign({}, state, { errorHandler: {error: action.error} });
  }
  if (action.type === 'RESET') {
    return rootReducer({}, action);
  }
  return rootReducer(state, action);
};
