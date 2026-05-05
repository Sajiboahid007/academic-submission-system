import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import { Observable } from 'rxjs';
import { AppQuery } from '../../shared/app-query';
import { Batches } from '../../fds-config/entity-models/batch';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private readonly http: HttpClient) {}

  baseUrl = AcademicSubmissionConfig.BaseUrl;

  getBatches(): Observable<AppQuery<Batches[]>> {
    return this.http.get<AppQuery<Batches[]>>(`${this.baseUrl}/api/batches/get`);
  }

  getBatchById(id: number): Observable<AppQuery<Batches>> {
    return this.http.get<AppQuery<Batches>>(`${this.baseUrl}/api/batches/get/${id}`);
  }

  addBatch(batch: Batches): Observable<AppQuery<Batches>> {
    return this.http.post<AppQuery<Batches>>(`${this.baseUrl}/api/batches/create`, batch);
  }

  updateBatch(batch: Batches): Observable<AppQuery<Batches>> {
    return this.http.put<AppQuery<Batches>>(
      `${this.baseUrl}/api/batches/update/${batch.Id}`,
      batch,
    );
  }

  deleteBatch(id: number): Observable<AppQuery<void>> {
    return this.http.delete<AppQuery<void>>(`${this.baseUrl}/api/batches/delete/${id}`);
  }
}
