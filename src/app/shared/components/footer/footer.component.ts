import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() isFromHomePage: boolean = false;

  navigations: NavItem[] = [
    { label: 'Home Portal', route: '/dashboard/home', icon: 'pi pi-home' },
    { label: 'Browse Journals', route: '/dashboard/journal', icon: 'pi pi-book' },
    { label: 'Academic Papers', route: '/dashboard/papers', icon: 'pi pi-file' },
    { label: 'Submit Paper', route: '/dashboard/create-papers', icon: 'pi pi-plus-circle' }
  ];

  constructor(private readonly router: Router) {}

  onNavClick(event: Event, item: NavItem): void {
    if (this.isFromHomePage || this.isHomePageRoute()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

  isHomePageRoute(): boolean {
    const currentUrl = this.router.url ? this.router.url.split('?')[0] : '';
    return currentUrl === '/home' || currentUrl === '/dashboard/home';
  }
}


