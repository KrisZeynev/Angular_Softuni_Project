import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loginUser = createAction(
  '[User] Login',
  props<{ user: User }>()
);

export const logoutUser = createAction('[User] Logout');
