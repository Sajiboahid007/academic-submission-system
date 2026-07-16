import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {

  notifications: any[] = []

  constructor(
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getNotifications()
  }

  getNotifications() {
    this.notificationService.getNotification().subscribe((res) => {
      this.notifications = res.data || []
      console.log(this.notifications)
    })
  }

  onNotificationClick(notification: any) {
    const paperId = notification.paperId || notification.PaperId;
    const journalId = notification.journalId || notification.JournalId;

    if (journalId) {
      this.router.navigate(['/dashboard/papers-approval'], {
        queryParams: { tab: 'journal', journalId: journalId }
      });
    } else if (paperId) {
      this.router.navigate(['/dashboard/papers-approval'], {
        queryParams: { tab: 'paper', paperId: paperId }
      });
    }
  }
}
