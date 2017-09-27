import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Ad } from "../../../classes/ad";
import { State } from "../../../classes/state";
import { AdService } from "../../../services/ad.service";
import { FileUploader } from 'ng2-file-upload';
import { StateService } from "../../../services/state.service";


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

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;


  constructor(private stateService: StateService, private adService: AdService, private router: Router) { }


  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }




  uploadImage(file) {
    file.upload();
  };

  getStates() {
    this.stateService.getStates()
    .then(states => {
      this.states = states
    })
    .catch(() => {})
  }

  onSubmit(ad){
    if  (ad.imgName != undefined) {
      ad.img = 'assets/img/dbImages/' + ad.imgName
    }
    if (ad.videoName != undefined) {
          ad.video = 'assets/img/dbImages/' + ad.videoName

    }
    this.adService.createAd(ad)
    .then(() => this.router.navigate(['/ads']))
    .catch(err => {
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
    this.adService.createState(state)
    .then((state) => console.log(state))
    .catch(err => {
      this.handleErrors(err.json())
    })
  }

}
