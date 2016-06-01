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
import { toggleSignRegister } from './redux/actions';


export default function configure(store) {
  const onEnter = (nextState, replaceState) => {
    const onNotLogin = () => {
      window.alert('로그인 후 서비스 이용할 수 있습니다');
      store.dispatch({
        type: 'AFTER_LOGIN_PAGE',
        nextState,
      });
      replaceState('/accounts/signin');
    };
    const onNotRole = () => {
      replaceState('/');
    };
    roleUtil.checkRoleOnEnter(nextState, replaceState, store.getState().auth, onNotLogin, onNotRole);
  };
  const onSignup = (nextState, replaceState) => {
    const auth = store.getState().auth;
    if (auth && auth.id) {
      window.alert('로그인 되어 있습니다. 홈페이지로 이동합니다.');
      replaceState('/');
    }
  };
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/categoryList(/:categoryId)" component={Category} onEnter={onEnter} />
        <Redirect from="/products" to="/categories/4" />
        { /* <Route path="/products" component={ProductList} /> */ }
        <Route path="/categories/:categoryId" component={ProductList} onEnter={onEnter} />
        <Route path="/search(/:query)" component={ProductList} onEnter={onEnter} />
        <Route path="/brands/:brandId" component={Brand} onEnter={onEnter} />
        <Route path="/products/:productId" component={ProductDetail} onEnter={onEnter} />
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
