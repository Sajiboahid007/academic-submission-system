import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Observable } from 'rxjs';
import { AppQuery } from '../../shared/app-query';
import { Papers } from '../../fds-config/entity-models/papers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PapersService {

  baseUrl = AcademicSubmissionConfig.BaseUrl;

  constructor(private readonly http: HttpClient, private readonly fb: FormBuilder) { }

  getPapers(): Observable<AppQuery<Papers[]>> {
    return this.http.get<AppQuery<Papers[]>>(`${this.baseUrl}/api/paper/get`);
  }

  addPaper(paper: Papers): Observable<AppQuery<Papers>> {
    return this.http.post<AppQuery<Papers>>(`${this.baseUrl}/api/papers/create`, paper);
  }

  getPaperById(id: number): Observable<AppQuery<Papers>> {
    return this.http.get<AppQuery<Papers>>(`${this.baseUrl}/api/papers/get/${id}`);
  }

  updatePaper(paper: Papers): Observable<AppQuery<Papers>> {
    return this.http.put<AppQuery<Papers>>(`${this.baseUrl}/api/papers/update/${paper.Id}`, paper);
  }

  deletePaper(id: number): Observable<AppQuery<Papers>> {
    return this.http.put<AppQuery<Papers>>(`${this.baseUrl}/api/papers/delete/${id}`, {});
  }


  papersFrom(papers?: Papers): FormGroup {
    return this.fb.group({
      Id: [papers?.Id ?? 0],
      Title: [papers?.Title ?? '', Validators.required],
      Abstract: [papers?.Abstract ?? ''],
      UserId: [papers?.UserId ?? null, Validators.required],
      CategoryId: [papers?.CategoryId ?? null, Validators.required],
      SubcategoryId: [papers?.SubcategoryId ?? null],
      DepartmentId: [papers?.DepartmentId ?? null, Validators.required],
      BatchId: [papers?.BatchId ?? null],
      Year: [papers?.Year ?? new Date(), Validators.required],
      FileUrl: [papers?.FileUrl ?? ''],
      CreatedDate: [papers?.CreatedDate ?? new Date()],

    });

  }

}
