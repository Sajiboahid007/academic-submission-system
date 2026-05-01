import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { AppQuery } from '../../shared/app-query';
import { SubCategory } from '../../fds-config/entity-models/subcategory';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private readonly http: HttpClient, private readonly fb: FormBuilder) { }
  baseUrl = AcademicSubmissionConfig.BaseUrl;

  public getSubcategories(): Observable<AppQuery<SubCategory[]>> {
    return this.http.get<AppQuery<SubCategory[]>>(`${this.baseUrl}/api/subcategories/get`);
  }

  public getSubcategoryById(id: number): Observable<AppQuery<SubCategory>> {
    return this.http.get<AppQuery<SubCategory>>(`${this.baseUrl}/api/subcategories/get/${id}`);
  }

  public addSubcategory(subCategory: SubCategory): Observable<AppQuery<SubCategory>> {
    return this.http.post<AppQuery<SubCategory>>(
      `${this.baseUrl}/api/subcategories/create`,
      subCategory,
    );
  }

  public updateSubcategory(subCategory: SubCategory): Observable<AppQuery<SubCategory>> {
    return this.http.put<AppQuery<SubCategory>>(
      `${this.baseUrl}/api/subcategories/update/${subCategory.Id}`,
      subCategory,
    );
  }

  public deleteSubcategory(id: number): Observable<AppQuery<boolean>> {
    return this.http.delete<AppQuery<boolean>>(`${this.baseUrl}/api/subcategories/delete/${id}`);
  }

  public createSubCategoryForm() {
    return this.fb.group({
      CategoryId: [null, Validators.required],
      Name: ['', Validators.required],
      Code: ['', Validators.required],
      Status: [true]
    });
  }
}
