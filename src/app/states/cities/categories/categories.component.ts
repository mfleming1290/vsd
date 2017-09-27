import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ad } from "../../../classes/ad";
import { AdService } from "../../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { StateService } from "../../../services/state.service";
import { PagerService } from '../../../services/pager.service'
import { CategoryService } from "../../../services/category.service";



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  currentCategory;
  ad: Ad;
  ads; 
  subscription: Subscription;
  currentState
  currentCity;
  p: number = 1;
  collection: any[];

  @Output() updatedBook = new EventEmitter<Ad>();

  constructor(private categoryService: CategoryService, private pagerService: PagerService ,private stateService: StateService,private adService : AdService, private route: ActivatedRoute, private router: Router) { }



  getAds() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.categoryService.getAdsFromCat(param.get('cat'))
      )
      .subscribe((ad) => {
        this.currentCategory = ad[0].category
        this.ads = ad
        this.collection = ad;

      });
  }



  ngOnInit() {
    this.getAds()
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
