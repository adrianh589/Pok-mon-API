import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor( private http: HttpClient ) {
    console.log('Poke Service Ready');
  }

  getQuery(search: string){
    const URL = `https:/pokeapi.co/api/v2/${search}`;
    return this.http.get(URL);
  }

  getAllPokemons(){
    return this.getQuery('pokemon?limit=150')
      .pipe( map( data => data['results']));
  }

  getInfoPokemon(id: string){
    return this.http.get(id);
  }

   getDescriptionPokemon(id: string){
    return this.getQuery(`pokemon-species/${id}`);
  }

}
