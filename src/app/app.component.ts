import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private recipeService:RecipeService, private authService: AuthenticationService){}
  ngOnInit(): void {
    const token = localStorage.getItem('Token');
  if (token) {
    // Fetch the user information based on the token and set currentUser.
    // The API endpoint and method will depend on your back-end implementation.
    this.authService.getUserInfo().subscribe(user => {
      this.authService.setUser(user);
    });
  }
    
    
  }
  title = 'chef-it';
}
