import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(reducer, initialState) {
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
