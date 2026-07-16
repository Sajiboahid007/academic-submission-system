import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../services/user-info-service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';

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
    private readonly userInfoService: UserInfoService
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
    this.notificationService.getNotification().subscribe((res) => {
      this.notifications = res.data || [];
      this.filterNotifications();
      this.cdr.markForCheck();
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
      userRole === AcademicSubmissionConfig.UserRole.Reviewer;

    const targetRoute = isAdminOrSuperAdminOrReviewer
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
