import { Injectable } from '@angular/core';
import { DecodeService } from './decode-service';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Observable } from 'rxjs';
import { AppQuery } from '../../shared/app-query';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../fds-config/entity-models/user';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  baseUrl = AcademicSubmissionConfig.BaseUrl;
  constructor(
    private readonly decodeService: DecodeService,
    private readonly http: HttpClient,
  ) {}

  getUserInfo(): any {
    return this.decodeService.getDecodedToken();
  }

  getUsers(): Observable<AppQuery<Users[]>> {
    return this.http.get<AppQuery<Users[]>>(`${this.baseUrl}/api/users/get`);
  }

  addUser(user: Users): Observable<AppQuery<Users>> {
    return this.http.post<AppQuery<Users>>(`${this.baseUrl}/api/users/create`, user);
  }
}
