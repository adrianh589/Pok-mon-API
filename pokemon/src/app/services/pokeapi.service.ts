import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) {
    console.log('Poke Service Ready');
  }

  getQuery(search: string): Observable<any> {
    const URL = `https://pokeapi.co/api/v2/${search}`;
    return this.http.get(URL);
  }

  getAllPokemons(): Observable<any[]> {
    return this.getQuery('pokemon?limit=150')
      .pipe(
        concatMap(results => results['results']),            // Get name and urls
        concatMap(urls => this.getInfoPokemon(urls['url'])), // Get all info of pokemon (without description)
        concatMap(result => this.returnRelevant(result)),    // Get relevant information
        toArray()                                            // Collect all results into an array
      );
  }

  returnRelevant(result: any): Observable<any> {
    return this.getInfoPokemon(result['species'].url)
      .pipe(
        map(speciesInfo => {
          const descriptionEntry = speciesInfo['flavor_text_entries'].find((entry: any) => entry.language.name === 'en');
          const pokemon = {
            name: result['name'],
            stats: result['stats'],
            types: result['types'],
            image: result['sprites'].front_default,
            description: descriptionEntry ? descriptionEntry['flavor_text'] : 'No description available'
          };
          return pokemon;
        })
      );
  }

  getInfoPokemon(id: string): Observable<any> {
    return this.http.get(id);
  }

}
