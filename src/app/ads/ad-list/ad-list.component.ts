import { Component, OnInit } from '@angular/core';
import { AdService } from "../../services/ad.service";
import { PagerService } from '../../services/pager.service'
import { Router } from "@angular/router";
import { Ad } from "../../classes/ad";


@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

  ads;
  filter: Ad = new Ad();

  // array of all items to be paged
    private allItems: any[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];

  constructor(private router: Router, private adService: AdService, private pagerService: PagerService) { }

  getAds() {
    this.adService.getAds()
    .then(ads => {
      this.ads = ads
      console.log(ads)
    })
    .catch(() => {})
  }

  tdClick(event: Event) {
        event.stopPropagation();
    }

  removeAd(ad) {
    console.log('in component')
    this.adService.removeAd(ad._id)
    .then(() => this.router.navigate(['/']))
    .catch(console.log)
  }


  ngOnInit() {
    this.getAds()
    this.getPages()
  }

  getPages() {
        this.adService.getAds()
        .then(data => {
            console.log('getting pages from the server');
            this.allItems = data;
 
                // initialize to page 1
                this.setPage(1);
        })
        .catch(console.log)
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

}
