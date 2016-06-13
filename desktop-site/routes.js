// Copyright (C) 2016 Goom Inc. All rights reserved.

import React from 'react';
import { Route, Redirect, browserHistory } from 'react-router';
import {
  App,
  Brand,
  Cart,
  Checkout,
  Category,
  FavoriteBrandContainer,
  ForgotPassword,
  Home,
  OrderDetail,
  OrderDoneContainer,
  MyOrderContainer,
  MyPage,
  ResetPassword,
  Search,
  Signin,
  Signup,
  ProductDetail,
  Reorder,
  SellerJoinContainer,
  ServiceInfoContainer,
  ShopByBuildingContainer,
  WishListContainer,
  UserInfoContainer,
  UserTermsContainer,
  UserPoliciesContainer,
} from 'containers';

import routerUtil, { onEnter, onEnterAllowSeller, checkBrand, onSignup } from 'commons/utils/routerUtil';

export default function configure(store) { // eslint-disable-line
  routerUtil.initStore(store);
  const onMypageEnter = (nextState, fnReplaceState, menuName) => {
    store.dispatch({
      type: 'SET_MYPAGE_MENU_NAME',
      menuName,
    });
    onEnter(nextState, fnReplaceState);
  };
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Redirect from="/products" to="/categories/4" />
        <Route path="/products/:productId" component={ProductDetail} onEnter={onEnterAllowSeller} />
        <Route path="/cart" component={Cart} onEnter={onEnter} />
        <Route path="/orders" component={MyOrderContainer} onEnter={onEnter} />
        {/* <Route path="/orders/:orderId" component={OrderDetail} onEnter={onEnter} /> */}
        <Redirect from="/orders/:orderId" to="/mypage/orders/:orderId" />
        <Redirect from="/mypage/my_orders" to="/mypage/orders" />
        <Route path="/orders/:orderId/checkout" component={Checkout} onEnter={onEnter} />
        <Route path="/orders/:orderId/done" component={OrderDoneContainer} onEnter={onEnter} />
        <Route path="/brands/:brandId(/:pageNum)" component={Brand} onEnter={checkBrand} />
        <Route path="/categories/:categoryId(/:pageNum)" component={Category} onEnter={onEnter} />
        <Route path="/search(/:query(/:pageNum))" component={Search} onEnter={onEnter} />
        <Route path="/mypage/favorite_brands" component={FavoriteBrandContainer} onEnter={onEnter} />
        <Route path="/mypage/wish_list" component={WishListContainer} onEnter={onEnter} />
        <Route component={MyPage}>
          <Route path="/mypage/orders" component={MyOrderContainer} onEnter={(nextState, fnReplaceState) => onMypageEnter(nextState, fnReplaceState, 'orders')} />
          <Route path="/mypage/orders/:orderId" component={OrderDetail} onEnter={(nextState, fnReplaceState) => onMypageEnter(nextState, fnReplaceState, 'orders')} />
          <Route path="/mypage/user_info" component={UserInfoContainer} onEnter={(nextState, fnReplaceState) => onMypageEnter(nextState, fnReplaceState, 'user_info')} />
          <Route path="/mypage/reorder" component={Reorder} onEnter={(nextState, fnReplaceState) => onMypageEnter(nextState, fnReplaceState, 'reorder')} />
        </Route>
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
