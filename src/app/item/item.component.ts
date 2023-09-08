import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { UserData } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe.model';
import { RecipeService } from 'src/services/recipe.service';
import { Comment } from 'src/models/comment.model';
 

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
    public authService: AuthenticationService
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
}
