import {Component, OnInit} from '@angular/core';
import {PokeapiService} from "../../services/pokeapi.service";
import {HttpClient} from "@angular/common/http";
import {isEmpty} from "rxjs/operators";
import {PokemonModel} from "../models/pokemon.model";

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html'
})
export class PokemonsComponent implements OnInit {

  pokemons: PokemonModel[] = [];
  loading = true;

  constructor(private api: PokeapiService) {
    this.getAllPokemons();
  }

  ngOnInit(): void {

  }

  getAllPokemons() {
    this.api.getAllPokemons().subscribe( res => {
      this.pokemons = res;
      this.loading = false;
    });
  }

}
