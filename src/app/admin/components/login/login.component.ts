import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginInProgress = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.loginForm = this.loginService.getLoginForm();
  }

  public onLogin1() {
    this.localStorageService.setItem(AcademicSubmissionConfig.JwtTokenKey, '1234567890');
    this.localStorageService.setItem(AcademicSubmissionConfig.RefreshTokenKey, '1234567890');
    this.router.navigate(['dashboard']);
  }

  public onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    this.loginInProgress = true;
    this.cdr.detectChanges();

    const data = this.loginForm.getRawValue();
    this.loginService
      .login(data)
      .pipe(
        finalize(() => {
          this.loginInProgress = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (res) => {
          this.localStorageService.setItem(AcademicSubmissionConfig.JwtTokenKey, res?.token);
          this.localStorageService.setItem(
            AcademicSubmissionConfig.RefreshTokenKey,
            res?.refreshToken,
          );
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
