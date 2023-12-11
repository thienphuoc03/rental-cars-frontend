import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { combineReducers } from 'redux';

import cartReducer, { saveCartState } from '@/stores/reducers/cartReducer';

import authReducer from './reducers/authReducer';
import depReducer from './reducers/depReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  dep: depReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Subscribe to store changes to save the state to localStorage
store.subscribe(() => {
  saveCartState(store.getState().cart);
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
