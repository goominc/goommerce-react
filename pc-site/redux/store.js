import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { default as reducer } from './reducers';

export default function configureStore(initialState) {
  const middlewares = [
    applyMiddleware(thunk),
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(applyMiddleware(createLogger()));
  }
  const finalCreateStore = compose(...middlewares)(createStore);

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
