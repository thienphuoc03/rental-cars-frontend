import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

const REDUCER_NAME = 'dependence';

export type DepType = {
  dep: number;
};

const initialState: DepType = { dep: 0 };

const depReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setDependence(state, _) {
      state.dep = Math.random();
    },
  },
});

export const { setDependence } = depReducer.actions;
export default depReducer.reducer;
export const selectDep = (state: RootState) => state?.dep?.dep;
