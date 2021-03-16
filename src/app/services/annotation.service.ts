import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService extends BaseHttpService {

  constructor(httpClient: HttpClient, router: Router) { super(httpClient, router); }
  
}
