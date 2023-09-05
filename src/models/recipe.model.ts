export class Recipe{
    public id: number;
    public name: string;
    public description: string;
    public updated: string;
    public created: string;
    public user: number;
    public recipe_type: number;
    

    constructor(id: number, name: string, description: string,  updated: string, created: string, user: number, recipe_type: number ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.updated = updated;
        this.created = created;
        this.user = user;
        this.recipe_type = recipe_type;
    }
}
