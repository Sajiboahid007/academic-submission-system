import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info-service';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: Record<string, unknown> | null = null;

  constructor(private readonly userInfoService: UserInfoService) { }

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

  profile = {
    name: 'Sajib Oahid',
    department: 'Computer Science & Engineering',
    about: 'Passionate developer and researcher working with Angular, Node.js, Prisma, and Machine Learning projects.'
  };

  papers = [
    {
      Title: 'AI Based ASD Prediction',
      Abstract: 'Machine learning based autism spectrum disorder prediction system.'
    },
    {
      Title: 'Smart Research Archive',
      Abstract: 'Web platform for storing and managing academic papers.'
    }
  ];




}
