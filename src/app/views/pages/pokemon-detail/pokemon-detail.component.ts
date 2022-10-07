import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonName: string = "";
  pokemonDetails: any = {}

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.pokemonName = this.route.snapshot.params['name']

    this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.pokemonName)
      .subscribe((response: any) => {
        this.pokemonDetails = response
      });
  }
}
