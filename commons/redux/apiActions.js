// Copyright (C) 2016 Goom Inc. All rights reserved.

import { normalize } from 'normalizr';
import createFetchAction from './util/createFetchAction';
import * as schemas from './schemas';
import { simpleNotify, ajaxReturnPromise, handleErrorAlert } from './util/ajaxUtil';

const _ = require('lodash');

import roleUtil from 'commons/utils/roleUtil';

export function login(body, router) {
  return (dispatch, getState) => {
    const state = getState();
    return ajaxReturnPromise(state.auth, 'post', '/api/v1/login', body).then((data) => {
      dispatch({
        type: 'LOGIN',
        payload: { auth: data },
      });
      if (router) {
        let nextLocation = '/';
        if (_.get(state, 'misc.nextState.location')) {
          nextLocation = state.misc.nextState.location;
          dispatch({
            type: 'AFTER_LOGIN_PAGE',
            nextState: null,
          });
        }
        router.push(nextLocation);
      }
    }, () => window.alert('Invalid username/password'));
  };
}

export function logout() {
  return createFetchAction({
    type: 'LOGOUT',
    endpoint: '/api/v1/login',
    method: 'delete',
  });
}

export function signup(params) {
  return (dispatch, getState) => {
    const state = getState();
    return ajaxReturnPromise(state.auth, 'post', '/api/v1/users', params).then((data) => {
      dispatch({
        type: 'LOGIN',
        payload: { auth: data },
      });
    }, (jqXHR, textStatus, errorThrown) => handleErrorAlert(jqXHR, textStatus, errorThrown));
  };
}

