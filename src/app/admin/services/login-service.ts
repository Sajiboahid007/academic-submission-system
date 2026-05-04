import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';

const passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('Password')?.value;
  const confirm = group.get('ConfirmPassword')?.value;
  if (confirm == null || confirm === '') {
    return null;
  }
  return password === confirm ? null : { passwordMismatch: true };
};

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
    return this.fb.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  getRegisterForm(): FormGroup {
    return this.fb.group(
      {
        StudentId: ['', [Validators.required]],
        Name: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator },
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/login`, data);
  }

  register(data: { StudentId: any; Name: string; Email: string; Password: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/register`, data);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}${AcademicSubmissionConfig.RefreshTokenUrl}${refreshToken}`,
    );
  }
}
