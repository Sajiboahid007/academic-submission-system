import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Category } from '../../fds-config/entity-models/categories';
import { AppQuery } from '../../shared/app-query';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly http: HttpClient) {}

  baseUrl = AcademicSubmissionConfig.BaseUrl;

  getCategories(): Observable<AppQuery<Category[]>> {
    return this.http.get<AppQuery<Category[]>>(`${this.baseUrl}/api/categories/get`);
  }

  getCategoryById(id: number): Observable<AppQuery<Category>> {
    return this.http.get<AppQuery<Category>>(`${this.baseUrl}/api/categories/get/${id}`);
  }

  addCategory(category: Category): Observable<AppQuery<Category>> {
    return this.http.post<AppQuery<Category>>(`${this.baseUrl}/api/categories/create`, category);
  }

  upodate(category: Category): Observable<AppQuery<Category>> {
    return this.http.put<AppQuery<Category>>(
      `${this.baseUrl}/api/categories/update/${category.Id}`,
      category,
    );
  }
}
