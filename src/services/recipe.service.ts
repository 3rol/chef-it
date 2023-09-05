import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from 'src/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
   
  public allRecipes = new BehaviorSubject<Recipe[]>([])



  constructor(private http:HttpClient) {  }  


  getRecipes() {
    this.http.get<Recipe[]>('http://127.0.0.1:8000/api/recipes/').subscribe(result => {
      this.allRecipes.next(result)

    })
  }
}
