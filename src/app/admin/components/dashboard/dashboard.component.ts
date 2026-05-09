import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import {
  NotificationItem,
  NotificationStatus,
} from '../../../fds-config/entity-models/notification';
import { Users } from '../../../fds-config/entity-models/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { NotificationService } from '../../services/notification.service';
import { UserInfoService } from '../../services/user-info-service';

@Component({
  selector: 'dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  @ViewChild('userMenuWrap', { read: ElementRef }) userMenuWrap?: ElementRef<HTMLElement>;
  @ViewChild('notificationWrap', { read: ElementRef }) notificationWrap?: ElementRef<HTMLElement>;

  userName: string = '';
  userRole: string = '';
  users: Users[] = [];
  userMenuOpen = signal(false);
  notificationsOpen = signal(false);
  notifications = signal<NotificationItem[]>([]);

  ngOnInit(): void {
    this.getUsers();
    this.loadNotifications();
    const userInfo = this.userInfoService.getUserInfo();
    if (!userInfo) {
      return;
    }

    console.log('userInfo', userInfo);
    this.userName = userInfo?.Name || '';
    this.userRole = userInfo?.Role || '';
  }

  isSidebarOpen = signal(true);
  isSidebarCollapsed = signal(false);
  currentRoute = signal('');

  menuItems = [
    {
      label: 'Category',
      route: '/dashboard/categories',
      icon: '📚',
      description: 'Manage Categories',
    },
    {
      label: 'Subcategory',
      route: '/dashboard/subcategory',
      icon: '◽',
      description: 'Manage Sub Categories',
    },
    {
      label: 'User',
      route: '/dashboard/user',
      icon: '👤',
      description: 'Manage Users',
    },
    {
      label: 'Department',
      route: '/dashboard/department',
      icon: '🏢',
      description: 'Manage Departments',
    },
    {
      label: 'Batch',
      route: '/dashboard/batch',
      icon: '📦',
      description: 'Manage Batches',
    },
  ];

  constructor(
    private router: Router,
    private readonly userInfoService: UserInfoService,
    private readonly localStorage: LocalStorageService,
    private readonly notificationService: NotificationService,
  ) {
    // Track current route for active state
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.set(event.url);
      });
    this.currentRoute.set(this.router.url);

    // const userInfo = this.userInfoService.getUserInfo();
    // console.log(userInfo);
  }

  getUsers() {
    this.userInfoService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (list) => this.notifications.set(list),
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((value) => !value);
  }

  toggleSidebarCollapse(): void {
    this.isSidebarCollapsed.update((value) => !value);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      this.isSidebarOpen.set(false);
    }
  }

  isActiveRoute(route: string): boolean {
    const routeValue = this.currentRoute();
    return routeValue === route || routeValue.startsWith(route + '/');
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.notificationsOpen.set(false);
    this.userMenuOpen.update((open) => !open);
  }

  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.userMenuOpen.set(false);
    this.notificationsOpen.update((open) => !open);
  }

  statusLabel(status: NotificationStatus): string {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'on_hold':
        return 'On hold';
      default:
        return status;
    }
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  goProfile(): void {
    this.closeUserMenu();
    void this.router.navigate(['/dashboard/profile']);
  }

  goChangePassword(): void {
    this.closeUserMenu();
    void this.router.navigate(['/dashboard/change-password']);
  }

  logout(): void {
    this.closeUserMenu();
    this.localStorage.removeItem(AcademicSubmissionConfig.JwtTokenKey);
    this.localStorage.removeItem(AcademicSubmissionConfig.RefreshTokenKey);
    void this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (this.userMenuOpen() && !this.userMenuWrap?.nativeElement.contains(target)) {
      this.userMenuOpen.set(false);
    }
    if (this.notificationsOpen() && !this.notificationWrap?.nativeElement.contains(target)) {
      this.notificationsOpen.set(false);
    }
  }
}
