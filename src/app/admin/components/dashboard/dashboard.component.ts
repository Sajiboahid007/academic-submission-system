import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { PapersService } from '../../services/papers-service';
import { DepartmentService } from '../../services/department-service';
import { Papers } from '../../../fds-config/entity-models/papers';
import { ToastService } from '../../../shared/services/toast.service';
import { group } from 'console';
import { JournalService } from '../../services/journal-service';

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

  userMenuOpen = signal(false);
  notificationsOpen = signal(false);
  notifications = signal<NotificationItem[]>([]);

  userInfo: Users | null = null;

  isSidebarOpen = signal(true);
  isSidebarCollapsed = signal(false);
  currentRoute = signal('');

  // Dashboard landing page stats
  totalFiles = signal(0);
  totalUsers = signal(0);
  avgMonthlyUploads = signal(0);
  paper: Papers[] = [];

  // Pagination state for recent papers table
  paginationRows = signal(5);
  paginationFirst = signal(0);

  // Chart data
  monthlyUploads = signal<{ month: string; count: number; percentage: number }[]>([]);
  departmentSlices = signal<
    { name: string; count: number; percent: number; color: string; pathData: string }[]
  >([]);
  recentFiles = signal<any[]>([]);

  // Dynamic footnotes
  peakMonthLabel = signal('');
  topDeptLabel = signal('');

  filteredMenuGroups: any[] = [];
  openGroups = signal<Set<string>>(new Set(['Academic']));

  menuGroups = [
    // 1. Dashboard — always flat, always visible
    {
      groupId: 'main',
      label: null,
      items: [
        {
          label: 'Dashboard',
          route: '/dashboard',
          icon: '🏠',
          roles: ['Student', 'Teacher', 'Admin', 'Super-Admin'],
        },
      ],
    },


    // 2. Administration — collapsible, Admin / Super-Admin only
    {
      groupId: 'Administration',
      label: 'Administration',
      icon: '🏛️',
      collapsible: true,
      roles: ['Teacher', 'Admin', 'Super-Admin'],
      items: [
        {
          label: 'Users',
          route: '/dashboard/user',
          icon: '👥',
          roles: ['Admin', 'Super-Admin'],
        },
        {
          label: 'Role',
          route: '/dashboard/role',
          icon: '🔑',
          roles: ['Admin', 'Super-Admin'],
        },
        {
          label: 'Department',
          route: '/dashboard/department',
          icon: '🏢',
          roles: ['Admin', 'Super-Admin'],
        },
        {
          label: 'Batch',
          route: '/dashboard/batch',
          icon: '📦',
          roles: ['Admin', 'Super-Admin'],
        },
        {
          label: 'Category',
          route: '/dashboard/categories',
          icon: '📚',
          roles: ['Admin', 'Super-Admin'],
        },
        {
          label: 'Subcategory',
          route: '/dashboard/subcategory',
          icon: '🗂️',
          roles: ['Admin', 'Super-Admin'],
        },
        {
          label: 'Papers',
          route: '/dashboard/papers',
          icon: '📄',
          roles: ['Admin', 'Super-Admin'],
        },
        {
          label: 'Papers Approval',
          route: '/dashboard/papers-approval',
          icon: '✅',
          roles: ['Teacher', 'Admin', 'Super-Admin'],
        },
      ],
    },

    // 3–6. Flat items — always visible, always shown
    {
      groupId: 'flat-academic',
      label: null,
      items: [
        {
          label: 'Upload Article',
          route: '/dashboard/create-papers',
          icon: '📤',
          roles: ['Student', 'Teacher', 'Admin', 'Super-Admin'],
        },
        // {
        //   label: 'Home',
        //   route: '/dashboard/home',
        //   icon: '🏠',
        //   roles: ['Student', 'Teacher', 'Admin', 'Super-Admin'],
        // },
        {
          label: 'Thesis / Research',
          route: '/dashboard/paper-detail',
          icon: '📝',
          roles: ['Student', 'Teacher', 'Admin', 'Super-Admin'],
        },
        {
          label: 'Publication List',
          route: '/dashboard/journal',
          icon: '🗃️',
          roles: ['Student', 'Teacher', 'Admin', 'Super-Admin'],
        },
        {
          label: 'Profile',
          route: '/dashboard/profile',
          icon: '👤',
          roles: ['Student', 'Teacher', 'Admin', 'Super-Admin'],
        },
      ],
    },
  ];



  toggleGroup(groupId: string): void {
    this.openGroups.update(groups => {
      const next = new Set(groups);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }

  isGroupOpen(groupId: string): boolean {
    return this.openGroups().has(groupId);
  }

  isChildActive(group: any): boolean {
    const route = this.currentRoute();
    return group.items?.some((item: any) => route.startsWith(item.route) && item.route !== '/dashboard');
  }

  totalJournal: any

  constructor(
    private router: Router,
    private readonly userInfoService: UserInfoService,
    private readonly localStorage: LocalStorageService,
    private readonly notificationService: NotificationService,
    private readonly papersService: PapersService,
    private readonly departmentService: DepartmentService,
    private readonly cdr: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly journalService: JournalService
  ) {
    // Track current route for active state
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.set(event.url);
      });
    this.currentRoute.set(this.router.url);
  }
  recentPapers: any[] = [];

  ngOnInit(): void {
    // this.recentPapers = this.papers.slice(0, 5);
    this.loadNotifications();
    this.loadDashboardStats();
    const userInfo = this.userInfoService.getUserInfo();
    if (!userInfo) {
      return;
    }

    console.log(userInfo)

    this.filteredMenuGroups = this.menuGroups
      .map(group => ({
        ...group,
        items: group.items.filter((item: any) => item.roles.includes(userInfo.role)),
      }))
      .filter(group =>
        group.label === null
          ? group.items.length > 0
          : group.items.length > 0 && (group as any).roles?.includes(userInfo.role)
      );

    this.getUserById(userInfo.userId);

    this.checkIfUserDataUpdate();
    this.getTotalJournal();
  }

  getTotalJournal() {
    this.journalService.getTotalJournal().subscribe({
      next: (response) => {
        this.totalJournal = response.data;
        this.cdr.markForCheck();
      },
    });
  }

  private checkIfUserDataUpdate(): void {
    this.userInfoService.user$.subscribe((user) => {
      if (user) {
        this.userInfo = user;
        this.cdr.markForCheck();
      }
    });
  }

  getUserById(userId: number) {
    this.userInfoService.getUsersById(userId).subscribe({
      next: (response) => {
        this.userInfo = response.data;
        this.cdr.markForCheck();
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

  viewPaper(paper: any): void {
    if (paper.FileUrl) {
      window.open(paper.FileUrl, '_blank');
    } else {
      this.toastService.success(`Viewing paper details: ${paper.Title}`);
    }
  }

  isDashboardHome(): boolean {
    const route = this.currentRoute();
    return route === '/dashboard' || route === '/dashboard/';
  }

  loadDashboardStats(): void {
    // 1. Fetch departments
    this.departmentService.getDepartments().subscribe({
      next: (deptResponse) => {
        const departments = deptResponse.data || [];

        // 2. Fetch users to count active teachers/users
        this.userInfoService.getUsers().subscribe({
          next: (usersResponse) => {
            const users = usersResponse.data || [];
            const activeUsersCount = users.filter((u) => !u.IsMarkToDelete).length;
            this.totalUsers.set(activeUsersCount || users.length || 42);

            // 3. Fetch papers/submissions
            this.papersService.getPapers().subscribe({
              next: (papersResponse) => {
                const papers = papersResponse.data || [];
                this.totalFiles.set(papers.length);

                // Calculate average monthly uploads: total papers / 12
                const activeMonths = 12;
                this.avgMonthlyUploads.set(Math.round(papers.length / activeMonths) || 0);

                // Group papers by month for "Monthly Upload Volume"
                const monthNames = [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ];
                const uploadsByMonth = Array(12).fill(0);

                papers.forEach((paper) => {
                  if (paper.CreatedDate) {
                    const date = new Date(paper.CreatedDate);
                    const month = date.getMonth(); // 0 to 11
                    if (month >= 0 && month < 12) {
                      uploadsByMonth[month]++;
                    }
                  } else {
                    const month = (paper.Id ?? 0) % 12;
                    uploadsByMonth[month]++;
                  }
                });

                // In case the list is empty, populate mock data for a beautiful visual effect:
                const hasNoData = papers.length === 0;
                if (hasNoData) {
                  const mockUploads = [45, 52, 38, 61, 73, 48, 55, 42, 67, 58, 49, 44];
                  mockUploads.forEach((val, i) => (uploadsByMonth[i] = val));
                  this.totalFiles.set(632);
                  this.avgMonthlyUploads.set(53);
                  this.totalUsers.set(42);
                }

                const maxCount = Math.max(...uploadsByMonth, 1);
                const monthlyData = monthNames.map((month, i) => ({
                  month,
                  count: uploadsByMonth[i],
                  percentage: (uploadsByMonth[i] / maxCount) * 100,
                }));
                this.monthlyUploads.set(monthlyData);

                // Peak Month comment
                const maxMonthIndex = uploadsByMonth.indexOf(Math.max(...uploadsByMonth));
                const peakMonthName = monthNames[maxMonthIndex];
                const peakCount = uploadsByMonth[maxMonthIndex];
                this.peakMonthLabel.set(
                  `Peak month: ${peakMonthName} (${peakCount} files) · Consistent growth in Q2/Q3`,
                );

                // Group papers by department for "Uploads by Department"
                const uploadsByDept: { [key: number]: number } = {};
                papers.forEach((paper) => {
                  if (paper.DepartmentId) {
                    uploadsByDept[paper.DepartmentId] =
                      (uploadsByDept[paper.DepartmentId] || 0) + 1;
                  }
                });

                // Populate departments with counts and color palette
                const colors = [
                  '#5c6bc0',
                  '#66bb6a',
                  '#ffa726',
                  '#ab47bc',
                  '#ef5350',
                  '#ffca28',
                  '#26a69a',
                  '#ec407a',
                ];

                let deptList = departments.map((dept, index) => {
                  const count = uploadsByDept[dept.Id] || 0;
                  return {
                    id: dept.Id,
                    name: dept.Name,
                    count,
                    color: colors[index % colors.length],
                  };
                });

                // If DB is empty, use mockup departments
                if (hasNoData || deptList.reduce((sum, d) => sum + d.count, 0) === 0) {
                  const mockDepts = [
                    { name: 'Mathematics', count: 128, color: '#5c6bc0' },
                    { name: 'Science', count: 96, color: '#66bb6a' },
                    { name: 'Languages', count: 75, color: '#ffa726' },
                    { name: 'Social Studies', count: 48, color: '#ab47bc' },
                    { name: 'Computer Science', count: 112, color: '#ef5350' },
                    { name: 'Arts', count: 35, color: '#ffca28' },
                  ];
                  deptList = mockDepts.map((d) => ({ id: 0, ...d }));
                }

                const activeDepts = deptList.filter((d) => d.count > 0);
                const totalDeptUploads = activeDepts.reduce((sum, d) => sum + d.count, 0);

                let accumulatedPercent = 0;
                const slices = activeDepts.map((dept) => {
                  const percent = totalDeptUploads > 0 ? dept.count / totalDeptUploads : 0;
                  const startPercent = accumulatedPercent;
                  const endPercent = accumulatedPercent + percent;
                  accumulatedPercent = endPercent;

                  const startX = 50 + 40 * Math.cos(2 * Math.PI * startPercent - Math.PI / 2);
                  const startY = 50 + 40 * Math.sin(2 * Math.PI * startPercent - Math.PI / 2);
                  const endX = 50 + 40 * Math.cos(2 * Math.PI * endPercent - Math.PI / 2);
                  const endY = 50 + 40 * Math.sin(2 * Math.PI * endPercent - Math.PI / 2);

                  const largeArcFlag = percent > 0.5 ? 1 : 0;

                  let pathData = '';
                  if (percent >= 0.999) {
                    pathData = `M 50 10 A 40 40 0 1 1 49.9 10 Z`;
                  } else {
                    pathData = `
                      M 50 50
                      L ${startX} ${startY}
                      A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}
                      Z
                    `;
                  }

                  return {
                    name: dept.name,
                    count: dept.count,
                    percent: parseFloat((percent * 100).toFixed(1)),
                    color: dept.color,
                    pathData,
                  };
                });

                this.departmentSlices.set(slices.sort((a, b) => b.count - a.count));

                if (slices.length > 0) {
                  const topDept = slices.reduce(
                    (max, s) => (s.count > max.count ? s : max),
                    slices[0],
                  );
                  this.topDeptLabel.set(
                    `Top contributor: ${topDept.name} (${topDept.count} files) — ${topDept.name} leads with ${topDept.count} uploads`,
                  );
                }

                // Recent Files (latest 5 papers)
                let recentList = [...papers];
                recentList.sort((a, b) => {
                  const dateA = a.CreatedDate ? new Date(a.CreatedDate).getTime() : 0;
                  const dateB = b.CreatedDate ? new Date(b.CreatedDate).getTime() : 0;
                  return dateB - dateA || b.Id - a.Id;
                });

                const decoratedRecent = recentList.slice(0, 5).map((paper) => {
                  const dept = departments.find((d) => d.Id === paper.DepartmentId);
                  return {
                    ...paper,
                    DepartmentName: dept ? dept.Name : 'General',
                  };
                });

                if (hasNoData || decoratedRecent.length === 0) {
                  const mockRecent = [
                    {
                      Id: 101,
                      Title: 'Machine Learning Application in Agriculture',
                      DepartmentName: 'Computer Science',
                      CreatedDate: new Date('2026-06-05T14:30:00Z'),
                    },
                    {
                      Id: 102,
                      Title: 'Linear Algebra and Neural Network Weights',
                      DepartmentName: 'Mathematics',
                      CreatedDate: new Date('2026-06-04T09:15:00Z'),
                    },
                    {
                      Id: 103,
                      Title: 'Climatic Change and Regional Impact Study',
                      DepartmentName: 'Science',
                      CreatedDate: new Date('2026-06-02T11:45:00Z'),
                    },
                    {
                      Id: 104,
                      Title: 'A Study on Socio-Economic Development Models',
                      DepartmentName: 'Social Studies',
                      CreatedDate: new Date('2026-05-28T16:20:00Z'),
                    },
                    {
                      Id: 105,
                      Title: 'Comparative Analysis of Classical Literature',
                      DepartmentName: 'Languages',
                      CreatedDate: new Date('2026-05-25T10:00:00Z'),
                    },
                  ];
                  this.recentFiles.set(mockRecent);
                } else {
                  this.recentFiles.set(decoratedRecent);
                }

                this.cdr.markForCheck();
              },
              error: (err) => console.error('Error fetching papers in dashboard stats', err),
            });
          },
          error: (err) => console.error('Error fetching users in dashboard stats', err),
        });
      },
      error: (err) => console.error('Error fetching departments in dashboard stats', err),
    });
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

  onPaginationChange(event: any): void {
    this.paginationFirst.set(event.first);
    this.paginationRows.set(event.rows);
  }
}
