import React from 'react';
import { Route } from 'react-router';
import {
  App,
  Brand,
  Cart,
  Checkout,
  Category,
  ForgotPassword,
  Home,
  OrderDetail,
  MyOrderContainer,
  ResetPassword,
  Search,
  Signin,
  Signup,
  ProductList,
  ProductDetail,
  MyPage,
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
        <Route path="/orders" component={MyOrderContainer}/>
        <Route path="/orders/:orderId" component={OrderDetail}/>
        <Route path="/orders/:orderId/checkout" component={Checkout}/>
        <Route path="/brands/:brandId" component={Brand}/>
        <Route path="/categories/:categoryId" component={Category}/>
        <Route path="/search" component={Search}/>
        <Route path="/mypage" component={MyPage} />
      </Route>
      <Route path="/accounts/signin" component={Signin}/>
      <Route path="/accounts/signup" component={Signup}/>
      <Route path="/accounts/forgot" component={ForgotPassword}/>
    </Route>
  );
}
