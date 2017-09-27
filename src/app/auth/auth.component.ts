import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

import { User } from '../classes/user'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  registrationErrors: string[] = [];

  user: User = new User();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(user: User) {
    this.auth.register(user)
      .then(() => this.router.navigate(['ads']))
      .catch(response => this.handleErrors(response.json()))
  }

  onLogin(user: User) {
    this.auth.login(user) 
    .then(() => this.router.navigate(['ads']))
      .catch(response => this.handleErrors(response.json()))  
    
  }

  private handleErrors(errors: string[] | Error) {
    this.registrationErrors = Array.isArray(errors) ? errors : [errors.message]
  }

}
