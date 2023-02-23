import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSelectionListChange } from '@angular/material/list';
import { combineLatest, map, tap } from 'rxjs';
import { CharacterSelectionStore } from './character-selection.store';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css'],
  providers: [CharacterSelectionStore],
})
export class CharacterSelectionComponent implements OnInit {
  characters$ = this.characterSelectionStore.characters$;
  selectedCharacters$ = this.characterSelectionStore.selectedCharacters$.pipe(
    tap((selectedCharacters) => console.log(selectedCharacters))
  );

  vm$ = combineLatest([this.characters$, this.selectedCharacters$]).pipe(
    map(([characters, selectedCharacters]) => ({
      characters,
      selectedCharacters,
    }))
  );

  constructor(private characterSelectionStore: CharacterSelectionStore) {}

  ngOnInit(): void {
    this.characterSelectionStore.loadCharacters({ apiToken: 'an api token' });
  }

  toggleCharacterSelection(
    matSelectionListChange: MatSelectionListChange
  ): void {
    const selectedCharacter = matSelectionListChange.options[0].value;
    const isSelected = matSelectionListChange.options[0].selected;

    if (isSelected) {
      this.characterSelectionStore.selectCharacter(selectedCharacter._id);
    } else {
      this.characterSelectionStore.unselectCharacter(selectedCharacter._id);
    }
  }

  toggleDetail(): void {
    this.characterSelectionStore.toggleDetail();
  }
}
