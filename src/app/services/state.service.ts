import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class StateService {

  constructor(private _http: Http) { }

  getStates() {
    return this._http.get('/api/states')
    .map(res => res.json())
    .toPromise()
  }

  

  getState(id) {
    return this._http.get(`/api/states/${id}`)
      .map(res => res.json())
      .toPromise()
  }

  getStateAds(id) {
    return this._http.get(`/api/ad/states/${id}`)
      .map(res => res.json())
      
  }



  createState(state){
    return this._http.post('/api/states', state)
    .map(res => res.json())
    .toPromise()
  }

  removeState(id: string) {
    console.log('in service')
    return this._http.delete(`/api/states/${ id } `)
    .map(data => data.json())
    .toPromise()
  }  

  

}
