import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe.model';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-regular-card',
  templateUrl: './regular-card.component.html',
  styleUrls: ['./regular-card.component.css']
})
export class RegularCardComponent {
  @Input() recipes!:Recipe

  constructor(private recipeService : RecipeService){
    
  }

  getRecipeById(recipeId: number){
    this.recipeService.getRecipeById(recipeId);
  }

}
