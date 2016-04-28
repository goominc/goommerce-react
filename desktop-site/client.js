import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import configureStore from 'commons/redux/store';
import configureRoutes from 'routes';
import reducer from 'redux/reducers';

const store = configureStore(reducer, window.__INITIAL_STATE__);
const history = useScroll(() => browserHistory)();
// const history = browserHistory;

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./redux/reducers', () => {
    const nextRootReducer = require('./redux/reducers');
    store.replaceReducer(nextRootReducer);
  });
}

require('../commons/utils/i18n').init(store);

const routes = configureRoutes(store);

if (window.gaid) {
  const ga = require('react-ga');
  const options = { debug: false };
  ga.initialize(window.gaid, options);
  history.listen((location) => {
    const auth = store.getState().auth;
    if (auth) {
      // 2016. 04. 19. [heekyu] TODO remove common logic
      for (var i = 0; i < (auth.roles || []).length; i++) { // eslint-disable-line
        const role = auth.roles[i];
        if (role.type === 'admin') {
          return;
        }
      }
    }
    ga.pageview(location.pathname);
  });
}

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
