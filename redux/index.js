import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';

import user from './user';
import followers from './followers';

const reducer = combineReducers({ user, followers });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(
    thunk,
    logger
  )
);

export const persistor = persistStore(store);

export default store;
