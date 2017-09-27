import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ad } from "../../../../classes/ad";
import { AdService } from "../../../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { PagerService } from '../../../../services/pager.service'
@Component({
  selector: 'app-ad-results',
  templateUrl: './ad-results.component.html',
  styleUrls: ['./ad-results.component.css']
})
export class AdResultsComponent implements OnInit {

  ads: Ad[];
  subscription: Subscription;
  p: number = 1;
  collection: any[];  

  // array of all items to be paged
    private allItems: any[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];


  constructor(private pagerService: PagerService ,private adService : AdService, private route: ActivatedRoute, private router: Router) { }

  getAds() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.adService.getSearchAds(param.get('id'), param.get('loc'))
      )
      .subscribe((ads) => {
        this.collection = ads;
      })
      
  }




  ngOnInit() {
    this.getAds()
    // this.getPages()
  }


  removeAd(ad) {
    this.adService.removeAd(ad._id)
    .then(() => this.router.navigate(['/']))
    .catch(console.log)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
