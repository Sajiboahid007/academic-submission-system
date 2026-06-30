import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Observable } from 'rxjs';
import { AppQuery } from '../../shared/app-query';
import { Papers } from '../../fds-config/entity-models/papers';
import { Journals } from '../../fds-config/entity-models/journals';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  baseUrl = AcademicSubmissionConfig.BaseUrl

  constructor(private http: HttpClient) { }


  getPapers(): Observable<AppQuery<Papers[]>> {
    return this.http.get<AppQuery<Papers[]>>(`${this.baseUrl}/api/home/papers/get`);
  }


  getJournals(): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/home/journal/get`);
  }

  getAllPapers(): Observable<AppQuery<any[]>> {
    return this.http.get<AppQuery<any[]>>(`${this.baseUrl}/api/home/get`);
  }

}
