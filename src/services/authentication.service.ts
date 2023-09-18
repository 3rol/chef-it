import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser: UserData | null = null;
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  setToken(token: string) {
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

  // Define the setUser method to set the currentUser property
  setUser(user: UserData) {
    this.currentUser = user;
  }

  login(username: string, password: string): Observable<UserData> {
    const loginData = { username, password };
    return this.http.post<UserData>('http://127.0.0.1:8000/api/login/', loginData).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token); // Store the token
          this.setUser(response); // Store the user data
        }
      })
    );
  }

  // ...
}
