import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor( private router:Router ) { }

  ngOnInit(): void {
  }

  searchPokemon(search: string){
    console.log(search);
    if(search == ''){
      this.router.navigateByUrl('/pokemons');
    }else{
      this.router.navigate(['info', search]);
    }
  }

}
