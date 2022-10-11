import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetPokemonByNameUsecase } from '../../../core/domain/usecases/get-pokemon-by-name.usecase';
import { PokemonDetailModel } from '../../../core/domain/models/pokemonDetail.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonName = '';
  pokemonDetails: PokemonDetailModel = {
    name: '',
    weight: 0,
    front_image: '',
    back_image: '',
  };

  constructor(
    private route: ActivatedRoute,
    private getPokemonByName: GetPokemonByNameUsecase
  ) {}

  ngOnInit() {
    this.pokemonName = this.route.snapshot.params['name'];

    this.getPokemonByName
      .execute(this.pokemonName)
      .subscribe((pokemon) => (this.pokemonDetails = pokemon));
  }
}
