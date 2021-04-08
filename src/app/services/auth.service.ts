import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private _httpClient: HttpClient
    constructor(httpClient: HttpClient, router: Router) { 
        super(httpClient, router); 
        
        this._router = router;
        this._httpClient = httpClient;
    }

    public postLogin(login:Login): Observable<any> {
        return this._httpClient.post<any>(environment.baseAPI + '/Login', JSON.stringify(login), { headers : new HttpHeaders({ 'Content-Type': 'application/json'})});
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
            window.location.href = redirectUrl;
            localStorage.removeItem(LocalStorageKeyEnum.REDIRECT_URL);
        } else {
            window.location.href = '/annotations';
        }
    }

    public signOut(): void {
        this.removeToken();
        window.location.href = '/login';
    }
}