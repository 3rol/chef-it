import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchValue= '';
  

  constructor(private recipeService: RecipeService) {

  }
  obj:any;
  ngOnInit(): void{
    
    
  }
  
  
}
