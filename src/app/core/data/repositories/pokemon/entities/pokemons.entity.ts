export interface PokemonsEntity {
  count: number;
  next: string;
  previous?: string;
  results: ResponseResults[];
}

interface ResponseResults {
  name: string;
  url: string;
}
