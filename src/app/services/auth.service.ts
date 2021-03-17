import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

    constructor(httpClient: HttpClient, router: Router) { super(httpClient, router); }

    public postCategory(login:Login): Observable<any> {
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
        /*if (!this.isAuthenticated()) {
            if (state.url !== '/' && state.url !== '/login') {
                localStorage.setItem(LocalStorageKeyEnum.REDIRECT_URL, state.url);
            }
            this.router.navigate(['./login']);
            return false;
        }*/
        return true;
    }
    
    public signIn(data: any): void {
        this.removeToken();
        localStorage.setItem('LocalStorageRPEnglishAngular', JSON.stringify(data));

        //const redirectUrl = localStorage.getItem(LocalStorageKeyEnum.REDIRECT_URL);

        //if (redirectUrl != null) {
        //    this.router.navigateByUrl(redirectUrl);
        //    localStorage.removeItem(LocalStorageKeyEnum.REDIRECT_URL);
        //} else {
        //    this.router.navigate([`/`]);
        //}
    }
}