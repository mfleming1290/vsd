import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ad } from "../../classes/ad";
import { AdService } from "../../services/ad.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  ad: Ad;
  subscription: Subscription;


  constructor(private adService : AdService, private route: ActivatedRoute, private router: Router) { }

  getAd() {
    this.subscription = this.route.paramMap
      .switchMap(param => 
       this.adService.getAd(param.get('id'))
      )
      .subscribe(ad => this.ad = ad);
  }




  ngOnInit() {
    this.getAd()
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
