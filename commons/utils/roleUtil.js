// Copyright (C) 2016 Goom Inc. All rights reserved.

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

const message = '구매회원 인증 이후에 서비스 이용하실 수 있습니다';
exports.checkRoleOnEnter = (nextState, replaceState, auth, onNotLogin, onNotRole) => {
  if (!auth || !auth.id) {
    onNotLogin();
    return;
  }
  if (!hasBuyerRole(auth)) {
    window.alert(message);
    onNotRole();
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
