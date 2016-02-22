import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const reducer = require('./../../pc-site/redux/reducers');
  const middlewares = [
    applyMiddleware(thunk),
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(applyMiddleware(createLogger()));
  }

  const finalCreateStore = compose(...middlewares)(createStore);

  const store = finalCreateStore(reducer, initialState);

  return store;
}

export default function configureMobileStore(initialState) {
  const reducer = require('./../../mobile-site/redux/reducers');
  const middlewares = [
    applyMiddleware(thunk),
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(applyMiddleware(createLogger()));
  }

  const finalCreateStore = compose(...middlewares)(createStore);

  const store = finalCreateStore(reducer, initialState);

  return store;
}
