export class UserData{
    public id: number;
    public username:string;
    public token?: string;


    constructor(id:number, username:string, token: string){
        this.id = id;
        this.username = username;
        this.token = token;
    }
}