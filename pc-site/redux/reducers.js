import { assign, get } from 'lodash';
import { combineReducers } from 'redux';

import CommonReducers from '../../commons/redux/reducers';

function errorHandler(state = {}, action) {
  if (action.type === 'RESET_ERROR') {
    return assign({}, state, { error: {} });
  }
  return state;
}

function checkout(state = {}, action) {
  if (action.type === 'CHECKOUT_SET_STEP') {
    const nextState = assign({}, state);
    nextState.step = action.step;
    return nextState;
  }
  return state;
}

// BEGIN page-wide reducers
function pageProductDetail(state = {}, action) {
  const initColorsAndSizes = (variants) => {
    const attributes = { colors: {}, sizes: {} };
    variants.forEach((variant) => {
      attributes.colors[variant.data.color] = { enable: true, selected: false, img: variant.appImages.default[0] };
      attributes.sizes[variant.data.size] = { enable: true, selected: false };
    });
    return { variantAttributes: attributes };
  };
  const updateColorsAndSizes = (variants, activeColor, activeSize, state2) => {
    const { variantAttributes } = state2;
    // 2016. 02. 25. [heekyu] copy object for render view
    const newAttributes = JSON.parse(JSON.stringify(variantAttributes));
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
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
          state2.image_url = variant.appImages.default[0].url;
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
    return assign({}, state, { image_url: action.url });
  } else if (action.type === 'PRODUCT_DETAIL_VARIANTS') {
    const initialVariantState = { variants: action.variants, selectedVariant: null, activeColor: null, activeSize: null };
    return assign({}, state, initialVariantState, initColorsAndSizes(action.variants));
  } else if (action.type === 'PRODUCT_DETAIL_SET_COLOR') {
    const color = action.color;
    if (color === state.activeColor) {
      state.activeColor = null;
    } else {
      state.activeColor = color;
    }
    const next = colorsAndSizesFromState(state);
    return assign({}, next);
  } else if (action.type === 'PRODUCT_DETAIL_SET_SIZE') {
    const size = action.size;
    if (size === state.activeSize) {
      state.activeSize = null;
    } else {
      state.activeSize = size;
    }
    const next = assign({}, colorsAndSizesFromState(state));
    return next;
  }
  return state;
}
function pageProductList(state = {}) {
  // TODO query related state management
  return state;
}
const pageReducers = combineReducers({
  pageProductDetail,
  pageProductList,
});
// END page-wide reducers

const rootReducer = combineReducers(
  Object.assign({}, CommonReducers.reducers, { errorHandler, checkout, page: pageReducers })
);

export default (state = {}, action) => {
  if (action.error) {
    return assign({}, state, { errorHandler: { error: action.error } });
  }
  if (action.type === 'RESET') {
    return rootReducer({}, action);
  }
  return rootReducer(state, action);
};
