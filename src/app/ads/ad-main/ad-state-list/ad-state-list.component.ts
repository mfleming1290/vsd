import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../../services/pager.service'
import { StateService } from "../../../services/state.service";
import { Router } from "@angular/router";
import { OrderByPipe } from "../../../order-by.pipe";


@Component({
  selector: 'app-ad-state-list',
  templateUrl: './ad-state-list.component.html',
  styleUrls: ['./ad-state-list.component.css'],
    providers: [OrderByPipe]

})
export class AdStateListComponent implements OnInit {
   order = "name";

  ascending = true;
  p: number = 1;
  collection: any[];

  constructor(private orderByPipe: OrderByPipe, private router: Router, private stateService: StateService, private pagerService: PagerService) { }

  getStates() {
    this.stateService.getStates()
    .then(states => {
      console.log('getting pages from the server');
      return this.orderByPipe.transform(states, this.order, this.ascending)

    })
    .then((orderedStates) => {
      console.log('ordered states',orderedStates)
      this.collection = orderedStates;
    })
    .catch(() => {})
  }

  tdClick(event: Event) {
        event.stopPropagation();
    }

  removeState(state) {
    console.log('in component')
    this.stateService.removeState(state._id)
    .then(() => this.router.navigate(['/']))
    .catch(console.log)
  }

  ngOnInit() {
    this.getStates()
  }

  

}
