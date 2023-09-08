import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

interface RegistrationData {
  username: string;
  password: string;
  email: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: RegistrationData = {
    username: '',
    password: '',
    email: '',
  };

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
      this.register = {
        username: '',
        password: '',
        email: '',
      };
  }
  registerUser(){
    this.userService.registerUser(this.register).subscribe(result => {
      this.userService.registerUser = result;
    })
}}
