import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
// import configureStore from './redux/store';
import { cloudinaryConfig } from 'react-cloudinary';
import configureRoutes from './routes';

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
);
/*
const store = configureStore(window.__INITIAL_STATE__);

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
*/