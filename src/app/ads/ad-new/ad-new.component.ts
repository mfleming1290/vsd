import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Ad } from "../../classes/ad";
import { State } from "../../classes/state";
import { AdService } from "../../services/ad.service";
import { FileUploader } from 'ng2-file-upload';
import { StateService } from "../../services/state.service";


@Component({
  selector: 'app-ad-new',
  templateUrl: './ad-new.component.html',
  styleUrls: ['./ad-new.component.css']
})
export class AdNewComponent implements OnInit {
    ad: Ad = new Ad();
    state: State = new State();
    states;

        public uploader:FileUploader = new FileUploader({url:'http://localhost:8000/uploads/add'});

  

  errorMessages: string[] = [];



  constructor(private stateService: StateService, private adService: AdService, private router: Router) { }

  uploadImage(file) {
    file.upload();
  };

  getStates() {
    this.stateService.getStates()
    .then(states => {
      console.log(states)
      this.states = states
    })
    .catch(() => {})
  }

  onSubmit(ad){
    console.log('submitting', ad);
    ad.img = 'assets/img/dbImages/' + ad.imgName
    console.log('eddited ad', ad)
    this.adService.createAd(ad)
    .then(() => this.router.navigate(['ads']))
    .catch(err => {
      console.log('catching errors', err);
      this.handleErrors(err.json())
    })
  }

  private handleErrors(error: string[] | Error): void {
    this.errorMessages = Array.isArray(error) ? error : [error.message];
  }

  ngOnInit() {
    this.getStates()
  }

  onSubmitState(state){
    console.log(state)
    this.adService.createState(state)
    .then((state) => console.log(state))
    .catch(err => {
      console.log('catching errors', err);
      this.handleErrors(err.json())
    })
  }

}
