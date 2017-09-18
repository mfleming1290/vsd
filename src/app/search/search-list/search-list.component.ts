import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ad } from "../../classes/ad";
import { AdService } from "../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { PagerService } from '../../services/pager.service'


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  ads: Ad[];
  subscription: Subscription;

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
       this.adService.getSearchAds(param.get('id'))
      )
      .subscribe((ad) => {
        console.log(ad)
        this.ads = ad
        this.allItems = ad;
 
                // initialize to page 1
                this.setPage(1);
      });
  }


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
 
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


  ngOnInit() {
    this.getAds()
    // this.getPages()
  }


  onUpdate(ad: Ad) {
    console.log(ad)
    this.adService.updateAd(ad)
    .then(() => this.router.navigate(['/ads']))
    .catch(console.log)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
