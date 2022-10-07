export interface PokemonEntity {
  count: number;
  next: string;
  previous?: string;
  results: ResponseResults[];
}

interface ResponseResults {
  name: string;
  url: string;
}
