import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonRepository } from '../domain/repositories/pokemon.repository';
import { GetAllPokemonsUsecase } from '../domain/usecases/get-all-pokemons.usecase';
import { PokemonImplementationRepository } from './repositories/pokemon/pokemon-implementation.repository';
import { GetPokemonByNameUsecase } from '../domain/usecases/get-pokemon-by-name.usecase';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { SignupUsecase } from '../domain/usecases/signup-auth.usecase';
import { AuthImplementationRepository } from './repositories/auth/auth-implementation.repository';
import { SigninUsecase } from '../domain/usecases/signin-auth.usecase';

const getAllPokemonsUsecaseFactory = (pokemonRepo: PokemonRepository) =>
  new GetAllPokemonsUsecase(pokemonRepo);
export const getAllPokemonsUsecaseProvider = {
  provide: GetAllPokemonsUsecase,
  useFactory: getAllPokemonsUsecaseFactory,
  deps: [PokemonRepository],
};

const getPokemonByNameUsecaseFactory = (pokemonRepo: PokemonRepository) =>
  new GetPokemonByNameUsecase(pokemonRepo);
export const getPokemonByNameUsecaseProvider = {
  provide: GetPokemonByNameUsecase,
  useFactory: getPokemonByNameUsecaseFactory,
  deps: [PokemonRepository],
};

const signupUsecaseFactory = (authRepo: AuthRepository) =>
  new SignupUsecase(authRepo);
export const signupUsecaseProvider = {
  provide: SignupUsecase,
  useFactory: signupUsecaseFactory,
  deps: [AuthRepository],
};

const signinUsecaseFactory = (authRepo: AuthRepository) =>
  new SigninUsecase(authRepo);
export const signinUsecaseProvider = {
  provide: SigninUsecase,
  useFactory: signinUsecaseFactory,
  deps: [AuthRepository],
};

@NgModule({
  providers: [
    getAllPokemonsUsecaseProvider,
    getPokemonByNameUsecaseProvider,
    signupUsecaseProvider,
    signinUsecaseProvider,
    { provide: PokemonRepository, useClass: PokemonImplementationRepository },
    { provide: AuthRepository, useClass: AuthImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
