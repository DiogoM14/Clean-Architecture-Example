import { Component } from '@angular/core';
import { GetAllPokemonsUseCase } from '../../../core/domain/usecases/get-all-pokemons-use.case';
import { PokemonsModel } from '../../../core/domain/models/pokemons.model';
import { NgForm } from '@angular/forms';
import { GetPokemonByNameUseCase } from '../../../core/domain/usecases/get-pokemon-by-name-use.case';
import { PokemonDetailModel } from '../../../core/domain/models/pokemon-detail.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  pokemons: PokemonsModel[] = [];
  showPokemonList = false;
  pokemonName = '';
  pokemonDetails?: PokemonDetailModel;
  isLoading = false;

  constructor(
    private getAllPokemons: GetAllPokemonsUseCase,
    private getPokemonByName: GetPokemonByNameUseCase
  ) {}

  handleSearchPokemonByName(form: NgForm) {
    this.isLoading = true;
    this.pokemonName = form.value.pokemonName.toLowerCase();

    this.getPokemonByName.execute(this.pokemonName).subscribe((pokemon) => {
      this.pokemonDetails = pokemon;
    });

    this.isLoading = false;

    form.reset();
  }

  handleFetchAllPokemons() {
    this.isLoading = true;
    this.getAllPokemons.execute().subscribe((pokemons: PokemonsModel[]) => {
      this.pokemons = pokemons;
    });
    this.isLoading = false;
  }

  handleClearPokemonDetails() {
    this.pokemonDetails = undefined;
  }
}
