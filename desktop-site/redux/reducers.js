// Copyright (C) 2016 Goom Inc. All rights reserved.

import { combineReducers } from 'redux';
import _ from 'lodash';

import CommonReducers from '../../commons/redux/reducers';
import { initColorsAndSizes } from 'commons/utils/productUtil';

function popup(state = {}, action) {
  if (action.type === 'OPEN_POPUP') {
    const next = { popupName: action.popupName };
    return next;
  } else if (action.type === 'CLOSE_POPUP') {
    return {};
  }
  return state;
}

function errorHandler(state = {}, action) {
  if (action.type === 'RESET_ERROR') {
    return Object.assign({}, state, { error: {} });
  }
  return state;
}

function search(state = {}, action) {
  if (action.type === 'SET_SEARCH_CATEGORY') {
    return Object.assign({}, state, { activeCategory: action.category });
  } else if (action.type === 'TOGGLE_SEARCH_DROPDOWN') {
    return Object.assign({}, state, { showDropdown: !state.showDropdown });
  }
  if (state.showDropdown) {
    state.shoDropdown = false;
  }
  return state;
}

function checkout(state = {}, action) {
  if (action.type === 'CHECKOUT_SET_STEP') {
    const nextState = Object.assign({}, state);
    nextState.step = action.step;
    return nextState;
  }
  return state;
}

// BEGIN page-wide reducers
function pageProductDetail(state = {}, action) {
  const updateColorsAndSizes = (variants, activeColor, activeSize, state2) => {
    const { variantAttributes } = state2;
    // 2016. 02. 25. [heekyu] copy object for render view
    const newAttributes = JSON.parse(JSON.stringify(variantAttributes));
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      if (!newAttributes.sizes[variant.data.size] || !newAttributes.colors[variant.data.color]) {
        console.log(`${variant.sku} does not have color or size`); // eslint-disable-line no-console
        continue;
      }
      // 2016. 02. 25. [heekyu] set disable attributes
      if (!activeColor || activeColor === variant.data.color) {
        newAttributes.sizes[variant.data.size].enable = true;
      }
      if (!activeSize || activeSize === variant.data.size) {
        newAttributes.colors[variant.data.color].enable = true;
      }
      // 2016. 02. 25. [heekyu] set selected attributes
      if (activeColor === variant.data.color) {
        newAttributes.colors[variant.data.color].selected = true;
      }
      if (activeSize === variant.data.size) {
        newAttributes.sizes[variant.data.size].selected = true;
      }
    }
    state2.variantAttributes = newAttributes;
    return state2;
  };
  const resetColorsAndSizes = (state2) => {
    const { variantAttributes } = state2;
    const colorKeys = Object.keys(variantAttributes.colors);
    for (let i = 0; i < colorKeys.length; i++) {
      variantAttributes.colors[colorKeys[i]].enable = false;
      variantAttributes.colors[colorKeys[i]].selected = false;
    }
    const sizeKeys = Object.keys(variantAttributes.sizes);
    for (let i = 0; i < sizeKeys.length; i++) {
      variantAttributes.sizes[sizeKeys[i]].enable = false;
      variantAttributes.sizes[sizeKeys[i]].selected = false;
    }
    state2.variantAttributes = variantAttributes;
    return state2;
  };
  const colorsAndSizesFromState = (state2) => {
    state2 = resetColorsAndSizes(state2);
    const variants = state2.variants;
    const activeColor = state2.activeColor;
    const activeSize = state2.activeSize;
    state2 = updateColorsAndSizes(variants, activeColor, activeSize, state2);

    if (activeColor) {
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        if (variant.data.color === activeColor) {
          state2.activeImage = variant.appImages.default[0];
          break;
        }
      }
    }
    if (activeColor && activeSize) {
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        if (variant.data.color === activeColor && variant.data.size === activeSize) {
          state2.selectedVariant = variant;
          return state2;
        }
      }
    }
    state2.selectedVariant = null;
    return state2;
  };
  if (action.type === 'ACTIVE_IMAGE') {
    return Object.assign({}, state, { activeImage: action.image });
  } else if (action.type === 'PRODUCT_DETAIL_VARIANTS') {
    const initialVariantState = {
      variants: action.variants, selectedVariant: null, activeColor: null, activeSize: null,
    };
    // 2016. 03. 25. [heekyu] Select First Color and size
    const state2 = Object.assign({}, state, initialVariantState, initColorsAndSizes(action.variants));
    const colors = Object.keys(_.get(state2, 'variantAttributes.colors') || {});
    const sizes = Object.keys(_.get(state2, 'variantAttributes.sizes') || {});
    if (colors.length > 0 && sizes.length > 0) {
      state2.activeColor = colors[0];
      state2.activeSize = sizes[0];
    }
    return colorsAndSizesFromState(state2);
  } else if (action.type === 'PRODUCT_DETAIL_SET_COLOR') {
    const color = action.color;
    if (color === state.activeColor) {
      state.activeColor = null;
    } else {
      state.activeColor = color;
    }
    const next = colorsAndSizesFromState(state);
    return Object.assign({}, next);
  } else if (action.type === 'PRODUCT_DETAIL_SET_SIZE') {
    const size = action.size;
    if (size === state.activeSize) {
      state.activeSize = null;
    } else {
      state.activeSize = size;
    }
    const next = Object.assign({}, colorsAndSizesFromState(state));
    return next;
  }
  return state;
}
function pageProductList(state = {}) {
  // TODO query related state management
  return state;
}
function pageCheckout(state = { isEditMode: false }, action) {
  if (action.type === 'CHECKOUT_NEW_ADDRESS') {
    return Object.assign({}, state, { isEditMode: true, isNewAddress: true });
  } else if (action.type === 'CHECKOUT_TOGGLE_EDIT_MODE') {
    return Object.assign({}, state, { isEditMode: !state.isEditMode, isNewAddress: false });
  }
  return state;
}
const pageReducers = combineReducers({
  pageProductDetail,
  pageProductList,
  pageCheckout,
});
// END page-wide reducers

const rootReducer = combineReducers(
  Object.assign({}, CommonReducers.reducers,
    { errorHandler, popup, search, checkout, page: pageReducers })
);

export default (state = {}, action) => {
  if (action.error) {
    return Object.assign({}, state, { errorHandler: { error: action.error } });
  }
  if (action.type === 'RESET') {
    return rootReducer({}, action);
  }
  return rootReducer(state, action);
};
