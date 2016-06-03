// Copyright (C) 2016 Goom Inc. All rights reserved.

import _ from 'lodash';

import i18n from 'commons/utils/i18n';

const hasBuyerRole = (auth) => {
  if (!auth || !auth.id) {
    return false;
  }
  const roles = auth.roles || [];
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].type === 'admin' || roles[i].type === 'buyer' || roles[i].type === 'bigBuyer') {
      return true;
    }
  }
  return false;
};

exports.hasBuyerRole = hasBuyerRole;

exports.checkRoleOnEnter = (auth, onNotLogin, onNotRole) => {
  if (!auth || !auth.id) {
    onNotLogin();
    return;
  }
  if (!hasBuyerRole(auth)) {
    onNotRole();
    return;
  }
};

exports.hasRole = (auth, roleTypes) => {
  if (!(roleTypes instanceof Array)) {
    roleTypes = [roleTypes];
  }
  for (let i = 0; i < (auth.roles || []).length; i++) {
    const role = auth.roles[i];
    for (let j = 0; j < roleTypes.length; j++) {
      if (role.type === roleTypes[j]) {
        return true;
      }
    }
  }
  return false;
};

exports.getBrandIdIfSeller = (auth) => {
  for (let i = 0; i < (auth.roles || []).length; i++) {
    const role = auth.roles[i];
    if (role.type === 'owner') {
      return role.brand.id;
    }
  }
  return null;
};

exports.isAllowSeeProduct = (auth, product, router) => {
  const onNotLogin = () => {
    // may be never happen
    window.alert(i18n.get('pcMain.loginBeforeUseService'));
    router.push('/accounts/login');
  };
  const onNotRole = () => {
    const brandId = exports.getBrandIdIfSeller(auth);
    if (brandId && +brandId === +_.get(product, 'brand.id')) {
      // OK! my product
      return;
    }
    window.alert(i18n.get('pcMain.notAllowedToSeeProduct'));
    router.push('/');
  };
  exports.checkRoleOnEnter(auth, onNotLogin, onNotRole);
};
