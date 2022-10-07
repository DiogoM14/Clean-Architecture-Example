import { Component, OnInit } from '@angular/core';
import {GetAllPokemonsUsecase} from "../../../core/domain/usecases/get-all-pokemons.usecase";
import {PokemonModel} from "../../../core/domain/models/pokemon.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: PokemonModel[] = [];

  constructor(private getAllPokemons: GetAllPokemonsUsecase) { }

  ngOnInit(): void {
  }

  handleFetchAllPokemons() {
    this.getAllPokemons.execute()
      .subscribe((pokemons: any) => {
      this.pokemons = pokemons
    });
  }
}
