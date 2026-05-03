import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserInfoService } from '../../services/user-info-service';

@Component({
  selector: 'dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  userRole: string = '';

  ngOnInit(): void {
    const userInfo = this.userInfoService.getUserInfo();
    if (!userInfo) {
      return;
    }

    console.log('userInfo', userInfo);
    this.userName = userInfo?.name || '';
    this.userRole = userInfo?.role || '';
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
  ];

  constructor(
    private router: Router,
    private readonly userInfoService: UserInfoService,
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
}
