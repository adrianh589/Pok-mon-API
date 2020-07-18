import {Component, OnInit} from '@angular/core';
import {PokeapiService} from "../../services/pokeapi.service";
import {HttpClient} from "@angular/common/http";
import {isEmpty} from "rxjs/operators";

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html'
})
export class PokemonsComponent implements OnInit {

  pokemons: Object[] = [];

  constructor(private api: PokeapiService,
              private http: HttpClient) {
    this.getAllPokemons();
  }

  ngOnInit(): void {

  }

  getAllPokemons() {

    console.log('hice la llamada')

    this.api.getAllPokemons().subscribe((nameUrl: any[]) => {
      nameUrl.forEach((info: Object) => {
        this.api.getInfoPokemon(info['url']).subscribe((pokemon: Object) => {
          this.api.getDescriptionPokemon(pokemon['id']).subscribe(data => {
            let description = data['flavor_text_entries'][0]['flavor_text'];
            this.pokemons.push(pokemon = Object.assign(pokemon, {
              description: description
            }));
          });
        });
      })
    });

  }

}
