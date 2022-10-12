import { UseCase } from '../base/use-case';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { PokemonDetailModel } from '../models/pokemon-detail.model';

export class GetPokemonByNameUseCase
  implements UseCase<string, PokemonDetailModel>
{
  constructor(private pokemonRepository: PokemonRepository) {}

  execute(pokemonName: string) {
    return this.pokemonRepository.getPokemonByName(pokemonName);
  }
}
