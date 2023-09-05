import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe.model';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public recipes!: Recipe[]
  constructor(private recipeService:RecipeService){}
  ngOnInit(): void {
    this.recipeService.getRecipes()
    this.recipeService.allRecipes.subscribe(result=>{
      this.recipes=result
    })
  }
  

}
