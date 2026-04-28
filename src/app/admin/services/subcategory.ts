import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { AppQuery } from '../../shared/app-query';

@Injectable({
  providedIn: 'root',
})
export class Subcategory {
  constructor(private readonly http: HttpClient) {}
  baseUrl = AcademicSubmissionConfig.BaseUrl;

  public getSubcategories(): Observable<AppQuery<Subcategory[]>> {
    return this.http.get<AppQuery<Subcategory[]>>(`${this.baseUrl}/api/subcategories/get`);
  }
}
