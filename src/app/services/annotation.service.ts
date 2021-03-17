import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../environments/environment';
import { Annotation } from '../models/annotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService extends BaseHttpService {

  constructor(httpClient: HttpClient, router: Router) { super(httpClient, router); }

  public getAnnorations(): Observable<any> {
    return this.get(environment.baseAPI + '/Annotation');
  }

  public getAnnoration(id: string): Observable<any> {
    return this.get(environment.baseAPI + '/Annotation/' + id);
  }

  public postAnnoration(annotation:Annotation): Observable<any> {
    return this.post(environment.baseAPI + '/Annotation', annotation);
  }

  public putAnnoration(annotation:Annotation): Observable<any> {
    return this.put(environment.baseAPI + '/Annotation/' + annotation.id, annotation);
  }

  public deleteAnnoration(id: string): Observable<any> {
    return this.delete(environment.baseAPI + '/Annotation/' + id);
  }
}
