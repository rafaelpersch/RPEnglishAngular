import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseHttpService {

  constructor(httpClient: HttpClient, router: Router) { super(httpClient, router); }

  public getCategories(): Observable<any> {
    return this.get(environment.baseAPI + '/Category');
  }

  public getCategory(id: string): Observable<any> {
    return this.get(environment.baseAPI + '/Category/' + id);
  }

  public postCategory(category:Category): Observable<any> {
    return this.post(environment.baseAPI + '/Category', category);
  }

  public putCategory(category:Category): Observable<any> {
    return this.put(environment.baseAPI + '/Category/' + category.id, category);
  }

  public deleteCategory(id: string): Observable<any> {
    return this.delete(environment.baseAPI + '/Category/' + id);
  }
}