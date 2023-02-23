import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DisneyCharacter } from '../disney-character.models';

export const GlobalActions = createActionGroup({
  source: 'Global',
  events: {
    'Select Character': props<{ character: DisneyCharacter }>(),

    'Unelect Character': props<{ characterId: number }>(),

    'Toggle Detail Sidenav': emptyProps(),
  },
});
