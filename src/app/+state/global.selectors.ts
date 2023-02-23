import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GLOBAL_FEATURE_KEY, GlobalState } from './global.reducer';

export const getGlobalState =
  createFeatureSelector<GlobalState>(GLOBAL_FEATURE_KEY);

export const selectSideNavStatus = createSelector(
  getGlobalState,
  (state: GlobalState) => state.sidenavStatus
);
