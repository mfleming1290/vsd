import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { CookieService } from "ngx-cookie";

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

import { User } from '../classes/user'


@Injectable()
export class AuthService {

  constructor(private _http: Http, private cookieService: CookieService) { }

  login(user: User): Promise<User> {
    return this._http.post('/api/auth/login', user)
      .map(res => res.json())
      .toPromise()
  }

  register(user: User): Promise<User> {
    return this._http.post('/api/auth/register', user)
      .map(res => res.json())
      .toPromise()
  }

  logout(): Promise<User> {
    return this._http.delete('/api/auth/logout')
      .map(res => res.json())
      .toPromise()
  }

  isAuthed(): boolean {
    const expired = parseInt(this.cookieService.get('expiration'), 10)
    const userId = this.cookieService.get('userID')
    const session = this.cookieService.get('session')

    return Boolean(session && expired && userId && expired > Date.now())
  }

}
