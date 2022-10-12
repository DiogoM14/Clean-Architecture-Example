import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonRepository } from '../domain/repositories/pokemon.repository';
import { GetAllPokemonsUseCase } from '../domain/usecases/get-all-pokemons-use.case';
import { PokemonImplementationRepository } from './repositories/pokemon/pokemon-implementation.repository';
import { GetPokemonByNameUseCase } from '../domain/usecases/get-pokemon-by-name-use.case';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { SignupUseCase } from '../domain/usecases/signup.usecase';
import { AuthImplementationRepository } from './repositories/auth/auth-implementation.repository';
import { LoginUseCase } from '../domain/usecases/login.usecase';
import { GetLoggedInUserUseCase } from '../domain/usecases/get-logged-in-user.usecase';

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

const signupUseCaseFactory = (authRepo: AuthRepository) =>
  new SignupUseCase(authRepo);
export const signupUseCaseProvider = {
  provide: SignupUseCase,
  useFactory: signupUseCaseFactory,
  deps: [AuthRepository],
};

const loginUseCaseFactory = (authRepo: AuthRepository) =>
  new LoginUseCase(authRepo);
export const loginUseCaseProvider = {
  provide: LoginUseCase,
  useFactory: loginUseCaseFactory,
  deps: [AuthRepository],
};

const getLoggedInUserUseCaseFactory = (authRepo: AuthRepository) =>
  new GetLoggedInUserUseCase(authRepo);
export const getLoggedInUserUseCaseProvider = {
  provide: GetLoggedInUserUseCase,
  useFactory: getLoggedInUserUseCaseFactory,
  deps: [AuthRepository],
};

@NgModule({
  providers: [
    getAllPokemonsUseCaseProvider,
    getPokemonByNameUseCaseProvider,
    signupUseCaseProvider,
    loginUseCaseProvider,
    getLoggedInUserUseCaseProvider,
    { provide: PokemonRepository, useClass: PokemonImplementationRepository },
    { provide: AuthRepository, useClass: AuthImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
