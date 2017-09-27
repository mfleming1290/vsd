import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdService } from "../../../services/ad.service";
import { Search } from "../../../classes/search";



@Component({
  selector: 'app-ad-search',
  templateUrl: './ad-search.component.html',
  styleUrls: ['./ad-search.component.css']
})
export class AdSearchComponent implements OnInit {
    search: Search = new Search();


  constructor(private router: Router,) { }

  onSubmit(form) {
    this.router.navigate(['/ads/search/results', form.name, form.location])
    // window.location.reload()
  }

  ngOnInit() {
  }

}
