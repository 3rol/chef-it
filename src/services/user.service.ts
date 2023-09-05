import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

interface UserData {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  

  registerUser(userData: UserData): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/users/', userData)
    
  }
}
