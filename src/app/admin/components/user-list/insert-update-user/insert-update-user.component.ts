import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Users } from '../../../../fds-config/entity-models/user';
import { UserInfoService } from '../../../services/user-info-service';

@Component({
  selector: 'app-insert-update-user',
  standalone: false,
  templateUrl: './insert-update-user.component.html',
  styleUrl: './insert-update-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertUpdateUserComponent implements OnInit {
  userForm: FormGroup = null as any;
  users: Users[] = [];

  constructor(private readonly usersService: UserInfoService) {}
  ngOnInit(): void {
    this.userForm = new FormGroup({});
  }
  onCancel() {}
  onSave() {}
}
