import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AcademicSubmissionConfig } from '../../fds-config/constant/academic-submission-config';
import {
  NotificationApiDto,
  NotificationItem,
  NotificationListPayload,
  NotificationStatus,
} from '../../fds-config/entity-models/notification';
import { SAMPLE_NOTIFICATION_RESULT } from '../../fds-config/sample-data/sample-notifications';
import { AppQuery } from '../../shared/app-query';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly baseUrl = AcademicSubmissionConfig.BaseUrl;

  constructor(private readonly http: HttpClient) { }

  getNotifications(): Observable<NotificationItem[]> {
    const url = `${this.baseUrl}/api/notifications`;
    return this.http.get<AppQuery<any>>(url).pipe(
      map((res) => {
        const rows = Array.isArray(res.data) ? res.data : (res.data?.Result ?? []);
        return this.mapResultRows(rows);
      }),
      catchError(() => of(this.mapResultRows(SAMPLE_NOTIFICATION_RESULT))),
    );
  }

  /** Maps API `Result` rows to UI models (same as live response). */
  mapResultRows(rows: NotificationApiDto[]): NotificationItem[] {
    return rows.map((row, index) => this.toNotificationItem(row, index));
  }

  private toNotificationItem(dto: NotificationApiDto, index: number): NotificationItem {
    const rawDate = dto.At ?? dto.CreatedAt ?? dto.DateTime;
    const at = rawDate ? new Date(rawDate) : new Date();
    const safeAt = Number.isNaN(at.getTime()) ? new Date() : at;

    return {
      id: dto.Id != null ? String(dto.Id) : `n-${index}`,
      title: dto.Title?.trim() || 'Notification',
      message: (dto.Message ?? dto.Body ?? '').trim(),
      status: this.normalizeStatus(dto.Status),
      at: safeAt,
      fileUrl: dto.FileUrl,
    };
  }

  private normalizeStatus(raw: string | undefined): NotificationStatus {
    const s = (raw ?? '').toLowerCase().replaceAll(/\s+/g, '_').replaceAll('-', '_');
    if (s === 'approved' || s === 'approve' || s === 'editorial_approved' || s === 'editorialapproved') {
      return 'approved';
    }
    if (s === 'accepted' || s === 'accept') {
      return 'accepted';
    }
    if (s === 'rejected' || s === 'reject' || s === 'declined') {
      return 'rejected';
    }
    if (s === 'on_hold' || s === 'onhold' || s === 'hold' || s === 'pending') {
      return 'on_hold';
    }
    return 'on_hold';
  }

  getNotification(): Observable<AppQuery<any[]>> {
    return this.http.get<AppQuery<any[]>>(`${this.baseUrl}/api/notifications`);
  }
}
