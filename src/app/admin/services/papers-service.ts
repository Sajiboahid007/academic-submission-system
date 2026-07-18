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

  constructor(
    private readonly http: HttpClient,
    private readonly fb: FormBuilder,
  ) { }

  getPapers(): Observable<AppQuery<Papers[]>> {
    return this.http.get<AppQuery<Papers[]>>(`${this.baseUrl}/api/paper/get`);

  }

  getTotalPapers(): Observable<AppQuery<number>> {
    return this.http.get<AppQuery<number>>(`${this.baseUrl}/api/papers/getTotal`);
  }

  getNonApprovalPapers(): Observable<AppQuery<Papers[]>> {
    return this.http.get<AppQuery<Papers[]>>(`${this.baseUrl}/api/paper/non_approval/get`);
  }

  getPaperApprovalByUserId(): Observable<AppQuery<Papers[]>> {
    return this.http.get<AppQuery<Papers[]>>(`${this.baseUrl}/api/paper/getPaperApprovalByUserId`);

  }

  createPaper(paper: Papers): Observable<AppQuery<Papers>> {
    return this.http.post<AppQuery<Papers>>(`${this.baseUrl}/api/paper/create`, paper);
  }

  getPaperById(id: number): Observable<AppQuery<Papers>> {
    return this.http.get<AppQuery<Papers>>(`${this.baseUrl}/api/paper/getById/${id}`);
  }

  getPaperUploadsById(id: number): Observable<AppQuery<Papers[]>> {
    return this.http.get<AppQuery<Papers[]>>(`${this.baseUrl}/api/paper/getPapersById/${id}`);
  }

  updatePaper(paper: Papers): Observable<AppQuery<Papers>> {
    return this.http.put<AppQuery<Papers>>(`${this.baseUrl}/api/paper/update/${paper.Id}`, paper);
  }

  deletePaper(id: number): Observable<AppQuery<Papers>> {
    return this.http.put<AppQuery<Papers>>(`${this.baseUrl}/api/paper/delete/${id}`, {});
  }

  getPapersByUserId(userId: number): Observable<AppQuery<Papers[]>> {
    return this.http.get<AppQuery<Papers[]>>(
      `${this.baseUrl}/api/paper/getPapersByUserId/${userId}`,
    );
  }


  getPapersByUserIdforProfile(userId: number): Observable<AppQuery<Papers[]>> {
    return this.http.get<AppQuery<Papers[]>>(
      `${this.baseUrl}/api/paper/getPapersByUserIdforProfile/${userId}`,
    );
  }

  createPaperForm(papers?: any): FormGroup {
    return this.fb.group({
      Id: [papers?.Id ?? 0],
      Title: [papers?.Title ?? '', Validators.required],
      Abstract: [papers?.Abstract ?? '', Validators.required],
      Authors: [papers?.Authors ?? ''],
      UserId: [papers?.UserId ?? null],
      CategoryId: [papers?.CategoryId ?? null, Validators.required],
      SubcategoryId: [papers?.SubcategoryId ?? null, Validators.required],
      DepartmentId: [papers?.DepartmentId ?? null, Validators.required],
      BatchId: [papers?.BatchId ?? null, Validators.required],
      Year: [papers?.Year ?? new Date().getFullYear().toString(), Validators.required],
      FileUrl: [papers?.FileUrl ?? ''],

      TeacherIds: [papers?.TeacherIds ?? []],
      StudentIds: [papers?.StudentIds ?? []],
      File: [papers?.File ?? null],
    });
  }
}
