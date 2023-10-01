import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchValue = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // ...
  }

  searchRecipes() {
    this.recipeService.searchRecipes(this.searchValue).subscribe(
      (recipes) => {
       
        this.recipeService.updateSearchResults(recipes);
      },
      (error) => {
        console.error('Error searching recipes:', error);
      }
    );
  }
}
