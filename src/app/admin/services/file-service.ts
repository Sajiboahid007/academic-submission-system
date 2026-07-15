import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppQuery } from '../../shared/app-query';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  baseUrl = AcademicSubmissionConfig.BaseUrl;

  constructor(private readonly requestService: HttpClient) { }

  uploadFile(file: File): Observable<AppQuery<any>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.requestService.post<AppQuery<any>>(`${this.baseUrl}/api/upload`, formData);
  }

  uploadFiles2(files: File[]): Observable<AppQuery<any>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    return this.requestService.post<AppQuery<any>>(`${this.baseUrl}/api/uploadFiles`, formData);
  }
}
