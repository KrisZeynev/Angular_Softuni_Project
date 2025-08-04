import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (state) => !!state.user
);

console.log(`here batio: ${selectUserState}`)
