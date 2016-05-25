// Copyright (C) 2016 Goom Inc. All rights reserved.

import { assign, clone, merge, get, set, union, forEach, omit, pick, sortBy } from 'lodash';

const handleFavoriteBrandUpdate = (state, action) => {
  if (action.type === 'ADD_FAVORITE_BRAND') {
    const brand = action.payload;
    const newState = assign({}, state);
    if (!newState.favoriteBrands) {
      newState.favoriteBrands = [];
    }
    newState.favoriteBrands.push(brand);
    return newState;
    // return state;
  } else if (action.type === 'DELETE_FAVORITE_BRAND') {
    for (let i = 0; i < state.favoriteBrands.length; i++) {
      const brand = state.favoriteBrands[i];
      if (brand.id === action.brandId) {
        state.favoriteBrands.splice(i, 1);
        return Object.assign({}, state);
      }
    }
    return state;
  }
  return null;
};
const handleAddressUpdate = (state, action) => {
  if (action.type === 'SET_ACTIVE_ADDRESS') {
    return assign({}, state, { addressId: action.addressId });
  }
  return null;
};
function auth(state = {}, action) {
  const favoriteBrandState = handleFavoriteBrandUpdate(state, action);
  if (favoriteBrandState) {
    return favoriteBrandState;
  }
  const addressState = handleAddressUpdate(state, action);
  if (addressState) {
    return addressState;
  }
  if (action.type === 'LOGOUT' && !action.error) {
    return {};
  }
  if (action.payload && action.payload.auth) {
    return merge({}, state, action.payload.auth);
  }
  return state;
}

function cart(state = {}, action) {
  if (action.type === 'UPDATE_CART' || action.type === 'LOAD_CART' || action.type === 'UPDATE_CART_MULTIPLE') {
    return { ...action.payload };
  } else if (action.type === 'ADD_BRAND_TO_CART') {
    // 2016. 03. 30. [heekyu] this is local action.
    const brands = clone(state.brands) || [];
    brands.push({ brand: action.brand, products: [] });
    return assign({}, state, { brands: sortBy(brands, 'brand.name.ko') });
  }
  return state;
}

function cms(state = {}, action) {
  if (action.type === 'LOAD_CMS_DATA') {
    const res = action.payload;
    const newState = assign({}, state);
    newState[action.name] = res;
    return newState;
  }
  return state;
}

const handleWishUpdate = (state, action) => {
  if (action.type === 'ADD_WISH_LIST') {
    // 2016. 03. 04. [heekyu] added data does not need in normal cases.
    return state;
    /*
    const wish = action.payload;
    const newState = assign({}, state);
    newState.wishes[wish.id] = wish;
    return newState;
    */
  } else if (action.type === 'DELETE_WISH_LIST') {
    return Object.assign({}, state, { wishes: omit(state.wishes, action.wishId) });
  }
  return null;
};

const handleOrderAddressUpdate = (state, action) => {
  if (action.type === 'UPDATE_ORDER_ADDRESS') {
    state.orders[action.orderId].address = action.address;
    return assign({}, state);
  }
  return null;
};

// Updates an entity cache in payload to any action with payload.entities.
function entities(state = { users: {}, products: {}, orders: {}, addresses: {}, wishes: {}, favoriteBrands: {} }, action) {
  const wishState = handleWishUpdate(state, action);
  if (wishState) {
    return wishState;
  }
  const orderState = handleOrderAddressUpdate(state, action);
  if (orderState) {
    return orderState;
  }
  if (action.type === 'RESET_ENTITIES') {
    const nextState = assign({}, state);
    nextState[action.entity] = {};
    return nextState;
  }
  const nextState = assign({}, state);
  forEach(get(action, 'payload.entities'), (val, key) => {
    if (get(action, 'meta.clear')) {
      nextState[key] = val;
      return;
    }
    nextState[key] = assign({}, state[key], val);
  });
  return nextState;
}

function favoriteBrand(state = {}, action) {
  if (action.type === 'LOAD_FAVORITE_BRAND_PRODUCTS') {
    return Object.assign({}, state, { brandProducts: action.brandProducts });
  } else if (action.type === 'DELETE_FAVORITE_BRAND_PRODUCTS') {
    for (let i = 0; i < state.brandProducts.length; i++) {
      if (state.brandProducts[i][0].brand.id === action.brandId) {
        state.brandProducts.splice(i, 1);
        return merge({}, { brandProducts: state.brandProducts });
      }
    }
    return state;
  }
  return state;
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
    return assign({}, state, { activeLocale: action.locale });
  } else if (action.type === 'LOAD_AND_CHANGE_LANGUAGE') {
    state.activeLocale = action.locale;
    const next = assign({}, state, { activeLocale: action.locale });
    next[action.locale] = action.payload;
    return next;
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

function categories(state = {}, action) {
  function flatten(category, map) {
    map[category.id] = category;
    category.children.forEach((child) => flatten(child, map));
  }

  if (action.type !== 'LOAD_CATEGORIES') {
    return state;
  }

  const newState = {};
  flatten(action.payload, newState);
  newState.tree = action.payload;
  return newState;
}

function search(state = { brand: {} }, action) {
  if (action.type === 'BRAND_SEARCH_RESULT') {
    const newState = Object.assign({}, state,
      { brand: pick(action, ['brands', 'offset', 'limit', 'text']) }
    );
    return newState;
  } else if (action.type === 'RESET_SEARCH_RESULT') {
    return omit(state, action.target);
  } else if (action.type === 'PRODUCT_SEARCH_RESULT') {
    const newState = Object.assign({}, state,
      { product: pick(action, ['products', 'offset', 'limit', 'text']) }
    );
    return newState;
  }
  return state;
}

function merchandise(state = {}, action) {
  if (action.type === 'LOAD_MERCHANDISE') {
    return Object.assign({}, state, action.payload);
  }
  return state;
}

function misc(state = {}, action) {
  if (action.type === 'AFTER_LOGIN_PAGE') {
    return Object.assign({}, state, { nextState: action.nextState });
  }
  return state;
}

const reducers = {
  auth,
  cart,
  categories,
  cms,
  currency,
  entities,
  favoriteBrand,
  i18n,
  merchandise,
  misc,
  pagination,
  search,
};

exports.reducers = reducers;
