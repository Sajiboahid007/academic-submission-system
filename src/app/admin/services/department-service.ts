import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { AppQuery } from '../../shared/app-query';
import { Observable } from 'rxjs';
import { Department } from '../../fds-config/entity-models/department';
import { get } from 'http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private readonly http: HttpClient) {}

  baseUrl = AcademicSubmissionConfig.BaseUrl;

  getDepartments(): Observable<AppQuery<Department[]>> {
    return this.http.get<AppQuery<Department[]>>(`${this.baseUrl}/api/departments/get`);
  }

  getDepartmentById(id: number): Observable<AppQuery<Department>> {
    return this.http.get<AppQuery<Department>>(`${this.baseUrl}/api/departments/get/${id}`);
  }

  addDepartment(department: Department): Observable<AppQuery<Department>> {
    return this.http.post<AppQuery<Department>>(
      `${this.baseUrl}/api/departments/create`,
      department,
    );
  }

  updateDepartment(department: Department): Observable<AppQuery<Department>> {
    return this.http.put<AppQuery<Department>>(
      `${this.baseUrl}/api/departments/update/${department.Id}`,
      department,
    );
  }

  deleteDepartment(id: number): Observable<AppQuery<void>> {
    return this.http.put<AppQuery<void>>(`${this.baseUrl}/api/departments/delete/${id}`, null);
  }
}
