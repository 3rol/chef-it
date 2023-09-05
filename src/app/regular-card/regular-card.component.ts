import { Component, Input } from '@angular/core';
import { Recipe } from 'src/models/recipe.model';

@Component({
  selector: 'app-regular-card',
  templateUrl: './regular-card.component.html',
  styleUrls: ['./regular-card.component.css']
})
export class RegularCardComponent {
  @Input() recipe!:Recipe
}
