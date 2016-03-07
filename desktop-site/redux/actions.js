// Copyright (C) 2016 Goom Inc. All rights reserved.

import * as ApiAction from 'commons/redux/apiActions';
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
    ApiAction.saveAddress(address)(dispatch, getState).then(() => {
      const promises = [ApiAction.saveOrderAddress(order.id, address)(dispatch, getState)];
      if (address.id) {
        promises.push(ApiAction.setActiveAddressId(address.id)(dispatch, getState));
      }
      return Promise.all([promises]);
    }).then(() => {
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
// END Product Detail Page actions
