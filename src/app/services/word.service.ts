import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../environments/environment';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class WordService extends BaseHttpService {

  constructor(httpClient: HttpClient, router: Router) { super(httpClient, router); }

  public getWords(): Observable<any> {
    return this.get(environment.baseAPI + '/Word');
  }

  public getWordsByCategory(categoryid: string): Observable<any> {
    return this.get(environment.baseAPI + '/Word/GetByCategory/'+categoryid);
  }

  public getWord(id: string): Observable<any> {
    return this.get(environment.baseAPI + '/Word/' + id);
  }

  public postWord(word:Word): Observable<any> {
    return this.post(environment.baseAPI + '/Word', word);
  }

  public putWord(word:Word): Observable<any> {
    return this.put(environment.baseAPI + '/Word/' + word.id, word);
  }

  public deleteWord(id: string): Observable<any> {
    return this.delete(environment.baseAPI + '/Word/' + id);
  }
}
