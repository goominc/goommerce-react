import React from 'react';
import { Route } from 'react-router';
import {
  Home
} from './containers';

export default function configure({ getAuth }) {
  return (
    <Route>
      <div className="container">
        <Route path="/" component={Home}/>
      </div>
    </Route>
  );
}
