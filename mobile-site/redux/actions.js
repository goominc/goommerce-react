// Copyright (C) 2016 Goom Inc. All rights reserved.

import * as ApiAction from 'commons/redux/apiActions';
exports.ApiAction = ApiAction;

export function resetError() {
  return {
    type: 'RESET_ERROR',
  };
}

export function setCheckoutStep(step) {
  return {
    type: 'CHECKOUT_SET_STEP',
    step,
  };
}

export function toggleMenu() {
  return {
    type: 'TOGGLE_MENU',
  };
}

export function toggleSignRegister(show, flag = 'sign') {
  return {
    type: 'TOGGLE_SIGN_REGISTER',
    show,
    flag,
  };
}

export function toggleSearch() {
  return {
    type: 'TOGGLE_SEARCH',
  };
}

export function setHeader(showLogo, showSearch, showCart, titleText) {
  return {
    type: 'SET_HEADER',
    showLogo,
    showSearch,
    showCart,
    titleText,
  };
}
/* ProductList */
export function changeViewType() {
  return {
    type: 'CHANGE_LIST_VIEW',
  };
}

export function toggleProductSort() {
  return {
    type: 'TOGGLE_PRODUCT_SORT',
  };
}

export function toggleProductFilter() {
  return {
    type: 'TOGGLE_PRODUCT_FILTER',
  };
}

/* ProductDetail */
export function toggleProductCart() {
  return {
    type: 'TOGGLE_PRODUCT_CART',
  };
}

export function setProductColor(color) {
  return {
    type: 'PRODUCT_VARIANT_SET_COLOR',
    color,
  };
}

export function setProductSize(size) {
  return {
    type: 'PRODUCT_VARIANT_SET_SIZE',
    size,
  };
}
