import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Injectable()
export class AdService {

  observedAds = new BehaviorSubject(null);


  constructor(private _http: Http) { }

  getAds() {
    return this._http.get('/api/ad')
    .map(res => res.json())
    .toPromise()
  }

  createAd(ad) {
    return this._http.post('/api/ad', ad)
    .map(res => res.json())
    .toPromise()
  }

  getAd(id) {
    return this._http.get(`/api/ad/${id}`)
      .map(res => res.json())
      .toPromise()
  }

  getStateAds(id) {
    return this._http.get(`/api/ad/states/${id}`)
      .map(res => res.json())
      
  }

  updateAd(ad) {
    return this._http.put(`/api/ad/${ ad._id } `, ad)
    .map(data => data.json())
    .toPromise()
  }

  removeAd(id: string) {
    return this._http.delete(`/api/ad/${ id } `)
    .map(data => data.json())
    .toPromise()
  }

  

  createState(state){
    return this._http.post('/api/states', state)
    .map(res => res.json())
    .toPromise()
  }

  getSearchAds(id: string, loc) {
    return this._http.get(`/api/ad/search/${ id }/${ loc } `, )
    .map(data => data.json())
    // .toPromise()
  }

  updateSearchAds(ads) {
    this.observedAds.next(ads);
  }

  getBanners() {
    console.log('in service')
    return this._http.get('/uploads/banner' )
    .map(data => data.json())
    .toPromise()

  }

  removeBanner(id: string) {
    return this._http.delete(`/uploads/banner/${ id } `)
    .map(data => data.json())
    .toPromise()
  }

  

}
