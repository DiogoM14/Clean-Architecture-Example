import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PokemonRepository} from "../../../domain/repositories/pokemon.repository";
import {PokemonImplementationRepositoryMapper} from "./mappers/pokemon-repository.mapper";
import {PokemonModel} from "../../../domain/models/pokemon.model";
import {PokemonEntity} from "./entities/pokemon-entity";

@Injectable({
  providedIn: 'root',
})
export class PokemonImplementationRepository extends PokemonRepository {
  pokemonMapper = new PokemonImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  handleFetchAllPokemons(): Observable<PokemonModel>{
    return this.http.get<PokemonEntity>('https://pokeapi.co/api/v2/pokemon')
      .pipe(map((response: any) => {
        return response.results
      }))
  }
}
