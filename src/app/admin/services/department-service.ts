import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { AppQuery } from '../../shared/app-query';
import { Observable } from 'rxjs';
import { Department } from '../../fds-config/entity-models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private readonly http: HttpClient) {}

  baseUrl = AcademicSubmissionConfig.BaseUrl;

  getDepartments(): Observable<AppQuery<Department[]>> {
    return this.http.get<AppQuery<Department[]>>(`${this.baseUrl}/api/departments/get`);
  }
}
