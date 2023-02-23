import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { Observable, switchMap, withLatestFrom } from 'rxjs';

import { CharactersService } from '../characters.service';
import { DisneyCharacter } from '../disney-character.models';
import { GlobalActions } from '../+state/global.actions';
import { selectSideNavStatus } from '../+state/global.selectors';

export interface CharacterSelectionState {
  collection: DisneyCharacter[];
  selectedCharacterIds: number[];
  isLoadingCollection: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: CharacterSelectionState = {
  collection: [],
  selectedCharacterIds: [],
  isLoadingCollection: false,
  error: null,
};

@Injectable()
export class CharacterSelectionStore extends ComponentStore<CharacterSelectionState> {
  private selectedCharacterIds$ = this.select(
    (state) => state.selectedCharacterIds
  );

  characters$ = this.select((state) => state.collection);
  selectedCharacters$ = this.select(
    this.characters$,
    this.selectedCharacterIds$,
    (characters, selectedCharacterIds) =>
      selectedCharacterIds.map((id) =>
        characters.find((character) => character._id === id)
      )
  );

  constructor(
    private charactersService: CharactersService,
    private store: Store
  ) {
    super(initialState);
  }

  readonly loadCharacters = this.effect(
    (
      params$: Observable<{
        apiToken: string;
        searchTerm?: string;
      }>
    ) => {
      return params$.pipe(
        withLatestFrom(this.store.select(selectSideNavStatus)),
        switchMap(([params, sideNavStatus]) => {
          console.log('Initial sideNavStatus from selector', sideNavStatus);
          if (params.searchTerm) {
            this.setState((state) => {
              return {
                ...state,
                error: null,
                isLoadingCollection: true,
              };
            });
          }

          return this.charactersService.getCharacters().pipe(
            tapResponse(
              (characters) => {
                this.setState((state) => {
                  return {
                    ...state,
                    collection: characters,
                    isLoadingCollection: false,
                  };
                });
              },
              (error: HttpErrorResponse) => {
                this.setState((state) => {
                  return {
                    ...state,
                    error,
                    isLoadingCollection: false,
                  };
                });
              }
            )
          );
        })
      );
    }
  );

  selectCharacter(characterId: number): void {
    this.setState((state) => {
      return {
        ...state,
        selectedCharacterIds: [...state.selectedCharacterIds, characterId],
      };
    });
  }

  unselectCharacter(characterId: number): void {
    this.setState((state) => {
      return {
        ...state,
        selectedCharacterIds: state.selectedCharacterIds.filter(
          (id) => id !== characterId
        ),
      };
    });
  }

  toggleDetail(): void {
    this.store.dispatch(GlobalActions.toggleDetailSidenav());
  }
}
