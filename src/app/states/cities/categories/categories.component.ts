import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ad } from "../../../classes/ad";
import { AdService } from "../../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { StateService } from "../../../services/state.service";
import { PagerService } from '../../../services/pager.service'


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
  currentCity

  // array of all items to be paged
    private allItems: any[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];

  @Output() updatedBook = new EventEmitter<Ad>();

  constructor(private pagerService: PagerService ,private stateService: StateService,private adService : AdService, private route: ActivatedRoute, private router: Router) { }

  

  getAds() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.adService.getAdsFromCat(param.get('cat'))
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


  // onUpdate(book: Book) {
  //   // this.updatedBook.emit(book)
  //   this.bookService.updateBook(book)
  //   // .then(upBook => this.updatedBook.emit(upBook))
  //   .then(() => this.router.navigate(['/books']))
  //   .catch(console.log)
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
