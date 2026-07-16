import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginService } from '../../services/login-service';
import { ToastService } from '../../../shared/services/toast.service';

export type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authMode: AuthMode = 'login';
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loginInProgress = false;
  registerInProgress = false;
  loginError: string | null = null;
  registerError: string | null = null;
  /** Shown on the Sign in tab after a successful registration */
  loginBannerSuccess: string | null = null;

  roles = [
    { Id: 1, Name: 'Student' },
    { Id: 2, Name: 'Authors' },
  ];

  constructor(
    private readonly loginService: LoginService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.loginService.getLoginForm();
    this.registerForm = this.loginService.getRegisterForm();
  }

  setMode(mode: AuthMode): void {
    this.authMode = mode;
    this.loginError = null;
    this.registerError = null;
    if (mode === 'register') {
      this.loginBannerSuccess = null;
    }
    this.cdr.detectChanges();
  }

  onCancel(): void {
    if (this.authMode === 'login') {
      this.loginForm.reset();
      this.loginError = null;
      this.loginBannerSuccess = null;
    } else {
      this.registerForm.reset();
      this.registerError = null;
    }
    this.cdr.detectChanges();
  }

  onGuestMode() {
    this.router.navigate(['/home']);
  }

  onForgotPassword(event: Event): void {
    event.preventDefault();
    this.toastService.info('Please contact the academic administrator to reset your password.', 'Forgot Password');
  }

  onLogin(): void {
    this.loginError = null;
    this.loginBannerSuccess = null;
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
        error: (err) => {
          this.loginError = 'Wrong Email or password. Please try again.';
          // this.loginError =
          //   err?.error?.message ?? err?.message ??
          console.error('Sign in failed. Check your Email and password.');
        },
      });
  }

  onRegister(): void {
    this.registerError = null;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    this.registerInProgress = true;
    this.cdr.detectChanges();

    const raw = this.registerForm.getRawValue();
    const payload = {
      StudentId: raw.StudentId,
      Name: raw.Name,
      Email: raw.Email,
      Password: raw.Password,
      Role: raw.Role,
    };

    this.loginService
      .register(payload)
      .pipe(
        finalize(() => {
          this.registerInProgress = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.loginForm.patchValue({ Email: raw.Email });
          this.registerForm.reset();
          this.authMode = 'login';
          this.loginBannerSuccess = 'Account created. You can sign in now.';
          this.registerError = null;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.registerError = 'Registration failed. Try a different Email.';

          console.error('Sign in failed. Check your Email and password.');
        },
      });
  }
}
