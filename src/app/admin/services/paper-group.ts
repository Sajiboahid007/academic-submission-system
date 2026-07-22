import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Observable } from 'rxjs';
import { AppQuery } from '../../shared/app-query';

@Injectable({
  providedIn: 'root',
})
export class PaperGroup {

  baseUrl = AcademicSubmissionConfig.BaseUrl;
  constructor(private readonly http: HttpClient) { }


  getGroupPapersWithPaperId(paperId: number): Observable<AppQuery<any>> {
    return this.http.get<AppQuery<any>>(`${this.baseUrl}/api/paper-group/members/paper/${paperId}`)
  }
  getGroupPapersWithJournalId(journalId: number): Observable<AppQuery<any>> {
    return this.http.get<AppQuery<any>>(`${this.baseUrl}/api/paper-group/members/journal/${journalId}`)
  }

}
