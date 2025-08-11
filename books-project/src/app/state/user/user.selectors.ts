import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('userState');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (state) => !!state.user
);
