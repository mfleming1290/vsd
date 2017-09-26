import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class CategoryService {

  constructor(private _http: Http) { }

  getCategories() {
    console.log('in get ads service')
    return this._http.get('/api/category')
    .map(res => res.json())
    .toPromise()
  }

  getCategoryAds(cat) {
    console.log(' get cad ads in service ', cat)
    return this._http.get(`/api/category/${cat}`)
      .map(res => res.json())

  }

  getAdsFromCat(id){
    console.log('in service!!')
    return this._http.get(`/api/category/category/${id}`)
      .map(res => res.json())
  }

  removeCategory(id: string) {
    console.log('in service')
    return this._http.delete(`/api/category/${ id } `)
    .map(data => data.json())
    .toPromise()
  }

  

  getCategory(id) {
    console.log(' in service ')
    return this._http.get(`/api/category/${id}`)
      .map(res => res.json())
      .toPromise()
  }

}
