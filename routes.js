import React from 'react';
import { Route } from 'react-router';
import {
  App,
  Home,
} from './containers';

export default function configure({ getAuth }) {
  return (
    <Route>
      <Route component={App}>
        <Route path="/" component={Home}/>
      </Route>
    </Route>
  );
}
