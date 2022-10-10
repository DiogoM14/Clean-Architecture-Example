import {Component, ElementRef, OnInit} from '@angular/core';
import {GetAllPokemonsUsecase} from "../../../core/domain/usecases/get-all-pokemons.usecase";
import {PokemonsModel} from "../../../core/domain/models/pokemons.model";
import {NgForm, ValidationErrors} from "@angular/forms";
import {GetPokemonByNameUsecase} from "../../../core/domain/usecases/get-pokemon-by-name.usecase";
import {PokemonDetailModel} from "../../../core/domain/models/pokemonDetail.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: PokemonsModel[] = [];
  showPokemonList: boolean = false
  pokemonName: string = ""
  pokemonDetails?: PokemonDetailModel;

  constructor(private getAllPokemons: GetAllPokemonsUsecase, private getPokemonByName: GetPokemonByNameUsecase) { }

  ngOnInit(): void {
  }

  handleSearchPokemonByName(form: NgForm) {
    this.pokemonName = form.value.pokemonName

    this.getPokemonByName.execute(this.pokemonName)
      .subscribe((pokemon) => {
        this.pokemonDetails = pokemon
      })
  }

  handleFetchAllPokemons() {
    this.getAllPokemons.execute()
      .subscribe((pokemons: any) => {
      this.pokemons = pokemons
    });
  }
}
