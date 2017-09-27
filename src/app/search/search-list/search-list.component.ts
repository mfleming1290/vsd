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
  p: number = 1;
    collection: any[];  

  subscription: Subscription;


  constructor(private pagerService: PagerService ,private adService : AdService, private route: ActivatedRoute, private router: Router) { }


  getAds() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.adService.getSearchAds(param.get('id'), param.get('loc'))
       
      )
      .subscribe((ad) => {
        this.collection = ad;
        
      })
      
  }



  ngOnInit() {
    this.getAds()
    
  }


  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
