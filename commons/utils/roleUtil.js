// Copyright (C) 2016 Goom Inc. All rights reserved.

const message = '바이어 인증 이후에 서비스 이용하실 수 있습니다';
exports.checkRole = (nextState, replaceState, auth, onNotLogin, onNotRole) => {
  if (!auth || !auth.id) {
    onNotLogin();
    return;
  }
  const roles = auth.roles || [];
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].type === 'admin' || roles[i].type === 'buyer' || roles[i].type === 'bigBuyer') {
      return;
    }
  }

  window.alert(message);
  onNotRole();
};
