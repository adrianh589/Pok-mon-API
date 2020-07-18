import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonsComponent} from "./components/pokemones/pokemons.component";


const routes: Routes = [
  {path: 'pokemons', component: PokemonsComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'pokemons'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
