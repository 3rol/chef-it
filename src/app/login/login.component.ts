import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';

interface LoginData {
  username: string;
  password: string;
  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginData = {
    username: '',
    password: '',
   
  };
  
  constructor(private userService: UserService, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.login= {
      username: '',
      password: ''
    };
    
  }
  onLogin(){
    this.userService.loginUser(this.login).subscribe(result =>{
      this.userService.loginUser = result;
      const userData = result;

      this.authService.setUser(userData);

    })
      
  }
  
  
}
