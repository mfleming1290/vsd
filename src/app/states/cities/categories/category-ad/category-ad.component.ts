import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ad } from "../../../../classes/ad";
import { AdService } from "../../../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-category-ad',
  templateUrl: './category-ad.component.html',
  styleUrls: ['./category-ad.component.css']
})
export class CategoryAdComponent implements OnInit {

  ad: Ad;
  subscription: Subscription;
  img


  constructor(private adService : AdService, private route: ActivatedRoute, private router: Router) { }

  getAd() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.adService.getAd(param.get('id'))
      )
      .subscribe((ad) => {
        this.ad = ad
        // this.img = `url(../../../../../${ad.img})` 
        this.img = `url(${ad.img})` 

      });
  }




  ngOnInit() {
    this.getAd()
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
