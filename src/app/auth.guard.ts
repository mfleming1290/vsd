import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core'

import { AuthService } from "./services/auth.service";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {

    }

    canActivate(): boolean {
        const authed = this.auth.isAuthed();

        if (!authed) {
            this.router.navigate(['home'])
        }

        return authed
    }

}