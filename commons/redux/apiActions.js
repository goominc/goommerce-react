// Copyright (C) 2016 Goom Inc. All rights reserved.

import { normalize } from 'normalizr';
import createFetchAction from './util/createFetchAction';
import * as schemas from './schemas';
import { simpleNotify, ajaxReturnPromise } from './util/ajaxUtil';

const _ = require('lodash');

export function login(email, password) {
  return createFetchAction({
    type: 'LOGIN',
    endpoint: '/api/v1/login',
    method: 'post',
    body: {
      email,
      password,
    },
    transform: ({ data }) => ({ auth: data }),
  });
}

export function logout() {
  return createFetchAction({
    type: 'LOGOUT',
    endpoint: '/api/v1/login',
    method: 'delete',
  });
}

export function signup(params) {
  return createFetchAction({
    type: 'LOGIN',
    endpoint: '/api/v1/users',
    method: 'post',
    body: params,
    transform: ({ data }) => ({ auth: data }),
  });
}

export function forgotPassword({ email, resetBaseUrl }) {
  return createFetchAction({
    type: 'FORGOT_PASSWORD',
    endpoint: '/api/v1/forgot',
    method: 'post',
    body: { email, resetBaseUrl },
    doDispatch: false,
  });
}

export function resetPassword({ access_token, password }) {
  return createFetchAction({
    type: 'RESET_PASSWORD',
    endpoint: '/api/v1/reset',
    method: 'put',
    body: { access_token, password },
    transform: ({ data }) => ({ auth: data }),
  });
}

export function loadProducts() {
  return createFetchAction({
    type: 'LOAD_PRODUCTS',
    endpoint: '/api/v1/products',
    transform: ({ data }) => normalize(data.products, schemas.products),
    success: {
      pagination: { key: 'products', type: 'REFRESH' },
    },
  });
}

export function loadProduct(id) {
  return createFetchAction({
    type: 'LOAD_PRODUCT',
    endpoint: `/api/v1/products/${id}`,
    transform: ({ data }) => normalize(data, schemas.product),
  });
}

export function loadProductAndThen(id, cb) {
  return (dispatch, getState) => {
    loadProduct(id)(dispatch, getState).then((res) => {
      if (cb) {
        cb(res, dispatch, getState);
      }
    });
  };
}

export function searchProducts(query) {
  return createFetchAction({
    type: 'SEARCH_PRODUCTS',
    endpoint: `/api/v1/products/search?${$.param(query)}`,
    doDispatch: false,
  });
}

export function inipay(orderId) {
  return createFetchAction({
    type: 'INIPAY',
    endpoint: `/api/v1/orders/${orderId}/inipay`,
    doDispatch: false,
  });
}

export function loadCart() {
  return createFetchAction({
    type: 'LOAD_CART',
    endpoint: '/api/v1/carts',
  });
}

export function addCartProduct(productVariantId, count) {
  return createFetchAction({
    type: 'UPDATE_CART',
    endpoint: '/api/v1/carts',
    method: 'post',
    body: { productVariantId, count: count || 1 },
  });
}

export function updateCartProduct(productVariantId, count) {
  return (dispatch, getState) => {
    if (count >= 1) {
      return createFetchAction({
        type: 'UPDATE_CART',
        endpoint: '/api/v1/carts',
        method: 'put',
        body: { productVariantId, count },
      })(dispatch, getState);
    }
    const origCart = getState().cart;
    (origCart.brands || []).forEach((brand) => {
      (brand.products || []).forEach((product) => {
        (product.productVariants || []).forEach((variant) => {
          if (variant.productVariant.id === productVariantId) {
            variant.count = '';
          }
        });
      });
    });
    return dispatch({
      type: 'UPDATE_CART',
      payload: origCart,
    });
  };
}

export function deleteCartProduct(productVariantId) {
  return createFetchAction({
    type: 'UPDATE_CART',
    endpoint: '/api/v1/carts',
    method: 'delete',
    body: { productVariantId },
  });
}

