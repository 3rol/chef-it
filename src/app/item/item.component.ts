import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { UserData } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe.model';
import { RecipeService } from 'src/services/recipe.service';
import { Comment } from 'src/models/comment.model';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  recipeData!: Recipe;
  comments: Comment[] = [];
  newCommentText: string = '';

  constructor(
    private recipeService: RecipeService,
    public authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipeService.recipeById.subscribe((result) => {
      this.recipeData = result;
      this.loadCommentsForRecipe();
    });
  }

  loadCommentsForRecipe() {
    this.recipeService.getCommentsForRecipe(this.recipeData.id).subscribe(
      (comments) => {
        // Assuming the comments from the API response include the 'user' property
        this.comments = comments;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  

  postComment(commentText: string) {
    const recipeId = this.recipeData.id;
    const currentUser = this.authService.currentUser || new UserData(0, '', ''); // Provide a default UserData object if currentUser is null
    const newComment: Comment = {
      id: 0, // You can set an initial ID here or leave it as 0
      user: currentUser, // Use currentUser or the default UserData
      body: commentText,
      recipe: this.recipeData,
    };
  
    this.recipeService.postComment(recipeId, newComment).subscribe((createdComment) => {
      // After posting the comment, refresh the comments list
      this.recipeService.getCommentsForRecipe(recipeId);
    });
  }
  deleteRecipe(recipeId: number) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(recipeId).subscribe(() => {
        // Redirect to the homepage upon successful deletion
        this.router.navigate(['/homepage']); // You may need to import Router from '@angular/router'
      });
    }
  }
  
  
}
