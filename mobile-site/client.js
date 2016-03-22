import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import configureStore from 'commons/redux/store';
import configureRoutes from 'routes';
import reducer from 'redux/reducers';

/*
const history = createBrowserHistory();

history.listen(() => {
  $('body').scrollTop(0);
});

const routes = configureRoutes({
});
render(
  <Router history={history}>
    {routes}
  </Router>,
  document.getElementById('root')
);*/

const store = configureStore(reducer, window.__INITIAL_STATE__);
const history = useScroll(() => browserHistory)();

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./redux/reducers', () => {
    const nextRootReducer = require('./redux/reducers');
    store.replaceReducer(nextRootReducer);
  });
}

const routes = configureRoutes({
  getAuth() {
    return store.getState().auth;
  },
});

history.listen(() => {
  $('body').scrollTop(0);
});

require('../commons/utils/i18n').init(store);

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
