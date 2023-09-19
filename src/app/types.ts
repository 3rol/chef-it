export enum RecipeType {
     Halal = 'Halal',
     FastFood = 'FastFood',
     Vegan = 'Vegan',
     Spicy = 'Spicy'
  }
  
  export interface RecipeData {
    user: number;
    name: string;
    description: string;
    recipe_type: RecipeType; 
    recipe_image: string;
  }
  