import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { PagerService } from '../../../../services/pager.service'
import { CategoryService } from "../../../../services/category.service";
import { SearchPipe } from "../../../../search.pipe";
import { Category } from "../../../../classes/category"
import { OrderByPipe } from "../../../../order-by.pipe";



@Component({
  selector: 'app-city-categories',
  templateUrl: './city-categories.component.html',
  styleUrls: ['./city-categories.component.css']
})
export class CityCategoriesComponent implements OnInit {
  subscriptionCategories: Subscription;
  categories ;
  productID;
  order = "name";
  ascending = true;
  filterCategory: Category = new Category();
  cityId;

  

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {
      

   }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
     this.subscriptionCategories = this.route.parent.params.subscribe(
  (param: any) => {
    this.cityId = param['id'];
    this.categoryService.getCategoryAds(this.cityId)
      
      .subscribe(categories => {
        this.categories = categories
      });
  });
  }

  



  ngOnDestroy() {
    this.subscriptionCategories.unsubscribe();
  }


}
