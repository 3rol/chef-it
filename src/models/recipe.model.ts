import { RecipeType } from "./recipetype.model";
import { UserData } from "./user.model";

export class Recipe{
    public id: number;
    public name: string;
    public description: string;
    public updated: string;
    public created: string;
    public user: UserData;
    public recipe_type: RecipeType;
    public recipe_image: string;
    static description: any;
    static recipe_image: any;
    public image_url: string;
    public is_hardcoded: boolean;
    

    constructor(id: number, name: string, description: string,  updated: string, created: string, user: UserData, recipe_type: RecipeType, recipe_image: string, image_url: string, is_hardcoded: boolean ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.updated = updated;
        this.created = created;
        this.user = user;
        this.recipe_type = recipe_type;
        this.recipe_image = recipe_image;
        this.image_url = image_url;
        this.is_hardcoded = is_hardcoded;
    }
}

export interface RecipeData {
  id?: number; 
  name: string;
  description: string;
  updated?: string; 
  created?: string; 
  user?: number; // Add this line
  recipe_type?: string; // Add this line
  recipe_image: string;
  image_url: string;
  is_hardcoded : boolean;
  
}

