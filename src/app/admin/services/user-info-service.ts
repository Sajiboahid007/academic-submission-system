import { Injectable } from '@angular/core';
import { DecodeService } from './decode-service';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppQuery } from '../../shared/app-query';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../fds-config/entity-models/user';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  baseUrl = AcademicSubmissionConfig.BaseUrl;

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private readonly decodeService: DecodeService,
    private readonly http: HttpClient,
  ) {}

  setUserInfo(userInfo: any): void {
    this.userSubject.next(userInfo);
  }

  getUserInfo(): any {
    return this.decodeService.getDecodedToken();
  }

  getUsers(): Observable<AppQuery<Users[]>> {
    return this.http.get<AppQuery<Users[]>>(`${this.baseUrl}/api/users/get`);
  }

  addUser(user: Users): Observable<AppQuery<Users>> {
    return this.http.post<AppQuery<Users>>(`${this.baseUrl}/api/users/create`, user);
  }

  addUserAdmin(user: Users): Observable<AppQuery<Users>> {
    return this.http.post<AppQuery<Users>>(`${this.baseUrl}/api/user/create/admin`, user);
  }

  getUsersById(id: number): Observable<AppQuery<Users>> {
    return this.http.get<AppQuery<Users>>(`${this.baseUrl}/api/users/get/${id}`);
  }

  updateUser(user: Users): Observable<AppQuery<Users>> {
    return this.http.put<AppQuery<Users>>(`${this.baseUrl}/api/users/update/${user.Id}`, user);
  }

  updateImage(id: number, imageInfo: { ImageUrl: string }): Observable<AppQuery<Users>> {
    return this.http.put<AppQuery<Users>>(
      `${this.baseUrl}/api/users/update/image/${id}`,
      imageInfo,
    );
  }

  changePassword(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/users/change-password`, data);
  }

  deleteUser(id: number): Observable<AppQuery<Users>> {
    return this.http.put<AppQuery<Users>>(`${this.baseUrl}/api/users/delete/${id}`, null);
  }

  sendEmailVerification(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/users/send-verification`, {});
  }

  confirmEmailVerification(otp: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/users/confirm-verification`, { otp });
  }
}
