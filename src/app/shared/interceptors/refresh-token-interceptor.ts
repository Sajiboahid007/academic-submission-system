import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, map, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../../admin/services/local-storage.service';
import { LoginService } from '../../admin/services/login-service';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';

export const refreshTokenInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request?.url.startsWith(AcademicSubmissionConfig.BaseUrl)) {
    return next(request);
  }

  // if it is refresh token url then we don't need to call again
  if (request.url.includes(AcademicSubmissionConfig.RefreshTokenUrl)) {
    return next(request);
  }

  const loginService = inject(LoginService);
  const localStorageService = inject(LocalStorageService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // handling 401 error
      return getRefreshToken(loginService, localStorageService).pipe(
        switchMap((newToken: string) => {
          request = addTokenToRequest(request, newToken);
          return next(request);
        }),
      );
    }),
  );
};

let tokenRequestInProgress: any = null;

function getRefreshToken(
  loginService: LoginService,
  localStorageService: LocalStorageService,
): Observable<string> {
  if (tokenRequestInProgress) {
    return tokenRequestInProgress;
  }

  const refreshToken: any = localStorageService.getItem(AcademicSubmissionConfig.RefreshTokenKey);

  if (!refreshToken) {
    return throwError(() => new Error('No refresh token'));
  }

  tokenRequestInProgress = loginService.refreshToken(refreshToken).pipe(
    map((response) => {
      if (!response?.token || !response?.refreshToken) {
        throw new Error('No access token found');
      }

      // saving to local storage
      localStorageService.setItem(AcademicSubmissionConfig.JwtTokenKey, response.token);
      localStorageService.setItem(AcademicSubmissionConfig.RefreshTokenKey, response.refreshToken);

      return response.token;
    }),
    catchError((err) => {
      console.error('Failed to fetch refresh token', err);
      return throwError(() => err);
    }),
    finalize(() => {
      tokenRequestInProgress = null;
    }),
    shareReplay(1),
  );

  return tokenRequestInProgress;
}

function addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
