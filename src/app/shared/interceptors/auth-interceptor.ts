import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { LocalStorageService } from '../../admin/services/local-storage.service';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const requestedUrl = request?.url;

  if (!requestedUrl.startsWith(AcademicSubmissionConfig.BaseUrl)) {
    return next(request);
  }

  if (
    AcademicSubmissionConfig.AnonymousUrls.includes(
      requestedUrl.replace(AcademicSubmissionConfig.BaseUrl, ''),
    )
  ) {
    return next(request);
  }

  const localStorageService = inject(LocalStorageService);
  const jwtToken: any = localStorageService.getItem(AcademicSubmissionConfig.JwtTokenKey);

  if (!jwtToken) {
    const router = inject(Router);
    router.navigate(['/login']);
    return EMPTY; // cancels HTTP request
  }

  const cloned = request.clone({
    setHeaders: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return next(cloned);
};
