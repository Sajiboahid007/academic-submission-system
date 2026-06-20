import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppQuery } from '../../shared/app-query';
import { Observable } from 'rxjs';
import { Journals } from '../../fds-config/entity-models/journals';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';

@Injectable({
  providedIn: 'root',
})
export class JournalService {

  baseUrl = AcademicSubmissionConfig.BaseUrl;
  constructor(private readonly http: HttpClient, private readonly fb: FormBuilder,) { }

  getJournals(): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/journal/get`);
  }
  getJournalByUserId(userId: number): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/journal/getByUserId/${userId}`);
  }
  getTotalJournal(): Observable<AppQuery<number>> {
    return this.http.get<AppQuery<number>>(`${this.baseUrl}/api/journal/getTotal`);
  }

  createJournal(journals: Journals): Observable<AppQuery<Journals>> {
    return this.http.post<AppQuery<Journals>>(`${this.baseUrl}/api/journal/create`, journals);
  }

  updateJournal(journal: Journals): Observable<AppQuery<Journals>> {
    return this.http.put<AppQuery<Journals>>(`${this.baseUrl}/api/journal/update/${journal.Id}`, journal);
  }

  deleteJournal(journal: Journals): Observable<AppQuery<Journals>> {
    return this.http.delete<AppQuery<Journals>>(`${this.baseUrl}/api/journal/delete/${journal.Id}`);
  }






  createForm(journals?: any): FormGroup {
    return this.fb.group({
      Id: [journals?.Id ?? 0],
      Title: [journals?.Title ?? '', Validators.required],
      Abstract: [journals?.Abstract ?? '', Validators.required],
      CategoryId: [journals?.CategoryId ?? '', Validators.required],
      SubcategoryId: [journals?.SubcategoryId ?? ''],
      UserId: [journals?.UserId ?? null],
      Name: [journals?.Name ?? '', Validators.required],
      Authors: [journals?.Authors ?? '', Validators.required],
      Affiliation: [journals?.Affiliation ?? '', Validators.required],
      Keywords: [journals?.Keywords ?? '', Validators.required],
      AuthorDeclaration: [journals?.AuthorDeclaration ?? '', Validators.required],
      Volume: [journals?.Volume ?? ''],
      IssueNumber: [journals?.IssueNumber ?? ''],
      DOI: [journals?.DOI ?? ''],
      Year: [journals?.Year ?? '', Validators.required],
      FileUrl: [journals?.FileUrl ?? ''],

      authorsIds: [journals?.TeacherIds ?? []],
      File: [journals?.File ?? null],

    });
  }
}
