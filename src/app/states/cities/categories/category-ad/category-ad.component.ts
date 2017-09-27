import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { Ad } from "../../../../classes/ad";
import { AdService } from "../../../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
 


@Component({
  selector: 'app-category-ad',
  templateUrl: './category-ad.component.html',
  styleUrls: ['./category-ad.component.css']
})
export class CategoryAdComponent implements OnInit {
  public modalRef: BsModalRef;
  location;
  ad: Ad;
  subscription: Subscription;
  img
  latlon
  position;


  constructor(private modalService: BsModalService ,private adService : AdService, private route: ActivatedRoute, private router: Router) { }

  getAd() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.adService.getAd(param.get('id'))
      )
      .subscribe((ad) => {
        this.ad = ad
        this.position = ad.mapCoordinates
        this.img = `url(${ad.img})` 

      });
  }

public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {
    this.getAd()
    
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
  

}
