import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import {
  App,
  Cart,
  Category,
  Home,
  Order,
  OrderDone,
  ProductDetail,
  ProductList,
  Brand,
  AddressList,
  AddressEdit,
  MyOrder,
  MyOrderDetail,
  Signin,
  ForgotPassword,
  ResetPassword,
  ServiceInfoContainer,
  ShippingPolicy,
  Signup,
  SignupDoneContainer,
  WishList,
  UserTermsContainer,
  UserPoliciesContainer,
} from 'containers';

import roleUtil from 'commons/utils/roleUtil';
import i18n from 'commons/utils/i18n';

import routerUtil, { checkBrand, getOnNotRoleSeller, onSignup } from 'commons/utils/routerUtil';

export default function configure(store) {
  routerUtil.initStore(store);
  const getOnNotLogin = (nextState, replaceState) => () => {
    window.alert(i18n.get('pcMain.loginBeforeUseService'));
    store.dispatch({
      type: 'AFTER_LOGIN_PAGE',
      nextState,
    });
    replaceState('/accounts/signin');
  };
  const onEnter = (nextState, replaceState) => {
    const onNotRole = () => {
      window.alert(i18n.get('pcMain.youMustbeBuyer'));
      replaceState('/');
    };
    roleUtil.checkRoleOnEnter(store.getState().auth, getOnNotLogin(nextState, replaceState), onNotRole);
  };
  const onEnterCn = (nextState, replaceState) => {
    // 2016. 06. 15. [heekyu] for china buyer
    const activeLocale = store.getState().i18n.activeLocale;
    if (activeLocale === 'zh-cn' || activeLocale === 'zh-tw') {
      return;
    }
    onEnter(nextState, replaceState);
  };
  const onEnterAllowSeller = (nextState, replaceState) => {
    // 2016. 06. 15. [heekyu] for china buyer
    const activeLocale = store.getState().i18n.activeLocale;
    if (activeLocale === 'zh-cn' || activeLocale === 'zh-tw') {
      return;
    }
    const onNotRoleSeller = getOnNotRoleSeller(nextState, replaceState);
    roleUtil.checkRoleOnEnter(store.getState().auth, getOnNotLogin(nextState, replaceState), onNotRoleSeller);
  };
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/categoryList(/:categoryId)" component={Category} onEnter={onEnterCn} />
        <Redirect from="/products" to="/categories/4" />
        { /* <Route path="/products" component={ProductList} /> */ }
        <Route path="/categories/:categoryId" component={ProductList} onEnter={onEnterCn} />
        <Route path="/search(/:query)" component={ProductList} onEnter={onEnterCn} />
        <Route path="/brands/:brandId" component={Brand} onEnter={checkBrand} />
        <Route path="/products/:productId" component={ProductDetail} onEnter={onEnterAllowSeller} />
        <Route path="/cart" component={Cart} onEnter={onEnter} />
        <Route path="/orders/:orderId/checkout" component={Order} onEnter={onEnter} />
        <Route path="/orders/:orderId/done" component={OrderDone} onEnter={onEnter} />
        <Route path="/orders/:orderId/address" component={AddressList} onEnter={onEnter} />
        <Route path="/orders/:orderId/address/:addressId" component={AddressEdit} onEnter={onEnter} />
        { /* <Route path="/orders/:orderId/address/change/:addressId" component={AddressEdit} /> */ }
        <Route path="/myOrder" component={MyOrder} onEnter={onEnter} />
        <Route path="/myOrder/:orderId" component={MyOrderDetail} onEnter={onEnter} />
        <Route path="/wishlist" component={WishList} onEnter={onEnter} />
        <Route path="/service/info(/:section)" component={ServiceInfoContainer} />
        <Route path="/service/policy/shipping" component={ShippingPolicy} />
      </Route>
      <Route path="/accounts/signin" component={Signin} />
      <Route path="/accounts/signup" component={Signup} onEnter={onSignup} />
      <Route path="/accounts/signup/done" component={SignupDoneContainer} />
      <Route path="/accounts/forgot" component={ForgotPassword} />
      <Route path="/accounts/reset" component={ResetPassword} />
      <Route path="/user/terms" component={UserTermsContainer} />
      <Route path="/user/policies" component={UserPoliciesContainer} />
    </Route>
  );
}
