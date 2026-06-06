import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppQuery } from '../../shared/app-query';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { PaperApprovals } from '../../fds-config/entity-models/approval';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  baseUrl = AcademicSubmissionConfig.BaseUrl;

  constructor(private readonly http: HttpClient) {}

  getApprovalList(): Observable<AppQuery<PaperApprovals[]>> {
    return this.http.get<AppQuery<PaperApprovals[]>>(`${this.baseUrl}/api/paper-approval/get`);
  }
}
