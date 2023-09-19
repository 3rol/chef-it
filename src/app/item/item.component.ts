import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { UserData } from './../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() recipes!:Recipe
  comments: Comment[] = [];
  newCommentText: string = '';

  constructor(
    private recipeService: RecipeService,
    public authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipeService.recipeById.subscribe((result) => {
      this.recipes = result;
      this.loadCommentsForRecipe();
    });
  }

  loadCommentsForRecipe() {
    this.recipeService.getCommentsForRecipe(this.recipes.id).subscribe(
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
    const recipeId = this.recipes.id;
    const currentUser = this.authService.currentUser || new UserData(0, '', '', ""); // Provide a default UserData object if currentUser is null
    const newComment: Comment = {
      id: 0, // You can set an initial ID here or leave it as 0
      user: currentUser, // Use currentUser or the default UserData
      body: commentText,
      recipe: this.recipes,
    };
  
    this.recipeService.postComment(recipeId, newComment).subscribe((createdComment) => {
      // After posting the comment, refresh the comments list
      this.recipeService.getCommentsForRecipe(recipeId);
      this.router.navigate(['/homepage']); 
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

  deleteComment(commentId: number) {
    this.recipeService.deleteComment(commentId).subscribe(
      () => {
        // Comment deleted successfully, now update your local comments list
        this.comments = this.comments.filter(comment => comment.id !== commentId);
        this.router.navigate(['/homepage'])
      },
      error => {
        // Handle the error here
        console.error('Could not delete comment:', error);
      }
    );
  }
  
  
}
