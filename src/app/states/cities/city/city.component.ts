import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ad } from "../../../classes/ad";
import { AdService } from "../../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { SearchPipe } from "../../../search.pipe";
import { Category } from "../../../classes/category";
import { CityService } from "../../../services/city.service";


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
  cities

  filter: Category = new Category();



  @Output() updatedBook = new EventEmitter<Ad>();

  constructor(private cityService: CityService, private adService: AdService, private route: ActivatedRoute, private router: Router) { }

  
  length(variable) {
    return variable <= 1;
  }

  getCities() {
    this.cityService.getAllCities()
    .then(cities => {
      console.log('got cities for cat', cities)
      this.cities = cities
    })
  }

  getCity() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.cityService.getCity(param.get('id'))
      )
      .subscribe(city => {
        console.log('got city',city)
        this.city = city

      });
  }

  getcategories() {
    this.subscriptionCategories = this.route.paramMap
      .switchMap(param => 
       this.adService.getCategoryAds(param.get('id'))
      )
      .subscribe(categories => {
        console.log('get cats!!',categories)
        this.categories = categories
        // this.categories.push(categories)

      });
  }

  
    

  ngOnInit() {
    this.getCity()
    this.getcategories()
    this.getCities()

  }


  onSubmit(form) {
    console.log(form)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionCategories.unsubscribe();
  }

}
