import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import _ from 'lodash';
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
  WishList,
} from 'containers';

import { toggleSignRegister } from './redux/actions';


export default function configure(store) {
  const checkLogin = (nextState, replace) => {
    const state = store.getState();
    if (!_.get(state, 'auth.id')) {
      replace('/');
      store.dispatch(toggleSignRegister(true, 'sign'));
    }
  };
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/categoryList(/:categoryId)" component={Category} onEnter={checkLogin} />
        <Redirect from="/products" to="/categories/all" />
        { /* <Route path="/products" component={ProductList} /> */ }
        <Route path="/categories/:categoryId" component={ProductList} onEnter={checkLogin} />
        <Route path="/search/:query" component={ProductList} onEnter={checkLogin} />
        <Route path="/brands/:brandId" component={Brand} onEnter={checkLogin} />
        <Route path="/products/:productId" component={ProductDetail} onEnter={checkLogin} />
        <Route path="/cart" component={Cart} onEnter={checkLogin} />
        <Route path="/orders/:orderId" component={Order} onEnter={checkLogin} />
        <Route path="/orders/:orderId/done" component={OrderDone} onEnter={checkLogin} />
        <Route path="/orders/:orderId/address" component={AddressList} onEnter={checkLogin} />
        <Route path="/orders/:orderId/address/:addressId" component={AddressEdit} onEnter={checkLogin} />
        { /* <Route path="/orders/:orderId/address/change/:addressId" component={AddressEdit} /> */ }
        <Route path="/myOrder" component={MyOrder} onEnter={checkLogin} />
        <Route path="/myOrder/:orderId" component={MyOrderDetail} onEnter={checkLogin} />
        <Route path="/wishlist" component={WishList} onEnter={checkLogin} />
      </Route>
    </Route>
  );
}
