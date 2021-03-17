import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { LocalStorageKeyEnum } from '../models/localStorageKeyEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService implements CanActivate {

    private _router: Router;
    constructor(httpClient: HttpClient, router: Router) { super(httpClient, router); this._router = router;}

    public postLogin(login:Login): Observable<any> {
        return this.post(environment.baseAPI + '/Login', login);
    }

    public isAuthenticated(): boolean {
      
        const token = this.getToken();

        if (token) {
            const current = new Date();
            const expiration = new Date(token.token.expiration);
            return current <= expiration;
        }

        return false;
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.isAuthenticated()) {
            if (state.url !== '/' && state.url !== '/login') {
                localStorage.setItem(LocalStorageKeyEnum.REDIRECT_URL, state.url);
            }
            this._router.navigate(['login']);
            return false;
        }
        return true;
    }
    
    public signIn(data: any): void {
        this.removeToken();
        localStorage.setItem(LocalStorageKeyEnum.AUTH_TOKEN, JSON.stringify(data));

        const redirectUrl = localStorage.getItem(LocalStorageKeyEnum.REDIRECT_URL);

        if (redirectUrl != null) {
            this._router.navigateByUrl(redirectUrl);
            localStorage.removeItem(LocalStorageKeyEnum.REDIRECT_URL);
        } else {
            this._router.navigate([`/`]);
        }
    }

    public signOut(): void {
        this.removeToken();
        this._router.navigate(['login']);
    }
}