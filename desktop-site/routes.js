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
  UserTerms,
  UserPolicies,
} from 'containers';

export default function configure({ getAuth }) { // eslint-disable-line
  const checkRole = (nextState, replaceState) => {
    const auth = getAuth();
    if (!auth || !auth.id) {
      replaceState(null, '/accounts/signin');
      return;
    }
    const roles = auth.roles || [];
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].type === 'admin' || roles[i].type === 'buyer' || roles[i].type === 'bigBuyer') {
        return;
      }
    }
    window.alert('바이어 인증 이후에 서비스 이용하실 수 있습니다');
    replaceState(null, '/');
  };
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/accounts/reset" component={ResetPassword} />
        <Redirect from="/products" to="/categories/all" />
        <Route path="/products/:productId" component={ProductDetail} onEnter={checkRole} />
        <Route path="/cart" component={Cart} onEnter={checkRole} />
        <Route path="/orders" component={MyOrderContainer} onEnter={checkRole} />
        <Route path="/orders/:orderId" component={OrderDetail} onEnter={checkRole} />
        <Route path="/orders/:orderId/checkout" component={Checkout} onEnter={checkRole} />
        <Route path="/orders/:orderId/done" component={OrderDoneContainer} onEnter={checkRole} />
        <Route path="/brands/:brandId(/:pageNum)" component={Brand} onEnter={checkRole} />
        <Route path="/categories/:categoryId(/:pageNum)" component={Category} onEnter={checkRole} />
        <Route path="/search/:query(/:pageNum)" component={Search} onEnter={checkRole} />
        <Route path="/mypage(/:menuName)" component={MyPage} onEnter={checkRole} />
      </Route>
      <Route path="/accounts/signin" component={Signin} />
      <Route path="/accounts/signup" component={Signup} />
      <Route path="/accounts/forgot" component={ForgotPassword} />
      <Route path="/user/terms" component={UserTerms} />
      <Route path="/user/policies" component={UserPolicies} />
    </Route>
  );
}
