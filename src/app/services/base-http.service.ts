import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  private getAuthHeader(): any {
    const token = this.getToken();

    if (token) {
      return { headers : new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token.token.token})};
    }

    return { headers : new HttpHeaders({ 'Content-Type': 'application/json'})};
  }

  public get(url: string): Observable<any> {
    return this.httpClient.get<any>(url, this.getAuthHeader())
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  public post(url: string, data: any): Observable<any> {
    return this.httpClient.post<any>(url, JSON.stringify(data), this.getAuthHeader())
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  public put(url: string, data: any): Observable<any> {
    return this.httpClient.put<any>(url, JSON.stringify(data), this.getAuthHeader())
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  public delete(url: string): Observable<any> {
    return this.httpClient.delete<any>(url, this.getAuthHeader())
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    if (error.status === 401 || error.status === 403) {
      return this.router.navigate(['login']);
    }
    /*let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);*/
    return throwError(error);
  }  

  private getToken(): any {
    const content = localStorage.getItem('LocalStorageRPEnglishAngular');

    if (content){
      return JSON.parse(content);
    }

    return null;
  }

  public getCurrentUser(): any {
    const token = this.getToken();
    
    if (token) {
      return token.user;
    }
    
    return null;
  }
}