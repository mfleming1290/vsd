import { Component, OnInit } from '@angular/core';
import { AdService } from "../../../services/ad.service";
import { Router } from "@angular/router";
import { Ad } from "../../../classes/ad";
import { OrderByPipe } from "../../../order-by.pipe";

@Component({
  selector: 'app-ad-banner-list',
  templateUrl: './ad-banner-list.component.html',
  styleUrls: ['./ad-banner-list.component.css']
})
export class AdBannerListComponent implements OnInit {
  order = "company";
  ascending = true;
  ads;
  filter: Ad = new Ad();
  p: number = 1;
  collection: any[];

  constructor( private router: Router, private adService: AdService) { }

  getAds() {
    this.adService.getBanners()
    
    .then((orderedAds) => {
      this.collection = orderedAds;

    })
    .catch(() => {})
  }
tdClick(event: Event) {
        event.stopPropagation();
    }

  removeBanner(banner) {
    this.adService.removeBanner(banner._id)
    .then(() => this.router.navigate(['/ads']))
    .catch(console.log)
  }


  ngOnInit() {
    this.getAds()
  }

}



