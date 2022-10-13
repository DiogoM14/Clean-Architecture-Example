import { Observable } from 'rxjs';
import { PokemonsModel } from '../models/pokemons.model';
import { PokemonDetailModel } from '../models/pokemon-detail.model';

export abstract class PokemonRepository {
  abstract getAllPokemons(): Observable<PokemonsModel[]>;
  abstract getPokemonByName(
    pokemonName: string
  ): Observable<PokemonDetailModel>;
}
