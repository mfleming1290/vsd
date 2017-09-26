import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../../services/pager.service'
import { CityService } from "../../../services/city.service";
import { Router } from "@angular/router";
import { OrderByPipe } from "../../../order-by.pipe";



@Component({
  selector: 'app-ad-city-list',
  templateUrl: './ad-city-list.component.html',
  styleUrls: ['./ad-city-list.component.css'],
  providers: [OrderByPipe]

})
export class AdCityListComponent implements OnInit {
  order = "name";
  ascending = true;
  p: number = 1;
  collection: any[];

  constructor(private orderByPipe: OrderByPipe, private router: Router, private CityService: CityService, private pagerService: PagerService) { }


  getCities() {
    this.CityService.getAllCities()
    .then(cities => {
      console.log('getting pages from the server', cities);
      
      return this.orderByPipe.transform(cities, this.order, this.ascending)

    })
    .then((orderedCities) => {
      this.collection = orderedCities;
  

    })
    .catch(() => {})
  }

  tdClick(event: Event) {
        event.stopPropagation();
    }

  removeCity(city) {
    console.log('in component')
    this.CityService.removeCity(city._id)
    .then(() => this.router.navigate(['/']))
    .catch(console.log)
  }

  ngOnInit() {
    this.getCities()
  }

  
}
