import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DecodeService {
  constructor(private readonly localStorage: LocalStorageService) {}

  private base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) base64 += '===='.slice(0, 4 - pad);
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
  }

  getDecodedToken(): any | null {
    const token = this.localStorage.getItem<string>(AcademicSubmissionConfig.JwtTokenKey);
    if (!token || typeof token !== 'string') return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = this.base64UrlDecode(parts[1]);
      return JSON.parse(payload) as any;
    } catch {
      return null;
    }
  }
}
