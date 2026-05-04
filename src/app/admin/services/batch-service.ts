import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Observable } from 'rxjs';
import { AppQuery } from '../../shared/app-query';
import { Batches } from '../../fds-config/entity-models/batch';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private readonly http: HttpClient) {}

  baseUrl = AcademicSubmissionConfig.BaseUrl;

  getBatches(): Observable<AppQuery<Batches[]>> {
    return this.http.get<AppQuery<Batches[]>>(`${this.baseUrl}/api/batches/get`);
  }
}
