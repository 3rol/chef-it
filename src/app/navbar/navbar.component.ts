import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private http:HttpClient) {

  }
  obj:any;
  ngOnInit(): void{
    this.obj = this.http.get("http://127.0.0.1:8000").subscribe(
      data => this.obj = data
    )
  }

}
