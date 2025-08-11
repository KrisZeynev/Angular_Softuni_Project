import { createReducer, on } from '@ngrx/store';
import {
  loginUser,
  logoutUser,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
} from './user.actions';
import { initialUserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  on(loginUser, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(logoutUser, (state) => ({
    ...state,
    user: null,
    loading: false,
    error: null,
  })),
  on(loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Registration actions handling
  on(registerUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(registerUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(registerUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
