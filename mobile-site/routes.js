import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import {
  App,
  Cart,
  Category,
  Home,
  Order,
  ProductDetail,
  ProductList,
} from './containers';


export default function configure() {
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/categoryList(/:categoryId)" component={Category} />
        <Redirect from="/products" to="/categories/all" />
        { /* <Route path="/products" component={ProductList} /> */ }
        <Route path="/categories/:categoryId" component={ProductList} />
        <Route path="/products/:productId" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Order} />
      </Route>
    </Route>
  );
}
