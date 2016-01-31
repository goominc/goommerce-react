import React from 'react';
import { Route } from 'react-router';
import {
  App,
  Cart,
  Checkout,
  ForgotPassword,
  Home,
  OrderDetail,
  OrderList,
  ResetPassword,
  Search,
  Signin,
  Signup,
  ProductList,
  ProductDetail,
} from './containers';

export default function configure({ getAuth }) {
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/accounts/reset" component={ResetPassword}/>
        <Route path="/products" component={ProductList}/>
        <Route path="/products/:productId" component={ProductDetail}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/orders" component={OrderList}/>
        <Route path="/orders/:orderId" component={OrderDetail}/>
        <Route path="/orders/:orderId/checkout" component={Checkout}/>
        <Route path="/search" component={Search}/>
      </Route>
      <Route path="/accounts/signin" component={Signin}/>
      <Route path="/accounts/signup" component={Signup}/>
      <Route path="/accounts/forgot" component={ForgotPassword}/>
    </Route>
  );
}