import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonRepository } from '../domain/repositories/pokemon.repository';
import { GetAllPokemonsUseCase } from '../domain/usecases/get-all-pokemons-use.case';
import { PokemonImplementationRepository } from './repositories/pokemon/pokemon-implementation.repository';
import { GetPokemonByNameUseCase } from '../domain/usecases/get-pokemon-by-name-use.case';
import { AuthImplementationRepository } from './repositories/auth/auth-implementation.repository';
import { AuthUseCases } from '../domain/usecases/auth.usecases';

const getAllPokemonsUseCaseFactory = (pokemonRepo: PokemonRepository) =>
  new GetAllPokemonsUseCase(pokemonRepo);
export const getAllPokemonsUseCaseProvider = {
  provide: GetAllPokemonsUseCase,
  useFactory: getAllPokemonsUseCaseFactory,
  deps: [PokemonRepository],
};

const getPokemonByNameUseCaseFactory = (pokemonRepo: PokemonRepository) =>
  new GetPokemonByNameUseCase(pokemonRepo);
export const getPokemonByNameUseCaseProvider = {
  provide: GetPokemonByNameUseCase,
  useFactory: getPokemonByNameUseCaseFactory,
  deps: [PokemonRepository],
};

@NgModule({
  providers: [
    getAllPokemonsUseCaseProvider,
    getPokemonByNameUseCaseProvider,
    { provide: PokemonRepository, useClass: PokemonImplementationRepository },
    { provide: AuthUseCases, useClass: AuthImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
