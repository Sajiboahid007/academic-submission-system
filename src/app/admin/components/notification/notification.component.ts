import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {

  notifications: any[] = []

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications()
  }

  getNotifications() {
    this.notificationService.getNotification().subscribe((res) => {
      this.notifications = res.data || []
      console.log(this.notifications)
    })
  }

}
