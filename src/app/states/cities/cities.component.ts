import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { City } from "../../classes/city";
import { CityService } from "../../services/city.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { SearchPipe } from "../../search.pipe";
import { Category } from "../../classes/category";
import { OrderByPipe } from "../../order-by.pipe";





@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  subscription: Subscription;
  cities ;
  order = "name";
  ascending = true;
  filter: City = new City();



  constructor(private cityService: CityService, private route: ActivatedRoute, private router: Router) { }

  
  length(variable) {
    return variable <= 1;
  }

  getCities() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.cityService.getCities(param.get('city'))
      )
      .subscribe(city => {
        this.cities = city

      });
  }
  
    

  ngOnInit() {
    this.getCities()

  }


  onSubmit(form) {
    console.log(form)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
