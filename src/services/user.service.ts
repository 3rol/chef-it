import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

interface RegisterData {
  username: string;
  password: string;
  email: string;
}
interface LoginData {
  username: string;
  password: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  

  registerUser(registerData: RegisterData): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/register/', registerData)
    
  }

  loginUser(loginData: LoginData): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/login/', loginData)
    
  }
}
