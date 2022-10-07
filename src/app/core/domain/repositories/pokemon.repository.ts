import { Observable } from 'rxjs';
import {PokemonModel} from "../models/pokemon.model";

export abstract class PokemonRepository {

  abstract handleFetchAllPokemons(): Observable<PokemonModel>;
}
