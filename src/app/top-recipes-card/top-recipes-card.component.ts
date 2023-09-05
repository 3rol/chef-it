import { Recipe } from './../../models/recipe.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-recipes-card',
  templateUrl: './top-recipes-card.component.html',
  styleUrls: ['./top-recipes-card.component.css']
})
export class TopRecipesCardComponent {
  @Input() recipe!:Recipe

}
