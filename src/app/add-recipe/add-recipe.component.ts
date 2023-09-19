import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { RecipeData } from 'src/models/recipe.model';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  selectedRecipeType: string = '';
  selectedRecipe: RecipeData = { name: '', description: '', recipe_image: '', image_url: '', is_hardcoded: false};
  selectedImage: File | null = null;
  @ViewChild('imageInput') imageInput!: ElementRef;
  

  constructor(private recipeService: RecipeService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    if (localStorage.getItem('authToken')) {
      console.log('Token exists. Fetching user info...');
      this.authService.getUserInfo().subscribe(
        (userData) => {
          console.log('User info fetched:', userData);
        },
        (error) => {
          console.log('Failed to fetch user info:', error);
        }
      );
    } else {
      console.log('User is not logged in');
    }
    
  }
  triggerImageInput() {
    this.imageInput.nativeElement.click();
  }
  
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  addRecipe = () => {
    const userId = 1; // Replace with the actual id if needed
    const recipeType = 'Halal';
    const hardcodedImagePath = '/media/images/creamy-tomato-soup-buttery-croutons-hero-02-49b419d00f854db78838a79c8df9a23f.jpg'; 
  
    // Manually populate the data
    this.selectedRecipe = {
      name: 'Test',
      recipe_type: recipeType,
      description: 'Test',
      user: userId,
      recipe_image: hardcodedImagePath, // Add this line
      image_url: hardcodedImagePath,
      is_hardcoded: false
    };
  
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('name', this.selectedRecipe.name);
      formData.append('description', this.selectedRecipe.description);
      formData.append('recipe_image', this.selectedImage);
      
      this.recipeService.CreateRecipe(formData).subscribe(
        (data: any) => {
          console.log('Recipe created:', data);
          if (data.image_url) {
            this.selectedRecipe.image_url = data.image_url;
          }
          this.selectedRecipe = { name: '', description: '', recipe_image: '', image_url: '', is_hardcoded: false};
          this.imageInput.nativeElement.value = '';
          this.selectedImage = null;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    } else {
      this.recipeService.CreateRecipe(this.selectedRecipe).subscribe(
        (data: any) => {
          console.log('Recipe created:', data);
          this.selectedRecipe = { name: '', description: '', recipe_image: '', image_url: '', is_hardcoded: false};
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
  
}
