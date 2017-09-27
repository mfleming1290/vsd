import { Component, OnInit } from '@angular/core';
import { AdService } from "../../../services/ad.service";
import { PagerService } from '../../../services/pager.service'
import { Router } from "@angular/router";
import { Ad } from "../../../classes/ad";
import { StateService } from "../../../services/state.service";
import { OrderByPipe } from "../../../order-by.pipe";


@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css'],
  providers: [OrderByPipe]
})
export class AdListComponent implements OnInit {
  order = "company";

  ascending = true;
  ads;
  filter: Ad = new Ad();

  p: number = 1;
  collection: any[];
    

  constructor(private orderByPipe: OrderByPipe, private stateService: StateService, private router: Router, private adService: AdService) { }

  getAds() {
    this.adService.getAds()
    .then(ads => {
      
      return this.orderByPipe.transform(ads, this.order, this.ascending)

    })
    .then((orderedAds) => {
      this.collection = orderedAds;

    })
    .catch(() => {})
  }

  

  

  tdClick(event: Event) {
        event.stopPropagation();
    }

  removeAd(ad) {
    this.adService.removeAd(ad._id)
    .then(() => this.router.navigate(['/ads']))
    .catch(console.log)
  }


  ngOnInit() {
    this.getAds()
  }

  

    
    

}
