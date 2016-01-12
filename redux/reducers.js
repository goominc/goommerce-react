import { assign, merge, get, set, union, forEach } from 'lodash';
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

// Updates an entity cache in payload to any action with payload.entities.
function entities(state = { users: {}, products: {}, shortens: {} }, action) {
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

const rootReducer = combineReducers({
  auth,
  entities,
  pagination,
});

export default (state = {}, action) => {
  if (action.type === 'RESET') {
    return rootReducer({}, action);
  }
  return rootReducer(state, action);
};
