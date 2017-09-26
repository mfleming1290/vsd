import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class MailService {

  constructor(private _http: Http) { }

  

  sendMail(message) {
        console.log(message)
       return this._http.post('/api/sendMail', message)
      .map(res => res.json())
      .toPromise()
  }

  


}
