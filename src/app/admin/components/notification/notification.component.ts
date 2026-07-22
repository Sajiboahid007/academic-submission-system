import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../services/user-info-service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { PapersService } from '../../services/papers-service';
import { JournalService } from '../../services/journal-service';
import { forkJoin, of, catchError } from 'rxjs';

@Component({
  selector: 'notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {

  notifications: any[] = [];
  filteredNotifications: any[] = [];
  seenIds: string[] = [];
  activeFilter: 'all' | 'unread' | 'read' = 'all';
  searchQuery: string = '';
  first: number = 0;
  rows: number = 10;
  paginatedNotifications: any[] = [];

  constructor(
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly userInfoService: UserInfoService,
    private readonly papersService: PapersService,
    private readonly journalService: JournalService
  ) { }

  ngOnInit(): void {
    this.loadSeenIds();
    this.getNotifications();
  }

  loadSeenIds() {
    const savedSeen = localStorage.getItem('seen_notification_ids');
    if (savedSeen) {
      try {
        this.seenIds = JSON.parse(savedSeen);
      } catch (e) {
        console.error('Error parsing seen_notification_ids', e);
      }
    }
  }

  getNotifications() {
    const userInfo = this.userInfoService.getUserInfo();
    const userRole = userInfo?.role;
    const isSuperAdmin =
      userRole === AcademicSubmissionConfig.UserRole.SuperAdmin ||
      userRole === 'Super-Admin';

    this.notificationService.getNotification().subscribe((res) => {
      const apiNotifications = res.data || [];

      if (isSuperAdmin) {
        forkJoin({
          papers: this.papersService.getPapers().pipe(catchError(() => of({ data: [] }))),
          journals: this.journalService.getJournals().pipe(catchError(() => of({ data: [] }))),
        }).subscribe(({ papers, journals }) => {
          const generatedNotifs: any[] = [];
          const papersList = papers?.data || [];
          const journalsList = journals?.data || [];

          papersList.forEach((p: any) => {
            const status = p.PaperApprovals?.[0]?.Status;
            const statusLower = (status || '').toLowerCase();
            if (statusLower === 'pending' || statusLower === 'pending approval' || statusLower.includes('editorial approved')) {
              const displayStatus = statusLower.includes('editorial approved') ? 'Editorial Approved' : 'Pending';
              generatedNotifs.push({
                Id: `paper-status-${p.Id}`,
                Title: statusLower.includes('editorial approved') ? 'Paper Editorial Approved' : 'Pending Paper Approval',
                Message: `Paper "${p.Title}" is ${displayStatus.toLowerCase()}${p.CreatedBy ? ' by ' + p.CreatedBy : ''}.`,
                Status: displayStatus,
                CreatedAt: p.CreatedDate || new Date().toISOString(),
                PaperId: p.Id,
              });
            }
          });

          journalsList.forEach((j: any) => {
            const status = j.PaperApprovals?.[0]?.Status;
            const statusLower = (status || '').toLowerCase();
            if (statusLower === 'pending' || statusLower === 'pending approval' || statusLower.includes('editorial approved')) {
              const displayStatus = statusLower.includes('editorial approved') ? 'Editorial Approved' : 'Pending';
              generatedNotifs.push({
                Id: `journal-status-${j.Id}`,
                Title: statusLower.includes('editorial approved') ? 'Journal Editorial Approved' : 'Pending Journal Approval',
                Message: `Journal "${j.Title}" is ${displayStatus.toLowerCase()}${j.Authors ? ' by ' + j.Authors : ''}.`,
                Status: displayStatus,
                CreatedAt: j.CreatedDate || new Date().toISOString(),
                JournalId: j.Id,
              });
            }
          });

          const existingIds = new Set(apiNotifications.map((n: any) => String(n.Id || n.id)));
          const uniqueGenerated = generatedNotifs.filter((n) => !existingIds.has(String(n.Id)));

          this.notifications = [...uniqueGenerated, ...apiNotifications];
          this.filterNotifications();
          this.cdr.markForCheck();
        });
      } else {
        this.notifications = apiNotifications;
        this.filterNotifications();
        this.cdr.markForCheck();
      }
    });
  }

  filterNotifications() {
    let list = [...this.notifications];

    // Filter by read/unread type
    if (this.activeFilter === 'unread') {
      list = list.filter(n => !this.isRead(n));
    } else if (this.activeFilter === 'read') {
      list = list.filter(n => this.isRead(n));
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      list = list.filter(n => 
        (n.Title && n.Title.toLowerCase().includes(query)) ||
        (n.Message && n.Message.toLowerCase().includes(query)) ||
        (n.Status && n.Status.toLowerCase().includes(query))
      );
    }

    this.filteredNotifications = list;
    this.updatePaginatedNotifications();
    this.cdr.markForCheck();
  }

  updatePaginatedNotifications() {
    this.paginatedNotifications = this.filteredNotifications.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedNotifications();
    this.cdr.markForCheck();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setFilter(filter: 'all' | 'unread' | 'read') {
    this.activeFilter = filter;
    this.first = 0;
    this.filterNotifications();
  }

  onSearchInput() {
    this.first = 0;
    this.filterNotifications();
  }

  isRead(notification: any): boolean {
    const id = String(notification.Id || notification.id);
    return this.seenIds.includes(id) || notification.Status === 'read';
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !this.isRead(n)).length;
  }

  getReadCount(): number {
    return this.notifications.filter(n => this.isRead(n)).length;
  }

  getStatusClass(notification: any): string {
    const status = (notification.Status || '').toLowerCase();
    if (status.includes('editorial approved') || status.includes('editorial_approved')) return 'approved';
    if (status.includes('approve')) return 'approved';
    if (status.includes('reject')) return 'rejected';
    if (status.includes('pending') || status === 'unread' || status === 'read') return 'pending';
    if (status.includes('draft')) return 'draft';
    if (status.includes('review')) return 'review';
    return 'default';
  }

  getDisplayStatus(notification: any): string {
    const status = notification.Status || 'Notification';
    if (status.toLowerCase() === 'unread' || status.toLowerCase() === 'read') {
      return 'Pending';
    }
    return status;
  }

  getNotificationIcon(notification: any): string {
    const status = (notification.Status || '').toLowerCase();
    if (status.includes('approve')) return 'pi pi-check-circle';
    if (status.includes('reject')) return 'pi pi-times-circle';
    if (status.includes('review')) return 'pi pi-search';
    if (status.includes('draft')) return 'pi pi-file-edit';
    return 'pi pi-bell';
  }

  getFormattedMessage(message: string): string {
    if (!message) return '';
    
    let formatted = message;

    // 1. Highlight Remarks: "Remarks: [Message]"
    formatted = formatted.replace(/Remarks:\s*(.*)$/i, (match, remarks) => {
      return `Remarks: <strong class="msg-highlight-remarks">${remarks}</strong>`;
    });

    // 2. Highlight double quoted or single quoted strings (titles or statuses)
    formatted = formatted.replace(/(["'])(.*?)\1/g, (match, quote, content) => {
      const lower = content.toLowerCase();
      if (lower === 'draft' || lower === 'pending' || lower === 'approved' || lower === 'rejected' || lower === 'pending approval' || lower === 'editorial approved') {
        return `<strong class="msg-highlight-status">${quote}${content}${quote}</strong>`;
      }
      return `<strong class="msg-highlight-title">${quote}${content}${quote}</strong>`;
    });

    // 3. Highlight submitter names: "submitted by [Name]"
    formatted = formatted.replace(/submitted by ([\w\s-]+?)(?=\s+and|\.|$)/gi, (match, name) => {
      return `submitted by <strong class="msg-highlight-user">${name}</strong>`;
    });

    // 4. Highlight unquoted status patterns: "is pending approval", "is approved", "updated to pending", etc.
    formatted = formatted.replace(/\b(is|to|status|state)\s+(pending approval|approved|rejected|submitted|draft|pending|editorial approved)\b/gi, (match, prefix, status) => {
      return `${prefix} <strong class="msg-highlight-status">${status}</strong>`;
    });

    return formatted;
  }

  public getSeverity(
    status: string | undefined,
  ): 'info' | 'success' | 'warn' | 'danger' | 'secondary' {
    if (!status) return 'secondary';
    switch (status.trim().toLowerCase()) {
      case 'approved':
      case 'editorial approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'pending':
      case 'review requested':
        return 'warn';
      case 'draft':
        return 'info';
      default:
        return 'secondary';
    }
  }

  markAsRead(notification: any) {
    const id = String(notification.Id || notification.id);
    if (!this.seenIds.includes(id)) {
      this.seenIds.push(id);
      localStorage.setItem('seen_notification_ids', JSON.stringify(this.seenIds));
      this.filterNotifications();
    }
  }

  markAllAsRead() {
    const ids = this.notifications.map(n => String(n.Id || n.id));
    this.seenIds = Array.from(new Set([...this.seenIds, ...ids]));
    localStorage.setItem('seen_notification_ids', JSON.stringify(this.seenIds));
    this.filterNotifications();
  }

  onNotificationClick(notification: any) {
    this.markAsRead(notification);

    const paperId = notification.paperId || notification.PaperId;
    const journalId = notification.journalId || notification.JournalId;
    const userRole = this.userInfoService.getUserInfo()?.role;

    const isAdminOrSuperAdminOrReviewer =
      userRole === AcademicSubmissionConfig.UserRole.Admin ||
      userRole === AcademicSubmissionConfig.UserRole.SuperAdmin ||
      userRole === 'Super-Admin' ||
      userRole === AcademicSubmissionConfig.UserRole.Reviewer;

    const status = (notification.Status || '').toLowerCase();
    const isDraft = status.includes('draft');

    const targetRoute = (isAdminOrSuperAdminOrReviewer && !isDraft)
      ? '/dashboard/papers-approval'
      : '/dashboard/create-papers';

    if (journalId) {
      this.router.navigate([targetRoute], {
        queryParams: { tab: 'journal', journalId: journalId }
      });
    } else if (paperId) {
      this.router.navigate([targetRoute], {
        queryParams: { tab: 'paper', paperId: paperId }
      });
    }
  }
}

