import { Recipe } from "./recipe.model";
import { UserData } from "./user.model";

export class Comment{
    public id: number;
    public user: UserData;
    public body:string;
    public recipe: Recipe;


    constructor(id:number, user: UserData, body:string, recipe: Recipe){
        this.id=id;
        this.user = user;
        this.body = body;
        this.recipe = recipe;
    }
}