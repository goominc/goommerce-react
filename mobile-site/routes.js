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


export default function configure() {
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/categoryList(/:categoryId)" component={Category} />
        <Redirect from="/products" to="/categories/all" />
        { /* <Route path="/products" component={ProductList} /> */ }
        <Route path="/categories/:categoryId" component={ProductList} />
        <Route path="/search/:query" component={ProductList} />
        <Route path="/brands/:brandId" component={Brand} />
        <Route path="/products/:productId" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders/:orderId" component={Order} />
        <Route path="/orders/:orderId/done" component={OrderDone} />
        <Route path="/orders/:orderId/address" component={AddressList} />
        <Route path="/orders/:orderId/address/:addressId" component={AddressEdit} />
        { /* <Route path="/orders/:orderId/address/change/:addressId" component={AddressEdit} /> */ }
        <Route path="/myOrder" component={MyOrder} />
        <Route path="/myOrder/:orderId" component={MyOrderDetail} />
        <Route path="/wishlist" component={WishList} />
      </Route>
    </Route>
  );
}
