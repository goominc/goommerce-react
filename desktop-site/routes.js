// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { Route, Redirect } from 'react-router';
import {
  App,
  Brand,
  Cart,
  Checkout,
  Category,
  ForgotPassword,
  Home,
  OrderDetail,
  OrderDoneContainer,
  MyOrderContainer,
  ResetPassword,
  Search,
  Signin,
  Signup,
  ProductDetail,
  MyPage,
  UserTermsContainer,
  UserPoliciesContainer,
  ServiceInfoContainer,
  ShopByBuildingContainer,
} from 'containers';

import roleUtil from 'commons/utils/roleUtil';

export default function configure(store) { // eslint-disable-line
  const getAuth = () => store.getState().auth;
  const onEnter = (nextState, fnReplaceState) => {
    const onNotLogin = () => {
      window.alert('로그인 후 서비스 이용할 수 있습니다');
      store.dispatch({
        type: 'AFTER_LOGIN_PAGE',
        nextState,
      });
      fnReplaceState('/accounts/signin');
    };
    const onNotRole = () => fnReplaceState(null, '/');
    roleUtil.checkRoleOnEnter(nextState, fnReplaceState, getAuth(), onNotLogin, onNotRole);
  };
  const checkBrand = (nextState, fnReplaceState) => {
    const auth = getAuth();
    const brandId = roleUtil.getBrandIdIfSeller(auth);
    const onNotLogin = () => fnReplaceState(null, '/accounts/signin');
    const onNotRole = () => fnReplaceState(null, '/');
    if (brandId) {
      if (+nextState.params.brandId !== +brandId) {
        // 2016. 04. 21. [heekyu] allow only my brand
        window.alert('상품 조회 권한이 없습니다');
        onNotRole();
      }
    } else {
      roleUtil.checkRoleOnEnter(nextState, fnReplaceState, getAuth(), onNotLogin, onNotRole);
    }
  };
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Redirect from="/products" to="/categories/4" />
        <Route path="/products/:productId" component={ProductDetail} onEnter={onEnter} />
        <Route path="/cart" component={Cart} onEnter={onEnter} />
        <Route path="/orders" component={MyOrderContainer} onEnter={onEnter} />
        <Route path="/orders/:orderId" component={OrderDetail} onEnter={onEnter} />
        <Route path="/orders/:orderId/checkout" component={Checkout} onEnter={onEnter} />
        <Route path="/orders/:orderId/done" component={OrderDoneContainer} onEnter={onEnter} />
        <Route path="/brands/:brandId(/:pageNum)" component={Brand} onEnter={checkBrand} />
        <Route path="/categories/:categoryId(/:pageNum)" component={Category} onEnter={onEnter} />
        <Route path="/search/:query(/:pageNum)" component={Search} onEnter={onEnter} />
        <Route path="/mypage(/:menuName)" component={MyPage} onEnter={onEnter} />
        <Route path="/user/terms" component={UserTermsContainer} />
        <Route path="/user/policies" component={UserPoliciesContainer} />
        <Route path="/service/info(/:section)" component={ServiceInfoContainer} />
        <Route path="/shops/buildings(/:buildingId)" component={ShopByBuildingContainer} />
      </Route>
      <Route path="/accounts/signin" component={Signin} />
      <Route path="/accounts/signup" component={Signup} />
      <Route path="/accounts/forgot" component={ForgotPassword} />
      <Route path="/accounts/reset" component={ResetPassword} />
      <Redirect from="*" to="/" />
    </Route>
  );
}
