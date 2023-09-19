import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router:Router) { }

  

  registerUser(registerData: RegisterData): Observable<any>{
    this.router.navigate(['/login']);
    return this.http.post('http://127.0.0.1:8000/api/register/', registerData)
    
  }

  loginUser(loginData: LoginData): Observable<any>{
    this.router.navigate(['/homepage']);
    return this.http.post('http://127.0.0.1:8000/api/login/', loginData)
    
  }
}
