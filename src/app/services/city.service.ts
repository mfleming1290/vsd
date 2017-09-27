import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class CityService {

  constructor(private _http: Http) { }

  getCity(id) {
    return this._http.get(`/api/city/single/${id}`)
      .map(res => res.json())
      .toPromise()
  }

  getAllCities() {
    return this._http.get('/api/city')
    .map(res => res.json())
    .toPromise()
  }

  getCities(id) {
    return this._http.get(`/api/city/${id}`)
    .map(res => res.json())
    .toPromise()
  }

  removeCity(id: string) {
    return this._http.delete(`/api/city/${ id } `)
    .map(data => data.json())
    .toPromise()
  }

  

}
