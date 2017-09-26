import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdService } from "../services/ad.service";
import { StateService } from "../services/state.service";
import { Search } from "../classes/search";
import { AuthService } from "../services/auth.service";
import { OrderByPipe } from "../order-by.pipe";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  states;
  search: Search = new Search();
  order = "name";
  ascending = true;
  location;

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
    this.router.navigate(['/search', form.name, form.location])
    
  }

  ngOnInit() {
    this.getlinks()
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        console.log(position.coords); 
      });
   }
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
