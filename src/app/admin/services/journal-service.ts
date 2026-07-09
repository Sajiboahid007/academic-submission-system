import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppQuery } from '../../shared/app-query';
import { Observable } from 'rxjs';
import { Journals } from '../../fds-config/entity-models/journals';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Users } from '../../fds-config/entity-models/user';

@Injectable({
  providedIn: 'root',
})
export class JournalService {

  baseUrl = AcademicSubmissionConfig.BaseUrl;
  constructor(private readonly http: HttpClient, private readonly fb: FormBuilder,) { }

  getJournals(): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/journal/get`);
  }
  getNonApprovedJournals(): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/journal/non_approved/get`);
  }
  getKeyword(): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/keyword/get`);
  }

  getAuthorsName(): Observable<AppQuery<Users[]>> {
    return this.http.get<AppQuery<Users[]>>(`${this.baseUrl}/api/author/get`);
  }
  getJournalByUserId(id: number): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/journal/getByUserId/${id}`);
  }

  getByUserIdforProfile(id: number): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/journal/getByUserIdforProfile/${id}`);
  }


  getJournalUploadId(id: number): Observable<AppQuery<Journals[]>> {
    return this.http.get<AppQuery<Journals[]>>(`${this.baseUrl}/api/journal/getJournalByUserId/${id}`);
  }

  getById(id: number): Observable<AppQuery<Journals>> {
    return this.http.get<AppQuery<Journals>>(`${this.baseUrl}/api/journal/getById/${id}`);
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

  deleteJournal(journalId: number): Observable<AppQuery<void>> {
    return this.http.put<AppQuery<void>>(`${this.baseUrl}/api/journal/delete/${journalId}`, null);
  }






  createForm(journals?: any): FormGroup {
    return this.fb.group({
      Title: [journals?.Title ?? '', Validators.required],
      Abstract: [journals?.Abstract ?? '', Validators.required],
      CategoryId: [journals?.CategoryId ?? '', Validators.required],
      SubcategoryId: [journals?.SubcategoryId ?? ''],
      UserId: [journals?.UserId ?? null],
      Name: [journals?.Name ?? '', Validators.required],
      Authors: [journals?.Authors ?? ''],
      Affiliation: [journals?.Affiliation ?? ''],
      Keywords: [journals?.Keywords ?? ''],
      AuthorDeclaration: [journals?.AuthorDeclaration ?? ''],
      Volume: [journals?.Volume ?? '', Validators.required],
      IssueNumber: [journals?.IssueNumber ?? '', Validators.required],
      DOI: [journals?.DOI ?? ''],
      Year: [journals?.Year ?? '', Validators.required],
      FileUrl: [journals?.FileUrl ?? ''],

      authorsIds: [journals?.TeacherIds ?? []],
      File: [journals?.File ?? null],

    });
  }
}
