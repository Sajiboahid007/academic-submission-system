import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info-service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: Record<string, unknown> | null = null;

  constructor(private readonly userInfoService: UserInfoService) {}

  ngOnInit(): void {
    this.user = this.userInfoService.getUserInfo() as Record<string, unknown> | null;
  }

  displayValue(key: string): string {
    const v = this.user?.[key];
    if (v == null || v === '') {
      return '—';
    }
    return String(v);
  }
}
