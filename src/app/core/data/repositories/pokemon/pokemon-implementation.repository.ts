import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PokemonRepository} from "../../../domain/repositories/pokemon.repository";
import {PokemonImplementationRepositoryMapper} from "./mappers/pokemons-repository.mapper";
import {PokemonsModel} from "../../../domain/models/pokemons.model";
import {PokemonsEntity} from "./entities/pokemons-entity";
import {PokemonDetailModel} from "../../../domain/models/pokemonDetail.model";
import {PokemonDetailEntity} from "./entities/pokemonDetail-entity";
import {PokemonDetailImplementationRepositoryMapper} from "./mappers/pokemonDetail-repository.mapper";

@Injectable({
  providedIn: 'root',
})
export class PokemonImplementationRepository extends PokemonRepository {
  // pokemonMapper = new PokemonImplementationRepositoryMapper();
  pokemonDetailMapper = new PokemonDetailImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  getAllPokemons(): Observable<PokemonsModel>{
    return this.http.get<PokemonsEntity>('https://pokeapi.co/api/v2/pokemon')
      .pipe(map((response: any) => {
        return response.results
      }))
  }

  override getPokemonByName(pokemonName: string): Observable<PokemonDetailModel> {
    // this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.pokemonName)
    //  .subscribe((response: any) => {
    //    this.pokemonDetails = response
    //  });

    return this.http.get<PokemonDetailEntity>('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
      .pipe(map(this.pokemonDetailMapper.mapFrom))
  }
}
