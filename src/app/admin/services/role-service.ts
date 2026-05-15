import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Role } from '../../fds-config/entity-models/role';
import { AppQuery } from '../../shared/app-query';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  baseUrl = AcademicSubmissionConfig.BaseUrl;

  constructor(
    private readonly http: HttpClient,
  ) { }

  getRoles(): Observable<AppQuery<Role[]>> {
    return this.http.get<AppQuery<Role[]>>(`${this.baseUrl}/api/roles/get`);
  }

  addRole(role: Role): Observable<AppQuery<Role>> {
    return this.http.post<AppQuery<Role>>(`${this.baseUrl}/api/roles/create`, role);
  }

  getRoleById(id: number): Observable<AppQuery<Role>> {
    return this.http.get<AppQuery<Role>>(`${this.baseUrl}/api/roles/get/${id}`);
  }

  updateRole(role: Role): Observable<AppQuery<Role>> {
    return this.http.put<AppQuery<Role>>(`${this.baseUrl}/api/roles/update`, role);
  }

  deleteRole(id: number): Observable<AppQuery<void>> {
    return this.http.delete<AppQuery<void>>(`${this.baseUrl}/api/roles/delete/${id}`);
  }

}
