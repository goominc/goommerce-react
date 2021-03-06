// Copyright (C) 2016 Goom Inc. All rights reserved.

import * as ApiAction from 'commons/redux/apiActions';
exports.ApiAction = ApiAction;
import { ajaxReturnPromise } from 'commons/redux/util/ajaxUtil';

export function resetError() {
  return {
    type: 'RESET_ERROR',
  };
}

export function openPopup(popupName) {
  return {
    type: 'OPEN_POPUP',
    popupName,
  };
}

export function closePopup() {
  return {
    type: 'CLOSE_POPUP',
  };
}

export function toggleSearchDropdown() {
  return {
    type: 'TOGGLE_SEARCH_DROPDOWN',
  };
}

export function selectSearchDropdown(category) {
  return {
    type: 'SET_SEARCH_CATEGORY',
    category,
  };
}

export function wrapLogin(cb) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.auth || !state.auth.id) {
      return dispatch(openPopup('login'));
    }
    return cb();
  };
}

export function setCheckoutStep(step) {
  return {
    type: 'CHECKOUT_SET_STEP',
    step,
  };
}

export function checkoutNewAddress() {
  return {
    type: 'CHECKOUT_NEW_ADDRESS',
  };
}

export function checkoutToggleEditAddress() {
  return {
    type: 'CHECKOUT_TOGGLE_EDIT_MODE',
  };
}
export function saveAddressAndThen(order, address) {
  return (dispatch, getState) => {
    ApiAction.saveAddressAndThen(order, address)(dispatch, getState).then(() => {
      dispatch(checkoutToggleEditAddress());
    });
  };
}

// BEGIN Product Detail Page actions
export function setActiveImage(image) {
  return {
    type: 'ACTIVE_IMAGE',
    image,
  };
}
export function selectColor(color) {
  return {
    type: 'PRODUCT_DETAIL_SET_COLOR',
    color,
  };
}
export function selectSize(size) {
  return {
    type: 'PRODUCT_DETAIL_SET_SIZE',
    size,
  };
}
export function addCartAndPopup(...args) {
  return (dispatch, getState) => {
    ApiAction.addCartProduct(...args)(dispatch, getState).then(() => {
      dispatch(openPopup('addCart'));
    });
  };
}
export function addWishAndPopup(...args) {
  return (dispatch, getState) => {
    ApiAction.addWish(...args)(dispatch, getState).then(() => {
      dispatch(openPopup('addWish'));
    });
  };
}
// END Product Detail Page actions

export function setReorderBrand(brand) {
  // 2016. 04. 01. [heekyu] TODO better way...
  $('.product-search-box input').val('');
  return {
    type: 'REORDER_SET_BRAND',
    brand,
  };
}

export function setReorderProduct(product) {
  return {
    type: 'REORDER_SET_PRODUCT',
    product,
  };
}
