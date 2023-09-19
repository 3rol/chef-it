import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser = {
    id: 1,
    username: 'erol',
    email: 'erol@gmail.com'
};
  private authToken: string | null = null;

  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
  }
  }
  

  getUserInfo(): Observable<UserData> {
    const token = this.getToken();
    console.log('Debug Token:', token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${token}`
      })
    };

    return this.http.get<UserData>('http://127.0.0.1:8000/api/get_user_data/', httpOptions).pipe(
      tap((response) => {
        if (response) {
          this.setUser(response);
        }
      })
    );
  }

  setToken(token: string) {
    console.log('Setting token:', token);
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }

  clearToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  
  setUser(user: UserData) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(username: string, password: string): Observable<UserData> {
  const loginData = { username, password };
  return this.http.post<UserData>('http://127.0.0.1:8000/api/login/', loginData).pipe(
    tap((response: any) => {
      if (response && response.Token) {
        this.setToken(response.Token); // set the token from the 'Bearer' field of the response
      }
      if (response && response.user_info) {
        this.setUser(response.user_info); // set the user from the 'user_info' field of the response
      }
    })
    
  );
}


  // ...
}
