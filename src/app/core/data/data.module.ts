import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {PokemonRepository} from "../domain/repositories/pokemon.repository";
import {GetAllPokemonsUsecase} from "../domain/usecases/get-all-pokemons.usecase";
import {PokemonImplementationRepository} from "./repositories/pokemon/pokemon-implementation.repository";
import {GetPokemonByNameUsecase} from "../domain/usecases/get-pokemon-by-name.usecase";

const getAllPokemonsUsecaseFactory =
  (pokemonRepo: PokemonRepository) => new GetAllPokemonsUsecase(pokemonRepo);
export const getAllPokemonsUsecaseProvider = {
  provide: GetAllPokemonsUsecase,
  useFactory: getAllPokemonsUsecaseFactory,
  deps: [PokemonRepository],
};

const getPokemonByNameUsecaseFactory =
  (pokemonRepo: PokemonRepository) => new GetPokemonByNameUsecase(pokemonRepo);
export const getPokemonByNameUsecaseProvider = {
  provide: GetPokemonByNameUsecase,
  useFactory: getPokemonByNameUsecaseFactory,
  deps: [PokemonRepository],
};

@NgModule({
  providers: [
    getAllPokemonsUsecaseProvider,
    getPokemonByNameUsecaseProvider,
    { provide: PokemonRepository, useClass: PokemonImplementationRepository },
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
})
export class DataModule { }
