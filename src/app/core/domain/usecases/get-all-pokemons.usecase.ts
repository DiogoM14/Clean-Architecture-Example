import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import {PokemonModel} from "../models/pokemon.model";
import {PokemonRepository} from "../repositories/pokemon.repository";

export class GetAllPokemonsUsecase implements UseCase<void, PokemonModel> {

  constructor(private pokemonRepository: PokemonRepository) { }

  execute(): Observable<PokemonModel> {
    return this.pokemonRepository.handleFetchAllPokemons()
  }
}
