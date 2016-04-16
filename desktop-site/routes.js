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
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/accounts/reset" component={ResetPassword} />
        <Redirect from="/products" to="/categories/all" />
        <Route path="/products/:productId" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={MyOrderContainer} />
        <Route path="/orders/:orderId" component={OrderDetail} />
        <Route path="/orders/:orderId/checkout" component={Checkout} />
        <Route path="/orders/:orderId/done" component={OrderDoneContainer} />
        <Route path="/brands/:brandId(/:pageNum)" component={Brand} />
        <Route path="/categories/:categoryId(/:pageNum)" component={Category} />
        <Route path="/search/:query(/:pageNum)" component={Search} />
        <Route path="/mypage/:menuName" component={MyPage} />
        <Route path="/mypage" component={MyPage} />
      </Route>
      <Route path="/accounts/signin" component={Signin} />
      <Route path="/accounts/signup" component={Signup} />
      <Route path="/accounts/forgot" component={ForgotPassword} />
      <Route path="/user/terms" component={UserTerms} />
      <Route path="/user/policies" component={UserPolicies} />
    </Route>
  );
}
