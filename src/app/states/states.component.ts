import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { StateService } from "../services/state.service";
import { Subscription } from "rxjs/Subscription";
import { SearchPipe } from "../search.pipe";
import { OrderByPipe } from "../order-by.pipe";
import { City } from "../classes/city";



@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css'],
})
export class StatesComponent implements OnInit {
  states;
  subscription: Subscription;
  categories;

  order = "name";
  ascending = true;

  filter: City = new City();



  constructor( private router: Router, private stateService: StateService) { }

  getStates() {
    this.stateService.getStates()
    .then(states => {
      console.log(states)
      this.states = states
    })
    .catch(() => {})
  }

  getCategories(id) {

    this.stateService.getCategory(id)    
    // this.subscriptionCategories = this.route.paramMap
    //   .switchMap(param => 
    //    this.stateService.getCategories(param.get('id'))
    //   )
    .then(categories => {
            console.log('getting books from the server');
            
            this.categories = categories;
        })
        .catch(console.log)
      // .subscribe(categories => {
      //   console.log(categories)
      //   this.categories = categories
      //   // this.categories.push(categories)

      // });
  }

  public isCollapsed:boolean = true;
 
  public collapsed(event:any):void {
    console.log(event);
  }
 
  public expanded(event:any):void {
    console.log(event);
  }
    

  

  ngOnInit() {
    this.getStates()
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
