import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-ad-banner-new',
  templateUrl: './ad-banner-new.component.html',
  styleUrls: ['./ad-banner-new.component.css']
})
export class AdBannerNewComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url:'http://localhost:8000/uploads/banner'});
    public hasBaseDropZoneOver:boolean = false;

  public hasAnotherDropZoneOver:boolean = false;

 

  constructor() { }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
uploadImage(file) {
    file.upload();
  };

  ngOnInit() {
  }

}
