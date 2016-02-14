import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './../commons/redux/store';
import configureRoutes from './routes';

const store = configureStore(window.__INITIAL_STATE__);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./redux/reducers', () => {
    const nextRootReducer = require('./redux/reducers');
    store.replaceReducer(nextRootReducer);
  });
}

require('../commons/utils/i18n').init(store);

const routes = configureRoutes({
  getAuth() {
    return store.getState().auth;
  },
});
const history = createBrowserHistory();

history.listen(() => {
  $('body').scrollTop(0);
});

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
