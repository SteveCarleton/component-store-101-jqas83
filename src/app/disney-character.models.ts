export interface DisneyCharacter {
  a: boolean;
  films: any[];
  shortFilms: any[];
  tvShows: any[];
  videoGames: any[];
  parkAttractions: any[];
  allies: any[];
  enemies: any[];
  _id: number;
  name: string;
  imageUrl: string;
  url: string;
}

export interface DisneyApiResponse {
  data: DisneyCharacter[];
  count: number;
  totalPages: number;
  nextPage: string;
}
