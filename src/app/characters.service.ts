import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { DisneyApiResponse, DisneyCharacter } from './disney-character.models';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  baseUrl = 'https://api.disneyapi.dev';
  constructor(private httpClient: HttpClient) {}

  getCharacters(): Observable<DisneyCharacter[]> {
    return this.httpClient
      .get<DisneyApiResponse>(`${this.baseUrl}/characters`)
      .pipe(map((response) => response.data));
  }
}
