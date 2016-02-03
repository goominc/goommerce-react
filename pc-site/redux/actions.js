// Copyright (C) 2016 Goom Inc. All rights reserved.

import * as ApiAction from '../../commons/redux/apiActions';
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

// BEGIN Product Detail Page actions
export function setActiveImage(imageUrl) {
  return {
    type: 'ACTIVE_IMAGE',
    url: imageUrl,
  };
}
export function changeVariantSelection(selected_variant) {
  return {
    type: 'CHANGE_VARIANT_SELECTION',
    selected_variant,
  };
}
// END Product Detail Page actions
