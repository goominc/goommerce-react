import { normalize } from 'normalizr';
import createFetchAction from './util/createFetchAction';
import * as schemas from './schemas';

export function login(email, password) {
  return createFetchAction({
    type: 'LOGIN',
    endpoint: '/api/v1/login',
    method: 'post',
    body: {
      email,
      password,
    },
    transform: ({ response }) => ({ auth: response.data }),
  });
}

export function signup(params) {
  return createFetchAction({
    type: 'LOGIN',
    endpoint: '/api/v1/users',
    method: 'post',
    body: params,
    transform: ({ response }) => ({ auth: response.data }),
  });
}

export function loadProducts() {
  return createFetchAction({
    type: 'LOAD_PRODUCTS',
    endpoint: '/api/v1/products',
    transform: ({ response }) => normalize(response.data.products, schemas.products),
    success: {
      pagination: { key: 'products', type: 'REFRESH' },
    },
  });
}

export function loadProduct(id) {
  return createFetchAction({
    type: 'LOAD_PRODUCT',
    endpoint: `/api/v1/products/${id}`,
    transform: ({ response }) => normalize(response.data, schemas.product),
  });
}

export function searchProducts(query) {
  return createFetchAction({
    type: 'SEARCH_PRODUCTS',
    endpoint: '/api/v1/products/search',
    params: query,
    doDispatch: false,
  });
}

export function inicis() {
  return createFetchAction({
    type: 'INICIS',
    endpoint: `/api/inicis`,
    doDispatch: false,
  });
}
