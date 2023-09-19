export class UserData{
    public id: number;
    public username:string;
    public token?: string;
    public email: string;


    constructor(id:number, username:string, token: string, email: string){
        this.id = id;
        this.username = username;
        this.token = token;
        this.email = email;
    }
}