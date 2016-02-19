import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { default as reducer } from './../../pc-site/redux/reducers';
import { default as mobileReducer } from './../../mobile-site/redux/reducers';

export default function configureStore(initialState) {
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
  const middlewares = [
    applyMiddleware(thunk),
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(applyMiddleware(createLogger()));
  }

  const finalCreateStore = compose(...middlewares)(createStore);

  const store = finalCreateStore(mobileReducer, initialState);

  return store;
}
