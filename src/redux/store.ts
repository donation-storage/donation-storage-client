import type { MakeStore } from 'next-redux-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import type { AnyAction, Store } from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import type { RootState } from './reducers';
import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleware = [thunk];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const makeStore: MakeStore<Store<RootState, AnyAction>> = () =>
  createStore(rootReducer, enhancer);

export const wrapper = createWrapper(makeStore);
