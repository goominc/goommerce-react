// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

import i18n from 'commons/utils/i18n';

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

exports.getCategoryBreadcrumbPath = (categoryId, genLinkUrl) => {
  const categoryRoot = store.getState().categories.tree;
  let path;
  if (categoryId !== categoryRoot.id) {
    const findPath = (root) => {
      if (root.id === categoryId) {
        return [{ name: root.name }];
      }
      for (let i = 0; i < (root.children || []).length; i++) {
        const res = findPath(root.children[i]);
        if (res) {
          if (genLinkUrl) {
            res.unshift({ link: genLinkUrl(root), name: root.name });
          } else {
            // TODO Fix Problem do not reload when click link
            res.unshift({ name: root.name });
          }

          return res;
        }
      }
      return null;
    };
    path = findPath(categoryRoot);
  }
  if (!path) {
    path = [{ name: i18n.getObj('word.allCategories') }];
  }
  return path;
};
