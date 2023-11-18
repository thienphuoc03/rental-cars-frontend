import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { combineReducers } from "redux";

import breadCrumbReducer from "./reducers/breadCrumb";
import statusApiReducer from "./reducers/statusAPI";
import tabReducer from "./reducers/tab";
import usersReducer from "./reducers/user";

const rootReducer = combineReducers({
  statusApi: statusApiReducer,
  users: usersReducer,
  tab: tabReducer,
  breadCrumb: breadCrumbReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
