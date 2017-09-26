import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ad } from "../../../classes/ad";
import { AdService } from "../../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { SearchPipe } from "../../../search.pipe";
import { Category } from "../../../classes/category";
import { CityService } from "../../../services/city.service";
import { CategoryService } from "../../../services/category.service";
import { AccordionModule } from 'ngx-bootstrap';
import { StateService } from "../../../services/state.service";
import { OrderByPipe } from "../../../order-by.pipe";
import { City } from "../../../classes/city";
import { State } from "../../../classes/state";



    
 
  


@Component({
  selector: 'app-state',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  currentState;
  ad: Ad;
  city; 
  subscription: Subscription;
  subscriptionCategories: Subscription;
  categories ;
  order = "name";
  ascending = true;
  filterState: State = new State();
  filterCity: City = new City();
  public oneAtATime: boolean = true;
  states;
  public customClass: string = 'customClass';
  public secondCustomClass: string = 'secondCustomClass';
  public isCollapsed:boolean = true;

  filter: Category = new Category();



  @Output() updatedBook = new EventEmitter<Ad>();

  constructor(private stateService: StateService, private categoryService: CategoryService, private cityService: CityService, private adService: AdService, private route: ActivatedRoute, private router: Router) { }

  public collapsed(event:any):void {
    console.log(event);
  }
 
  public expanded(event:any):void {
    console.log(event);
  }
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  
  length(variable) {
    return variable <= 1;
  }

  

  getCity() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.cityService.getCity(param.get('id'))
      )
      .subscribe(city => {
        this.city = city

      });
  }

  getcategories() {
    this.subscriptionCategories = this.route.paramMap
      .switchMap(param => 
       this.categoryService.getCategoryAds(param.get('id'))
      )
      .subscribe(categories => {
        this.categories = categories
        // this.categories.push(categories)

      });
  }

  getStates() {
    this.stateService.getStates()
    .then(states => {
      this.states = states
    })
    .catch(() => {})
  }
    

  ngOnInit() {
    this.getCity()
    this.getcategories()
    this.getStates()

  }


  onSubmit(form) {
    console.log(form)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionCategories.unsubscribe();
  }

}
