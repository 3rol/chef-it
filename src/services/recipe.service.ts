import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from 'src/models/recipe.model';
import { RecipeType } from 'src/models/recipetype.model';
import { UserData } from 'src/models/user.model';
import { AuthenticationService } from './authentication.service';
import { Comment } from 'src/models/comment.model';
import { tap, map } from 'rxjs';
import { RecipeData } from 'src/models/recipe.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public searchResults = new BehaviorSubject<Recipe[]>([]);
  public allRecipes = new BehaviorSubject<Recipe[]>([]);
  public recipeById = new BehaviorSubject<Recipe>(new Recipe(0,"","","","",new UserData(0, "", "", "") ,new RecipeType(0, ""),"", "", false));
  public recipeComments = new BehaviorSubject<Comment[]>([]);
  constructor(private http: HttpClient, private authService: AuthenticationService, private router: Router) {}

  getRecipes() {
    this.http.get<Recipe[]>('http://127.0.0.1:8000/api/recipes/getrecipe/').subscribe(
      (result) => {
        const recipesWithImageUrls = result.map((recipe) => {
          let recipe_image;
           
          recipe_image = `http://127.0.0.1:8000${recipe.recipe_image}`;
          
          return {
            ...recipe,
            recipe_image,
            user: {
              id: recipe.user.id,
              username: recipe.user.username,
              email: recipe.user.email,
            }
          };
        });
        this.allRecipes.next(recipesWithImageUrls);
        
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
  
  

  CreateRecipe(recipeData: RecipeData | FormData): Observable<Recipe> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      })
    };
    if (recipeData instanceof FormData) {
      
      return this.http.post<Recipe>('http://127.0.0.1:8000/api/recipes/addrecipe/', recipeData, httpOptions);
    } else {
  
      const formData = {
        name: recipeData.name,
        description: recipeData.description
      }
      this.router.navigate(['/homepage']);
  
      return this.http.post<Recipe>('http://127.0.0.1:8000/api/recipes/addrecipe/', formData, httpOptions);
    }
    
  }

  getRecipeById(recipeId: number) {
    this.http.get<Recipe>("http://127.0.0.1:8000/api/recipes/getrecipe/" + recipeId).subscribe(result => {
        let updatedResult;
        updatedResult = {
          ...result,
          recipe_image: `http://127.0.0.1:8000${result.recipe_image}`
      };
        
        this.recipeById.next(updatedResult);
    });

    this.http.get<Comment[]>(`http://127.0.0.1:8000/api/recipes/getcomments/${recipeId}`).subscribe(result => {
        this.recipeComments.next(result);
    });
}


  getCommentsForRecipe(recipeId: number): Observable<Comment[]> {
    const userId = this.authService.currentUser?.id;
    const commentData = {
      user: userId,
      recipe: recipeId,
    };
    return this.http.get<Comment[]>(`http://127.0.0.1:8000/api/recipes/getcomments/${recipeId}`);
  }
  

  postComment(recipeId: number, commentData: Comment): Observable<Comment> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      })
    };
    
    console.log(httpOptions)
    return this.http.post<Comment>(
      `http://127.0.0.1:8000/recipes/postcomment/${recipeId}/`,
      commentData,
      httpOptions 
    );
  }
  deleteRecipe(recipeId: number): Observable<void> {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      })
    };
  
    return this.http.delete<void>(`http://127.0.0.1:8000/recipes/delete-recipe/${recipeId}/`, httpOptions);
  }
  
  searchRecipes(searchTerm: string): Observable<Recipe[]> {
    const params = { name: searchTerm };

    return this.http.get<Recipe[]>('http://127.0.0.1:8000/api/recipes/getrecipe/', { params })
      .pipe(
        map((recipes: Recipe[]) => {
          
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
  deleteComment(commentId: number): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.authService.getToken()}`
      })
    };
    return this.http.delete<void>(
      `http://127.0.0.1:8000/recipes/delete-comment/${commentId}/`,
      httpOptions
    );
  }
  

  updateSearchResults(results: Recipe[]) {
    this.allRecipes.next(results);
  }
  
}
  
  
  

