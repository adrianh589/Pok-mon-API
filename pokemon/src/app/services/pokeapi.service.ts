import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {combineAll, concatAll, map, mapTo, mergeMap, toArray} from "rxjs/operators";

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
      .pipe(
        mergeMap( results => results['results'] ),          // Get name and urls
        map( urls => urls['url'] ),                         // Get only urls
        mergeMap( pokemon => this.getInfoPokemon(pokemon) ),// Get all info of pokemon (withouth description)
        map( result =>  this.returnRelevant(result) ),      // Get relevant information
        toArray()
     ) ;
  }

  returnRelevant(result)
  {
    const pokemon = {
      name:  result['name'],
      stats: result['stats'],
      types: result['types'],
      image: result['sprites'].front_default,
      description: this.getInfoPokemon(result['species'].url)
        .pipe(
          map(res => res['flavor_text_entries']),
          map( res => res[42] ),
          map(res => res['flavor_text']))
        .subscribe( res => pokemon.description = res )
    }
    return pokemon;
  }

  getInfoPokemon(id: string){
    return this.http.get(id);
  }

}
