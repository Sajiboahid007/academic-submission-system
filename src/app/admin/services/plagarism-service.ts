import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlagarismService {

  baseUrl = AcademicSubmissionConfig.BaseUrl

  constructor(private readonly http: HttpClient) { }

  reviewPaper(fileUrl: string) {
    return this.http.post(`${this.baseUrl}/api/review`, { fileUri: fileUrl });
  }

  sendEmail(data: any) {
    return this.http.post(`${this.baseUrl}/api/send-email`, data);
  }
}
