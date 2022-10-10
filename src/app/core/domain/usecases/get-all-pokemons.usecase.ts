import { UseCase } from '../base/use-case';
import {PokemonsModel} from "../models/pokemons.model";
import {PokemonRepository} from "../repositories/pokemon.repository";

export class GetAllPokemonsUsecase implements UseCase<void, PokemonsModel[]> {

  constructor(private pokemonRepository: PokemonRepository) { }

  execute() {
    return this.pokemonRepository.getAllPokemons()
  }
}
