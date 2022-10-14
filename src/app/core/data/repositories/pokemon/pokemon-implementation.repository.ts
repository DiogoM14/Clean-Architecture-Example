import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonRepository } from '../../../domain/repositories/pokemon.repository';
import { PokemonsModel } from '../../../domain/models/pokemons.model';
import { PokemonsEntity } from './entities/pokemons.entity';
import { PokemonDetailModel } from '../../../domain/models/pokemon-detail.model';
import { PokemonDetailEntity } from './entities/pokemon-detail.entity';
import { PokemonDetailImplementationRepositoryMapper } from './mappers/pokemonDetail-repository.mapper';

@Injectable({
  providedIn: 'root',
})
export class PokemonImplementationRepository implements PokemonRepository {
  // pokemonMapper = new PokemonImplementationRepositoryMapper();
  pokemonDetailMapper = new PokemonDetailImplementationRepositoryMapper();

  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<PokemonsModel[]> {
    return this.http
      .get<PokemonsEntity>('https://pokeapi.co/api/v2/pokemon?limit=100')
      .pipe(
        map((response: PokemonsEntity) => {
          return response.results;
        })
      );
  }

  getPokemonByName(pokemonName: string): Observable<PokemonDetailModel> {
    return this.http
      .get<PokemonDetailEntity>(
        'https://pokeapi.co/api/v2/pokemon/' + pokemonName
      )
      .pipe(map(this.pokemonDetailMapper.mapFrom));
  }
}
