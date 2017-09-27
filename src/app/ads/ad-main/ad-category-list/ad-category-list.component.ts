import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../../services/pager.service'
import { CategoryService } from "../../../services/category.service";
import { Router } from "@angular/router";
import { OrderByPipe } from "../../../order-by.pipe";


@Component({
  selector: 'app-ad-category-list',
  templateUrl: './ad-category-list.component.html',
  styleUrls: ['./ad-category-list.component.css'],
   providers: [OrderByPipe]
})
export class AdCategoryListComponent implements OnInit {
  order = "name";
  ascending = true;
  p: number = 1;
  collection: any[];  

  

  constructor(private orderByPipe: OrderByPipe, private router: Router, private categoryService: CategoryService, private pagerService: PagerService) { }



  getCategories() {

    this.categoryService.getCategories()
    .then(categories => {
      return this.orderByPipe.transform(categories, this.order, this.ascending)
            
    })
    .then((orderedCategories) => {
      this.collection = orderedCategories;
                
    })
    .catch((err) => {console.log(err)})
  }

  

   

  tdClick(event: Event) {
        event.stopPropagation();
    }

  removeCategory(state) {
    this.categoryService.removeCategory(state._id)
    .then(() => this.router.navigate(['/ads']))
    .catch(console.log)
  }

  ngOnInit() {
    this.getCategories()
  }

  

}