export function createOrder({ productVariants }) {
  return createFetchAction({
    type: 'CREATE_ORDER',
    endpoint: '/api/v1/orders',
    method: 'post',
    body: { productVariants },
    transform: ({ data }) => normalize(data, schemas.order),
  });
}

export function loadOrder(id) {
  return createFetchAction({
    type: 'LOAD_ORDER',
    endpoint: `/api/v1/orders/${id}`,
    transform: ({ data }) => normalize(data, schemas.order),
  });
}

export function loadCategories() {
  return createFetchAction({
    type: 'LOAD_CATEGORIES',
    endpoint: '/api/v1/categories',
  });
}

export function loadAddresses() {
  return createFetchAction({
    type: 'LOAD_ADDRESS',
    endpoint: '/api/v1/users/self/addresses',
    transform: ({ data }) => normalize(data.addresses, schemas.addresses),
  });
}

export function setActiveAddressId(addressId) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.auth.addressId !== addressId) {
      simpleNotify(state.auth, 'PUT', `/api/v1/users/self/addresses/${addressId}/set`, { addressId });
      dispatch({
        type: 'SET_ACTIVE_ADDRESS',
        addressId,
      });
    }
  };
}

export function saveAddress(address) {
  if (address.id) {
    return createFetchAction({
      type: 'UPDATE_ADDRESS',
      endpoint: `/api/v1/users/self/addresses/${address.id}`,
      method: 'put',
      body: _.pick(address, 'countryCode', 'detail'),
      transform: ({ data }) => normalize(data, schemas.address),
    });
  }
  return (dispatch, getState) => {
    return createFetchAction({
      type: 'CREATE_ADDRESS',
      endpoint: '/api/v1/users/self/addresses',
      method: 'post',
      body: address,
      transform: ({ data }) => normalize(data, schemas.address),
    })(dispatch, getState).then((res) => {
      return setActiveAddressId(res.id)(dispatch, getState);
    });
  };
}

// 2016. 03. 06. [heekyu] do not merge setActiveAddress & saveOrderAddress
//                        since there exists circular call threat
export function saveOrderAddress(orderId, address) {
  return (dispatch, getState) => {
    const state = getState();
    simpleNotify(state.auth, 'PUT', `/api/v1/orders/${orderId}/address`, address);
    dispatch({
      type: 'UPDATE_ORDER_ADDRESS',
      orderId,
      address,
    });
  };
}

export function saveDefaultAddressOnCreateOrder(order, addresses) {
  return (dispatch, getState) => {
    if (order.address) {
      return;
    }
    const state = getState();
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i];
      if (address.id === state.auth.addressId) {
        saveOrderAddress(order.id, address)(dispatch, getState);
        return;
      }
    }
  };
}

export function loadMyOrders() {
  return createFetchAction({
    type: 'LOAD_MY_ORDERS',
    endpoint: '/api/v1/users/self/orders',
    transform: ({ data }) => normalize(data.orders, schemas.orders),
    success: {
      pagination: { key: 'myOrders', type: 'REFRESH' },
    },
  });
}

export function loadCartIfEmpty() {
  return (dispatch, getState) => {
    const state = getState();
    if (_.get(state, 'auth.id') && !_.get(state, 'cart.total')) {
      loadCart()(dispatch, getState);
    }
  };
}

export function changeLocale(locale) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.activeLocale === locale) return null;
    if (state.auth && state.auth.id) {
      simpleNotify(state.auth, 'PUT', `/api/v1/users/${state.auth.id}/locale`, { locale });
    }
    const cookie = require('../utils/cookie');
    cookie.set('locale', locale);
    if (state.i18n && state.i18n[locale]) {
      return dispatch({
        type: 'CHANGE_LANGUAGE',
        locale,
      });
    }
    return createFetchAction({
      type: 'LOAD_AND_CHANGE_LANGUAGE',
      endpoint: `/api/v1/i18n/texts/${locale}`,
      success: { locale },
    })(dispatch, getState);
  };
}

