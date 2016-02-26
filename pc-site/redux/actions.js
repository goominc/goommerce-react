// Copyright (C) 2016 Goom Inc. All rights reserved.

import * as ApiAction from '../../commons/redux/apiActions';
exports.ApiAction = ApiAction;

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
// 2016. 02. 25. [heekyu] use this when intuitive code readability
/*
export function openLoginPoupIfNotLogin() {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.auth || !state.auth.id) {
      dispatch(openPopup('login'));
      return true;
    }
    return false;
  };
}
*/
export function setCheckoutStep(step) {
  return {
    type: 'CHECKOUT_SET_STEP',
    step,
  };
}

// BEGIN Product Detail Page actions
export function setActiveImage(imageUrl) {
  return {
    type: 'ACTIVE_IMAGE',
    url: imageUrl,
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
// END Product Detail Page actions
