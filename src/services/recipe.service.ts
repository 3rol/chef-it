import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from 'src/models/recipe.model';
import { RecipeType } from 'src/models/recipetype.model';
import { UserData } from 'src/models/user.model';
import { AuthenticationService } from './authentication.service';
import { Comment } from 'src/models/comment.model';
import { tap, map } from 'rxjs';
export interface RecipeData {
  id?: number; // Include optional properties that the server may generate
  name: string;
  description: string;
  updated?: string; // Include optional properties that the server may generate
  created?: string; // Include optional properties that the server may generate
  user?: number;   // Include optional properties that the server may generate
  recipe_type?: number; // Include optional properties that the server may generate
  recipe_image: string;
}


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public searchResults = new BehaviorSubject<Recipe[]>([]);
  public allRecipes = new BehaviorSubject<Recipe[]>([]);
  public recipeById = new BehaviorSubject<Recipe>(new Recipe(0,"","","","",new UserData(0, "", "") ,new RecipeType(0, ""),""));
  public recipeComments = new BehaviorSubject<Comment[]>([]);
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  getRecipes() {
    this.http.get<Recipe[]>('http://127.0.0.1:8000/api/recipes/getrecipe/').subscribe(
      (result) => {
       
        const recipesWithImageUrls = result.map((recipe) => ({
          ...recipe,
          recipe_image: `http://127.0.0.1:8000${recipe.recipe_image}`,
          user:{
            id: recipe.user.id,
            username: recipe.user.username,
          }
        }));
        this.allRecipes.next(recipesWithImageUrls);
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  CreateRecipe(recipeData: RecipeData | FormData): Observable<Recipe> {
    if (recipeData instanceof FormData) {
      // If it's FormData (image selected), send it directly
      return this.http.post<Recipe>('http://127.0.0.1:8000/api/recipes/addrecipe', recipeData);
    } else {
      // If it's RecipeData (no image selected), create FormData and send it
      const formData = {
        name: recipeData.name,
        description: recipeData.description
      }
      
  
      return this.http.post<Recipe>('http://127.0.0.1:8000/api/recipes/addrecipe', formData);
    }
  }

  getRecipeById(recipeId : number){
    this.http.get<Recipe>("http://127.0.0.1:8000/api/recipes/getrecipe/" + recipeId).subscribe(result => {
    this.recipeById.next(result);
    });

    this.http.get<Comment[]>(`http://127.0.0.1:8000/api/recipes/getcomments/${recipeId}`).subscribe(result => {
    this.recipeComments.next(result);
  });
  }
  getCommentsForRecipe(recipeId: number): Observable<Comment[]> {
    const userId = this.authService.currentUser?.id; // Use optional chaining here
    const commentData = {
      user: userId,
      recipe: recipeId,
    };
    return this.http.get<Comment[]>(`http://127.0.0.1:8000/api/recipes/getcomments/${recipeId}`);
  }
  

  postComment(recipeId: number, commentData: Comment): Observable<Comment> {
    // Add an authorization header with the token
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      })
    };
    
    console.log(httpOptions)
    return this.http.post<Comment>(
      `http://127.0.0.1:8000/api/recipes/postcomment/${recipeId}/`,
      commentData,
      httpOptions // Include the headers in the request
    );
  }
  deleteRecipe(recipeId: number): Observable<void> {
    // Add an authorization header with the token
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      })
    };
  
    return this.http.delete<void>(`http://127.0.0.1:8000/api/recipes/delete-recipe/${recipeId}/`, httpOptions);
  }
  
  searchRecipes(searchTerm: string): Observable<Recipe[]> {
    const params = { name: searchTerm };

    return this.http.get<Recipe[]>('http://127.0.0.1:8000/api/recipes/getrecipe/', { params })
      .pipe(
        map((recipes: Recipe[]) => {
          // Update the image URLs for search results
          return recipes.map((recipe) => ({
            ...recipe,
            recipe_image: `http://127.0.0.1:8000${recipe.recipe_image}`
          }));
        }),
        tap((updatedRecipes: Recipe[]) => {
          this.searchResults.next(updatedRecipes);
        })
      );
  }
  

  updateSearchResults(results: Recipe[]) {
    this.allRecipes.next(results);
  }
  
}
  
  
  

