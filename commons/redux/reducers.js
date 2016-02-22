// Copyright (C) 2016 Goom Inc. All rights reserved.

import { assign, merge, get, set, union, forEach, omit } from 'lodash';

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
function entities(state = { users: {}, products: {}, orders: {}, addresses: {} }, action) {
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

function i18n(state = {}, action) {
  if (action.type === 'CHANGE_LANGUAGE') {
    state.activeLocale = action.locale;
    return state;
  } else if (action.type === 'LOAD_AND_CHANGE_LANGUAGE') {
    state[action.locale] = action.payload;
    state.activeLocale = action.locale;
    return state;
  }
  return state;
}
function currency(state = {}, action) {
  if (action.type === 'CHANGE_CURRENCY') {
    state.activeCurrency = action.currency;
    return state;
  }
  return state;
}

function settings(state = {}, action) {
  if (action.type === 'SET_ACTIVE_ADDRESS') {
    state.activeAddressId = action.addressId;
    return state;
  }
  return state;
}

const reducers = {
  auth,
  cart,
  entities,
  pagination,
  i18n,
  currency,
  settings,
};

exports.reducers = reducers;
