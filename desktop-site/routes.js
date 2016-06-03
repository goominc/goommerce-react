// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { Route, Redirect, browserHistory } from 'react-router';
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
  SellerJoinContainer,
  ServiceInfoContainer,
  ShopByBuildingContainer,
} from 'containers';

import routerUtil, { onEnter, onEnterAllowSeller, checkBrand, onSignup } from 'commons/utils/routerUtil';

export default function configure(store) { // eslint-disable-line
  routerUtil.initStore(store);
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Redirect from="/products" to="/categories/4" />
        <Route path="/products/:productId" component={ProductDetail} onEnter={onEnterAllowSeller} />
        <Route path="/cart" component={Cart} onEnter={onEnter} />
        <Route path="/orders" component={MyOrderContainer} onEnter={onEnter} />
        <Route path="/orders/:orderId" component={OrderDetail} onEnter={onEnter} />
        <Route path="/orders/:orderId/checkout" component={Checkout} onEnter={onEnter} />
        <Route path="/orders/:orderId/done" component={OrderDoneContainer} onEnter={onEnter} />
        <Route path="/brands/:brandId(/:pageNum)" component={Brand} onEnter={checkBrand} />
        <Route path="/categories/:categoryId(/:pageNum)" component={Category} onEnter={onEnter} />
        <Route path="/search(/:query(/:pageNum))" component={Search} onEnter={onEnter} />
        <Route path="/mypage(/:menuName)" component={MyPage} onEnter={onEnter} />
        <Route path="/user/terms" component={UserTermsContainer} />
        <Route path="/user/policies" component={UserPoliciesContainer} />
        <Route path="/shops/join" component={SellerJoinContainer} />
        <Route path="/service/info(/:section)" component={ServiceInfoContainer} />
        <Route path="/shops/buildings(/:buildingId)" component={ShopByBuildingContainer} />
      </Route>
      <Route path="/accounts/signin" component={Signin} />
      <Route path="/accounts/signup" component={Signup} onEnter={onSignup} />
      <Route path="/accounts/forgot" component={ForgotPassword} />
      <Route path="/accounts/reset" component={ResetPassword} />
      <Redirect from="*" to="/" />
    </Route>
  );
}
