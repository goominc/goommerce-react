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
