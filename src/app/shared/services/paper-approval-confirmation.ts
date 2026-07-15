import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { HttpClient } from '@angular/common/http';
import { AppQuery } from '../app-query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaperApprovalConfirmation {
  constructor(private readonly http: HttpClient) { }
  baseUrl = AcademicSubmissionConfig.BaseUrl;

  updateApprovalStatus(data: {
    PaperId: number;
    Status: string;
    Remarks: string;
    RemarksFile?: string | null;
  }): Observable<AppQuery<any>> {
    const url = `${this.baseUrl}/api/paper-approval/update`;
    return this.http.post<AppQuery<any>>(url, data);
  }

  updateJournalApprovalStatus(data: {
    JournalId: number;
    Status: string;
    Remarks: string;
    RemarksFile?: string | null;
  }): Observable<AppQuery<any>> {
    const url = `${this.baseUrl}/api/journal-approval/update`;
    return this.http.post<AppQuery<any>>(url, data);
  }
}
