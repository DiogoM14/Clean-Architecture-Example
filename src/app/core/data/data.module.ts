import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {PokemonRepository} from "../domain/repositories/pokemon.repository";
import {GetAllPokemonsUsecase} from "../domain/usecases/get-all-pokemons.usecase";
import {PokemonImplementationRepository} from "./repositories/pokemon/pokemon-implementation.repository";

const getAllPokemonsUsecaseFactory =
  (pokemonRepo: PokemonRepository) => new GetAllPokemonsUsecase(pokemonRepo);
export const getAllPokemonsUsecaseProvider = {
  provide: GetAllPokemonsUsecase,
  useFactory: getAllPokemonsUsecaseFactory,
  deps: [PokemonRepository],
};

@NgModule({
  providers: [
    getAllPokemonsUsecaseProvider,
    { provide: PokemonRepository, useClass: PokemonImplementationRepository },
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
})
export class DataModule { }
