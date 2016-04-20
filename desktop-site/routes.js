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
} from 'containers';

import roleUtil from 'commons/utils/roleUtil';

export default function configure({ getAuth }) { // eslint-disable-line
  const onEnter = (nextState, replaceState) => {
    const onNotLogin = () => replaceState(null, '/accounts/signin');
    const onNotRole = () => replaceState(null, '/');
    roleUtil.checkRole(nextState, replaceState, getAuth(), onNotLogin, onNotRole);
  };
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/accounts/reset" component={ResetPassword} />
        <Redirect from="/products" to="/categories/all" />
        <Route path="/products/:productId" component={ProductDetail} onEnter={onEnter} />
        <Route path="/cart" component={Cart} onEnter={onEnter} />
        <Route path="/orders" component={MyOrderContainer} onEnter={onEnter} />
        <Route path="/orders/:orderId" component={OrderDetail} onEnter={onEnter} />
        <Route path="/orders/:orderId/checkout" component={Checkout} onEnter={onEnter} />
        <Route path="/orders/:orderId/done" component={OrderDoneContainer} onEnter={onEnter} />
        <Route path="/brands/:brandId(/:pageNum)" component={Brand} onEnter={onEnter} />
        <Route path="/categories/:categoryId(/:pageNum)" component={Category} onEnter={onEnter} />
        <Route path="/search/:query(/:pageNum)" component={Search} onEnter={onEnter} />
        <Route path="/mypage(/:menuName)" component={MyPage} onEnter={onEnter} />
        <Route path="/user/terms" component={UserTermsContainer} />
        <Route path="/user/policies" component={UserPoliciesContainer} />
      </Route>
      <Route path="/accounts/signin" component={Signin} />
      <Route path="/accounts/signup" component={Signup} />
      <Route path="/accounts/forgot" component={ForgotPassword} />
      <Redirect from="*" to="/" />
    </Route>
  );
}
