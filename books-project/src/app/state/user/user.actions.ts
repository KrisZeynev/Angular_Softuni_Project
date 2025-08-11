import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const login = createAction(
  '[User] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: any }>()
);

export const register = createAction(
  '[User] Register',
  props<{ email: string; password: string; username: string }>()
);

export const registerSuccess = createAction(
  '[User] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[User] Register Failure',
  props<{ error: any }>()
);

export const logout = createAction('[User] Logout');
