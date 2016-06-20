// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

let store = null;

exports.init = (reduxStore) => {
  store = reduxStore;
};

exports.isLikeBrand = (brandId) => {
  // TODO use map for performance
  const state = store.getState();
  const favoriteBrands = _.get(state, 'auth.favoriteBrands');
  for (let i = 0; i < (favoriteBrands || []).length; i++) {
    if (+favoriteBrands[i].id === +brandId) {
      return true;
    }
  }
  return false;
};

exports.getWishId = (product) => {
  const state = store.getState();
  const wishes = Object.keys(state.entities.wishes).map((key) => state.entities.wishes[key]);
  let wishId = 0;
  for (let i = 0; i < wishes.length; i++) {
    if (wishes[i].product.id === product.id) {
      wishId = wishes[i].id;
      break;
    }
  }
  return wishId;
};
