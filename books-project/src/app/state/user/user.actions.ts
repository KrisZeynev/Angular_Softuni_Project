import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loginUser = createAction(
  '[Auth] Login User',
  props<{ user: User }>()
);

export const logoutUser = createAction('[Auth] Logout User');

export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[Auth] Load User Failure',
  props<{ error: any }>()
);
