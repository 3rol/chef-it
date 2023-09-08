import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { RecipeData } from 'src/models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  selectedRecipe: RecipeData = { name: '', description: '', recipe_image: '' };
  selectedImage: File | null = null;
  @ViewChild('imageInput') imageInput!: ElementRef;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    
  }

  
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  addRecipe = () => {
    
    if (this.selectedImage) {
      
      const formData = new FormData();
      formData.append('name', this.selectedRecipe.name);
      formData.append('description', this.selectedRecipe.description);
      formData.append('recipe_image', this.selectedImage);

      
      this.recipeService.CreateRecipe(formData).subscribe(
        (data: any) => {
         
          console.log('Recipe created:', data);
          
          this.selectedRecipe = { name: '', description: '', recipe_image: '' };
         
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
          this.selectedRecipe = { name: '', description: '', recipe_image: '' };
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
}
