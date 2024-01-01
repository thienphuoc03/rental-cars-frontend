import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/stores/store';

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  roleId: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

interface AuthState {
  user: User | object;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  dep?: any;
  loading: boolean;
  error?: null;
  success: boolean;
}

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    tokens: {
      accessToken: '',
      refreshToken: '',
    },
    dep: '',
    loading: false,
    error: null,
    success: false,
  } as AuthState,
  reducers: {
    setStatus: (state) => {
      state.dep = Math.random();
    },
    setUser(state, action) {
      state.user = action.payload;
      state.dep = Math.random();
    },
    setTokens(state, action) {
      state.tokens.accessToken = action.payload;
    },
    //   logout
    logout(state) {
      state.user = {};
      state.tokens.accessToken = '';
      state.tokens.refreshToken = '';
      state.dep = Math.random();
    },
  },
});

export const { setUser, setTokens, logout } = authReducer.actions;

export default authReducer.reducer;

export const selectUsers = () => (state: RootState) => state.auth.user;
export const selectStatus = () => (state: RootState) => state.auth.dep;
