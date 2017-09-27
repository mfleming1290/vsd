import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
    yourLocation = this.location.path()


  constructor(public location: Location) { }

  ngOnInit() {
  }

}
