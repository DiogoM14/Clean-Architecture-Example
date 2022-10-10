export interface PokemonDetailEntity {
  id: number;
  weight: number;
  name: string;
  sprites: PokemonDetailImages
}

interface PokemonDetailImages {
  front_default: string;
  back_default: string;
}
