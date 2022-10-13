import { UseCase } from '../base/use-case';
import { PokemonsModel } from '../models/pokemons.model';
import { PokemonRepository } from '../repositories/pokemon.repository';

export class GetAllPokemonsUseCase implements UseCase<void, PokemonsModel[]> {
  constructor(private pokemonRepository: PokemonRepository) {}

  execute() {
    return this.pokemonRepository.getAllPokemons();
  }
}