export function changeCurrency(currency) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.activeCurrency === currency) return;
    if (state.auth && state.auth.id) {
      simpleNotify(state.auth, 'PUT', `/api/v1/users/${state.auth.id}/currency`, { currency });
    }
    const cookie = require('../utils/cookie');
    cookie.set('currency', currency);
    dispatch({
      type: 'CHANGE_CURRENCY',
      currency,
    });
  };
}

export function loadCMSData(name) {
  return createFetchAction({
    type: 'LOAD_CMS_DATA',
    endpoint: `/api/v1/cms/${name}`,
    success: { name },
  });
}

export function addWish(productId) {
  return createFetchAction({
    type: 'ADD_WISH_LIST',
    endpoint: '/api/v1/users/self/wishes',
    method: 'post',
    body: { productId },
  });
}

export function deleteWish(wishId) {
  return createFetchAction({
    type: 'DELETE_WISH_LIST',
    endpoint: `/api/v1/users/self/wishes/${wishId}`,
    method: 'delete',
    success: { wishId },
  });
}

export function loadWishlist() {
  return createFetchAction({
    type: 'LOAD_WISH_LIST',
    endpoint: '/api/v1/users/self/wishes',
    transform: ({ data }) => normalize(data.wishes, schemas.wishes),
    success: {
      pagination: { key: 'wishes', type: 'REFRESH' },
    },
  });
}

export function addFavoriteBrand(brandId) {
  return createFetchAction({
    type: 'ADD_FAVORITE_BRAND',
    endpoint: '/api/v1/users/self/favoriteBrands',
    method: 'post',
    body: { brandId },
  });
}

export function deleteFavoriteBrand(brandId) {
  return createFetchAction({
    type: 'DELETE_FAVORITE_BRAND',
    endpoint: `/api/v1/users/self/favoriteBrands/${brandId}`,
    method: 'delete',
    success: { brandId },
  });
}

export function loadFavoriteBrandProducts() {
  return (dispatch, getState) => {
    const state = getState();
    if (!_.get(state, 'auth.id')) {
      return;
    }
    const favoriteBrands = state.auth.favoriteBrands || [];
    if (favoriteBrands.length < 1) {
      return;
    }
    const promises = [];
    const count = 4;
    favoriteBrands.forEach((brand) => {
      const url = `/api/v1/products/search?q=&categoryId=&brandId=${brand.id}&offset=0&limit=${count}`;
      promises.push(ajaxReturnPromise(state.auth, 'get', url));
    });
    Promise.all(promises).then((res) => {
      dispatch({
        type: 'LOAD_FAVORITE_BRAND_PRODUCTS',
        brandProducts: res.map((item) => item.products),
      });
    });
  };
}

export function initCartForBigBuyer() {
  return (dispatch, getState) => {
    const state = getState();
    if (!_.get(state, 'auth.id')) {
      return;
    }
    ajaxReturnPromise(state.auth, 'get', '/api/v1/users/self/orders').then((res) => {
      console.log(res);
    });
  };
}

export function searchKeyword(keyword, type, category, brand) {
  return createFetchAction({
    type: 'SEARCH_KEYWORD',
    endpoint: `/api/v1/complete/${keyword}`,
    body: { type, category, brand },
  });
}

export function createMerchandiseProductAndAddToCart(product) {
  // product : { Brand, name, price, color, size }
  return (dispatch, getState) => {
    const state = getState();
    if (!_.get(state, 'auth.id')) {
      return;
    }
    const body = _.pick(product, ['brand', 'name', 'price']);
    ajaxReturnPromise(state.auth, 'post', '/api/v1/merchandise/products', body).then((res) => {
      const body2 = { price: product.price, data: _.pick(product, ['color', 'size']) };
      body2.productId = res.id;
      ajaxReturnPromise(state.auth, 'post', '/api/v1/merchandise/product_variants', body2).then((res2) => {
        addCartProduct(res2.id, 1)(dispatch, getState);
      });
    });
  };
}
