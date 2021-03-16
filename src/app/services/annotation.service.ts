import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService extends BaseHttpService {

  constructor(httpClient: HttpClient, router: Router) { super(httpClient, router); }

  public getAnnorations(): Observable<any> {
    return this.get(environment.baseAPI + '/Annotation');
  }
}
