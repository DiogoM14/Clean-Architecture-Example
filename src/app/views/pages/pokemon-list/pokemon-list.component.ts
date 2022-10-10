import { Component } from '@angular/core';
import { GetAllPokemonsUsecase } from "../../../core/domain/usecases/get-all-pokemons.usecase";
import {PokemonsModel } from "../../../core/domain/models/pokemons.model";
import {NgForm} from "@angular/forms";
import {GetPokemonByNameUsecase} from "../../../core/domain/usecases/get-pokemon-by-name.usecase";
import {PokemonDetailModel} from "../../../core/domain/models/pokemonDetail.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemons: PokemonsModel[] = [];
  showPokemonList = false
  pokemonName = ""
  pokemonDetails?: PokemonDetailModel;

  constructor(private getAllPokemons: GetAllPokemonsUsecase, private getPokemonByName: GetPokemonByNameUsecase) { }

  handleSearchPokemonByName(form: NgForm) {
    this.pokemonName = form.value.pokemonName

    this.getPokemonByName.execute(this.pokemonName)
      .subscribe((pokemon) => {
        this.pokemonDetails = pokemon
      })
  }

  handleFetchAllPokemons() {
    this.getAllPokemons.execute()
      .subscribe((pokemons: PokemonsModel[]) => {
      this.pokemons = pokemons
    });
  }
}
