import { createSlice } from '@reduxjs/toolkit';

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
    loading: false,
    error: null,
    success: false,
  } as AuthState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setTokens(state, action) {
      state.tokens.accessToken = action.payload;
    },
    //   logout
    logout(state) {
      state.user = {};
      state.tokens.accessToken = '';
      state.tokens.refreshToken = '';
    },
  },
});

export const { setUser, setTokens, logout } = authReducer.actions;

export default authReducer.reducer;
