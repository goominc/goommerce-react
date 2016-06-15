// Copyright (C) 2016 Goom Inc. All rights reserved.

import { openPopup } from 'redux/actions';
import roleUtil from 'commons/utils/roleUtil';
import i18n from 'commons/utils/i18n';

let store = null;
exports.initStore = (s) => {
  store = s;
};
const getAuth = () => store.getState().auth;

const getOnNotLogin = (nextState, fnReplaceState) => () => {
  store.dispatch({
    type: 'AFTER_LOGIN_PAGE',
    nextState,
  });
  store.dispatch(openPopup('login'));
  // 2016. 05. 14. [heekyu] there is problem that history +1 on popup
  //                        TODO better way
  if (nextState.routes.length >= 2) {
    const back = nextState.routes[nextState.routes.length - 2];
    fnReplaceState(back);
  } else {
    fnReplaceState('/');
  }
  // fnReplaceState('/accounts/signin');
};
exports.getOnNotLogin = getOnNotLogin;

exports.onEnter = (nextState, fnReplaceState) => {
  const onNotRole = () => {
    window.alert(i18n.get('pcMain.youMustbeBuyer'));
    fnReplaceState(null, '/');
  };
  roleUtil.checkRoleOnEnter(getAuth(), getOnNotLogin(nextState, fnReplaceState), onNotRole);
};
exports.onEnterCn = (nextState, fnReplaceState) => {
  // 2016. 06. 15. [heekyu] for china buyer
  const activeLocale = store.getState().i18n.activeLocale;
  if (activeLocale === 'zh-cn' || activeLocale === 'zh-tw') {
    return;
  }
  exports.onEnter(nextState, fnReplaceState);
};
const getOnNotRoleSeller = (nextState, fnReplaceState) => () => {
  const brandId = roleUtil.getBrandIdIfSeller(getAuth());
  if (brandId) {
    // 2016. 06. 02. [heekyu] check if seller's product in ProductDetail Container
    return;
  }
  window.alert(i18n.get('pcMain.youMustbeBuyer'));
  fnReplaceState(null, '/');
};
exports.getOnNotRoleSeller = getOnNotRoleSeller;
exports.onEnterAllowSeller = (nextState, fnReplaceState) => {
  // 2016. 06. 15. [heekyu] for china buyer
  const activeLocale = store.getState().i18n.activeLocale;
  if (activeLocale === 'zh-cn' || activeLocale === 'zh-tw') {
    return;
  }
  roleUtil.checkRoleOnEnter(getAuth(), getOnNotLogin(nextState, fnReplaceState), getOnNotRoleSeller(nextState, fnReplaceState));
};
exports.checkBrand = (nextState, fnReplaceState) => {
  const auth = getAuth();
  const brandId = roleUtil.getBrandIdIfSeller(auth);
  const onNotLogin = () => fnReplaceState(null, '/accounts/signin');
  const onNotRole = () => fnReplaceState(null, '/');
  if (brandId) {
    if (+nextState.params.brandId !== +brandId) {
      // 2016. 04. 21. [heekyu] allow only my brand
      window.alert(i18n.get('pcMain.notAllowedToSeeProduct'));
      onNotRole();
    }
  } else {
    roleUtil.checkRoleOnEnter(getAuth(), onNotLogin, onNotRole);
  }
};
exports.onSignup = (nextState, replaceState) => {
  const auth = getAuth();
  if (auth && auth.id) {
    window.alert(i18n.get('pcMain.alreadyLoginAndGoHome'));
    replaceState('/');
  }
};
