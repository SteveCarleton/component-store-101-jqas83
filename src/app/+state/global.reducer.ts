import { Action, createReducer, on } from '@ngrx/store';
import { DisneyCharacter } from '../disney-character.models';
import { GlobalActions } from './global.actions';

export const GLOBAL_FEATURE_KEY = 'global';

export interface GlobalState {
  characters: DisneyCharacter[];
  sidenavStatus: boolean;
}

export const initialState = {
  characters: [],
  sidenavStatus: false,
};

const reducer = createReducer(
  initialState,
  on(GlobalActions.toggleDetailSidenav, (state) => ({
    ...state,
    sidenavStatus: !state.sidenavStatus,
  })),
  on(GlobalActions.selectCharacter, (state, { character }) => ({
    ...state,
    characters: [...state.characters, character],
  })),
  on(GlobalActions.selectCharacter, (state, { character }) => ({
    ...state,
    characters: [...state.characters, character],
  }))
);

export function globalReducer(state: GlobalState | undefined, action: Action) {
  return reducer(state, action);
}
