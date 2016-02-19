import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  Cart,
  Category,
  Home,
  ProductDetail,
  ProductList,
} from './containers';


export default function configure() {
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/category" component={Category} />
        <Route path="/products" component={ProductList} />
        <Route path="/products/:productId" component={ProductDetail}/>
        <Route path="/cart" component={Cart}/>
      </Route>
    </Route>
  );
}
