import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { combineReducers } from 'redux';

import authReducer from './reducers/authReducer';
import depReducer from './reducers/depReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  dep: depReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
