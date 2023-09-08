import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser: UserData | null = null; // Define the structure of your user data

  constructor(private http: HttpClient) {}

  // Implement methods for user authentication, login, and logout

  // Simulate a login request to your backend
  login(username: string, password: string): Observable<UserData> {
    // Replace with your actual login API endpoint
    const loginData = { username, password };
    return this.http.post<UserData>('http://127.0.0.1:8000/api/login/', loginData);
  }

  // Log the user out and clear user data
  logout(): Observable<void> {
    // Replace with your actual logout API endpoint
    return this.http.post<void>('http://127.0.0.1:8000/api/logout/', null);
  }

  // Store user data when the user logs in
  setUser(user: UserData) {
    this.currentUser = user;
  }

  // Get the current user's data
  getCurrentUser(): UserData | null {
    return this.currentUser;
  }

  // Check if the user is authenticated (e.g., token is valid)
  isAuthenticated(): boolean {
    // Implement your authentication check logic here
    // For example, check if the user has a valid token
    return !!this.currentUser?.token;
  }
}
