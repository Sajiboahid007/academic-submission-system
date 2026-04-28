import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = AcademicSubmissionConfig.BaseUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly fb: FormBuilder,
  ) {}

  getLoginForm(): FormGroup {
    const loginForm = this.fb.group({
      StudentId: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });

    return loginForm;
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/login`, data);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}${AcademicSubmissionConfig.RefreshTokenUrl}${refreshToken}`,
    );
  }
}
