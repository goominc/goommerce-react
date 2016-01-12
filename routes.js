import React from 'react';
import { Route } from 'react-router';
import {
  App,
  Home,
  Signin,
  Signup,
  ProductDetail,
} from './containers';

export default function configure({ getAuth }) {
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/accounts/signin" component={Signin}/>
        <Route path="/accounts/signup" component={Signup}/>
        <Route path="/products/:productId" component={ProductDetail}/>
      </Route>
    </Route>
  );
}