export function updateUser(params) {
  return createFetchAction({
    type: 'LOGIN',
    endpoint: '/api/v1/users/self',
    method: 'put',
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
  return () => {
    // 2016. 04. 21. [heekyu] do not use 'dispatch' nor 'getState'
    return ajaxReturnPromise({ bearer: access_token }, 'put', '/api/v1/users/self/reset_password', { password })
      .then((data) => data
        // , (jqXHR, textStatus, errorThrown) => handleErrorAlert(jqXHR, textStatus, errorThrown));
        // TODO server must return right message
        , () => window.alert('인증 토큰이 만료되었습니다. 비밀번호 찾기를 다시 시도해 주세요'));
  };
  /*
  return createFetchAction({
    type: 'RESET_PASSWORD',
    endpoint: '/api/v1/users/self/reset_password',
    method: 'put',
    body: { access_token, password },
    transform: ({ data }) => ({ auth: data }),
  });
  */
}

export function loadHotProducts() {
  return createFetchAction({
    type: 'LOAD_HOT_PRODUCTS',
    endpoint: '/api/v1/products/hot',
    transform: ({ data }) => normalize(data.products, schemas.hotProducts),
    success: {
      pagination: { key: 'hotProducts', type: 'REFRESH' },
    },
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

export function inipay(orderId) {
  return createFetchAction({
    type: 'INIPAY',
    endpoint: `/api/v1/orders/${orderId}/inipay`,
    doDispatch: false,
  });
}

export function loadCart() {
  return (dispatch, getState) => {
    createFetchAction({
      type: 'LOAD_CART',
      endpoint: '/api/v1/carts',
    })(dispatch, getState).then(() => {
      // 2016. 04. 01. [heekyu] set default brand for reorder
      const state = getState();
      const defaultReorderBrand = _.get(state.cart, 'brands[0].brand');
      if (defaultReorderBrand) {
        dispatch({
          type: 'REORDER_SET_BRAND',
          brand: defaultReorderBrand,
        });
      }
    });
  };
}

export function addCartProduct(productVariantId, count) {
  return createFetchAction({
    type: 'UPDATE_CART',
    endpoint: '/api/v1/carts',
    method: 'post',
    body: { productVariantId, count: count || 1 },
  });
}

export function addCartProducts(productVariants) {
  // 2016. 04. 04. [heekyu] TODO add multiple variants in a call
  return createFetchAction({
    type: 'UPDATE_CART_MULTIPLE',
    endpoint: '/api/v1/carts',
    method: 'post',
    body: productVariants,
  });
}

export function updateCartProduct(productVariantId, count) {
  return (dispatch, getState) => {
    if (count >= 1) {
      const type = 'UPDATE_CART';
      return ajaxReturnPromise(getState().auth, 'put', '/api/v1/carts', { productVariantId, count }).then((res) => {
        dispatch({
          type,
          payload: res,
        });
      }, (err) => {
        // 2016. 04. 02. [heekyu] try add product
        ajaxReturnPromise(getState().auth, 'post', '/api/v1/carts', { productVariantId, count }).then((res) => {
          dispatch({
            type,
            payload: res,
          });
        }, () => dispatch({ type, error: err.responseJSON }) // TODO enhance error handling
        );
      });
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

export function deleteCartAllProduct() {
  return (dispatch, getState) => {
    if (window.confirm('카트의 모든 상품이 삭제됩니다')) {
      const state = getState();
      ajaxReturnPromise(state.auth, 'delete', '/api/v1/carts').then((data) => {
        dispatch({
          type: 'UPDATE_CART',
          payload: data,
        });
      });
    }
  };
}

export function updateBrandAdjustment(brandId, KRW) {
  return createFetchAction({
    type: 'UPDATE_CART',
    endpoint: '/api/v1/carts/adjustment',
    method: 'put',
    body: { brandId, KRW },
  });
}

export function addBrandToCart(brand) {
  return {
    type: 'ADD_BRAND_TO_CART',
    brand,
  };
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

export function createOrderFromCart() {
  return createFetchAction({
    type: 'CREATE_ORDER',
    endpoint: '/api/v1/orders/big',
    method: 'post',
    transform: ({ data }) => normalize(data, schemas.order),
  });
}

export function startOrderProcessing(orderId, paymentStatus) {
  return createFetchAction({
    type: 'START_ORDER_PROCESSING',
    endpoint: `/api/v1/orders/${orderId}/start_processing`,
    method: 'post',
    body: { paymentStatus },
    transform: ({ data }) => normalize(data, schemas.order),
  });
}

export function finalizeOrder(orderId, finalShippingCostKRW) {
  return createFetchAction({
    type: 'FINALIZE_ORDER',
    endpoint: `/api/v1/orders/${orderId}/finalize`,
    method: 'put',
    body: { finalShippingCostKRW },
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
    success: { meta: { clear: true } },
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

export function deleteAddress(address) {
  return (dispatch, getState) => {
    let state = getState();
    const addressId = address.id;
    return ajaxReturnPromise(state.auth, 'delete', `/api/v1/users/self/addresses/${addressId}`).then(() => {
      return loadAddresses()(dispatch, getState).then(() => {
        state = getState(); // state will be updated
        if (state.auth.addressId === addressId) {
          const addressIds = Object.keys(state.entities.addresses);
          if (addressIds.length) {
            setActiveAddressId(+addressIds[0])(dispatch, getState);
          }
        }
      });
    });
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
    // TODO check if buyer role
    if (roleUtil.hasBuyerRole(state.auth) && !_.get(state, 'cart.total')) {
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

export function loadWishlist() {
  return createFetchAction({
    type: 'LOAD_WISH_LIST',
    endpoint: '/api/v1/users/self/wishes?limit=200',
    transform: ({ data }) => normalize(data.wishes, schemas.wishes),
    success: {
      pagination: { key: 'wishes', type: 'REFRESH' },
    },
  });
}

export function addWish(productId) {
  return (dispatch, getState) => {
    const state = getState();
    return ajaxReturnPromise(state.auth, 'post', '/api/v1/users/self/wishes', { productId }).then(() => {
      loadWishlist()(dispatch, getState);
    });
  };
}

export function deleteWish(wishId) {
  return (dispatch, getState) => {
    const state = getState();
    return ajaxReturnPromise(state.auth, 'delete', `/api/v1/users/self/wishes/${wishId}`).then(() => {
      dispatch({
        type: 'DELETE_WISH_LIST',
        wishId,
      });
    });
  };
}

export function addFavoriteBrand(brandId) {
  return createFetchAction({
    type: 'ADD_FAVORITE_BRAND',
    endpoint: '/api/v1/users/self/favoriteBrands',
    method: 'post',
    body: { brandId },
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
      dispatch({
        type: 'LOAD_FAVORITE_BRAND_PRODUCTS',
        brandProducts: [],
      });
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

export function deleteFavoriteBrand(brandId) {
  return (dispatch, getState) => {
    const state = getState();
    // TODO handle error
    return ajaxReturnPromise(state.auth, 'delete', `/api/v1/users/self/favoriteBrands/${brandId}`).then(() => {
      dispatch({
        type: 'DELETE_FAVORITE_BRAND',
        brandId,
      });
      // loadFavoriteBrandProducts()(dispatch, getState);
      dispatch({
        type: 'DELETE_FAVORITE_BRAND_PRODUCTS',
        brandId,
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

export function loadMerchandiseProducts() {
  return createFetchAction({
    type: 'LOAD_MERCHANDISE',
    endpoint: '/api/v1/merchandise',
  });
}

const createMerchandiseVariant = (auth, productId, reorderProduct) => {
  const body = {
    productId,
    price: reorderProduct.price,
    data: _.pick(reorderProduct, ['color', 'size']),
  };
  return ajaxReturnPromise(auth, 'post', '/api/v1/merchandise/product_variants', body);
};

export function createMerchandiseProductAndAddToCart(product) {
  // product : { brandId, name, price, color, size }
  return (dispatch, getState) => {
    const state = getState();
    if (!_.get(state, 'auth.id')) {
      // TODO alert?
      return;
    }
    if (!product.brandId) {
      window.alert('code error! brand must be exist');
      return;
    }
    const body = _.pick(product, ['name', 'price']);
    body.brand = { id: product.brandId };
    ajaxReturnPromise(state.auth, 'post', '/api/v1/merchandise/products', body).then((res) => {
      createMerchandiseVariant(state.auth, res.id, product).then((res2) => {
        addCartProduct(res2.id, product.count || 1)(dispatch, getState);
        // 2016. 04. 13. [heekyu] load merchandise concurrently
        loadMerchandiseProducts()(dispatch, getState);
      });
    });
  };
}

// 2016. 03. 30. [heekyu] brand, product, productVariant may be real or virtual
export function addCartProductOnReorder(product) {
  // product : { brandId, name, price, color, size }
  // when product is real, product.product exists
  // 1. check if product is real or merchandise
  return (dispatch, getState) => {
    const state = getState();
    if (!_.get(state, 'auth.id')) {
      // TODO alert?
      return;
    }
    let url = `/api/v1/products/search?q=${product.name}`;
    if (product.brandId) {
      url += `&brandId=${product.brandId}`;
    }
    const addRealProduct = (realProduct, reorderProduct) => {
      const realVariants = realProduct.productVariants || [];
      for (let i = 0; i < realVariants.length; i++) {
        const realVariant = realVariants[i];
        const color = _.get(realVariant, 'data.color');
        const size = _.get(realVariant, 'data.size');
        if (color === reorderProduct.color && size === reorderProduct.size) {
          // real variant!
          console.log('Product is REAL, variant is REAL');
          addCartProduct(realVariant.id, 1)(dispatch, getState);
          return;
        }
      }
      // merchandise variant!
      console.log('Product is REAL, variant is MERCHANDISSE');
      createMerchandiseVariant(state.auth, realProduct.id, reorderProduct).then((res) => {
        addCartProduct(res.id, 1)(dispatch, getState);
        // 2016. 04. 13. [heekyu] load merchandise concurrently
        loadMerchandiseProducts()(dispatch, getState);
      });
    };
    if (product.product) {
      addRealProduct(product.product, product);
      return;
    }
    ajaxReturnPromise(state.auth, 'get', url).then((res) => {
      // Warning: this API may not return exact product since search results are many
      const products = res.products || [];
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        if (_.get(p, 'name.ko') === product.name) {
          // real product
          addRealProduct(p, product);
          return;
        }
      }
      // merchandise product
      console.log('Product is MERCHANDISSE, variant is MERCHANDISSE');
      createMerchandiseProductAndAddToCart(product)(dispatch, getState);
    });
  };
}

export function resetSearchResult(target) {
  // this is local action
  return {
    type: 'RESET_SEARCH_RESULT',
    target,
  };
}

const doSearch = (query, offset = 0, limit = 10, key, actionType) => (dispatch, getState) => {
  const state = getState();
  query.offset = offset;
  query.limit = limit;
  const url = `/api/v1/${key}s/search?${$.param(query)}`;
  ajaxReturnPromise(state.auth, 'get', url).then((res) => {
    const action = {
      type: actionType,
      // TODO handle pagination info
      offset,
      limit,
      text: query.q,
    };
    action[`${key}s`] = res[`${key}s`].sort((a, b) => (
      (_.get(a, 'name.ko') || '').localeCompare(_.get(b, 'name.ko') || '')
    ));
    dispatch(action);
  });
};

export function searchBrands(text, offset, limit) {
  return (dispatch, getState) => {
    const query = { q: text };
    const key = 'brand';
    if (!query || !query.q) {
      dispatch(resetSearchResult(key));
      return;
    }
    doSearch(query, offset, limit, key, 'BRAND_SEARCH_RESULT')(dispatch, getState);
  };
}

export function searchProducts(query, offset, limit) {
  return doSearch(query, offset, limit, 'product', 'PRODUCT_SEARCH_RESULT');
}

export function fakeLogin(userId) {
  return (dispatch, getState) => {
    const state = getState();
    ajaxReturnPromise(state.auth, 'get', `/api/v1/users/${userId}`).then((data) => {
      dispatch({
        type: 'LOGIN',
        payload: { auth: data },
      });
    });
  };
}

export function loadBuildings() {
  return createFetchAction({
    type: 'LOAD_BUILDINGS',
    endpoint: '/api/v1/buildings/brands',
    transform: ({ data }) => normalize(data.buildings, schemas.buildings),
    success: {
      pagination: { key: 'buildings', type: 'REFRESH' },
    },
  });
}
