import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdService } from "../services/ad.service";
import { StateService } from "../services/state.service";
import { Search } from "../classes/search";

import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  states;
  search: Search = new Search();

  constructor(private stateService: StateService, private authService: AuthService, private router: Router, private adService: AdService) { }

  getlinks() {
    this.stateService.getStates()
    .then(states => {
      this.states = states
    })
    .catch(() => {})
  }


  onSubmit(form) {
    console.log(form)
    this.router.navigate(['/search', form.name])
    // window.location.reload()
  }

  ngOnInit() {
    this.getlinks()
  }

  isAuthed(): boolean {
    return this.authService.isAuthed();
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['home']))
      .catch(() => {})
  }

  


}
