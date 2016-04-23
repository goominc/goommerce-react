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
  WishList,
} from 'containers';

import roleUtil from 'commons/utils/roleUtil';
import { toggleSignRegister } from './redux/actions';


export default function configure(store) {
  const onEnter = (nextState, replaceState) => {
    const onNotLogin = () => {
      store.dispatch(toggleSignRegister(true, 'sign'));
      replaceState(null, '/');
    };
    const onNotRole = () => {
      replaceState(null, '/');
    };
    roleUtil.checkRoleOnEnter(nextState, replaceState, store.getState().auth, onNotLogin, onNotRole);
  };
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/categoryList(/:categoryId)" component={Category} onEnter={onEnter} />
        <Redirect from="/products" to="/categories/all" />
        { /* <Route path="/products" component={ProductList} /> */ }
        <Route path="/categories/:categoryId" component={ProductList} onEnter={onEnter} />
        <Route path="/search/:query" component={ProductList} onEnter={onEnter} />
        <Route path="/brands/:brandId" component={Brand} onEnter={onEnter} />
        <Route path="/products/:productId" component={ProductDetail} onEnter={onEnter} />
        <Route path="/cart" component={Cart} onEnter={onEnter} />
        <Route path="/orders/:orderId" component={Order} onEnter={onEnter} />
        <Route path="/orders/:orderId/done" component={OrderDone} onEnter={onEnter} />
        <Route path="/orders/:orderId/address" component={AddressList} onEnter={onEnter} />
        <Route path="/orders/:orderId/address/:addressId" component={AddressEdit} onEnter={onEnter} />
        { /* <Route path="/orders/:orderId/address/change/:addressId" component={AddressEdit} /> */ }
        <Route path="/myOrder" component={MyOrder} onEnter={onEnter} />
        <Route path="/myOrder/:orderId" component={MyOrderDetail} onEnter={onEnter} />
        <Route path="/wishlist" component={WishList} onEnter={onEnter} />
      </Route>
    </Route>
  );
}
