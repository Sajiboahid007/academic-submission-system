// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
// import { Observable } from 'rxjs';
// import { AppQuery } from '../../shared/app-query';

// @Injectable({
//   providedIn: 'root',
// })
// export class Users {
//   constructor(private readonly http: HttpClient) {}

//   baseUrl = AcademicSubmissionConfig.BaseUrl;

//   getUsers(): Observable<AppQuery<Users[]>> {
//     return this.http.get<AppQuery<Users[]>>(`${this.baseUrl}/api/users/get`);
//   }

//   addUser(user: Users): Observable<AppQuery<Users>> {
//     return this.http.post<AppQuery<Users>>(`${this.baseUrl}/api/users/create`, user);
//   }
// }
