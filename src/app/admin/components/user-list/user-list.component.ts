import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Users } from '../../../fds-config/entity-models/user';
import { UserInfoService } from '../../services/user-info-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertUpdateUserComponent } from './insert-update-user/insert-update-user.component';
import { AppQuery } from '../../../shared/app-query';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../shared/services/toast.service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  users: Users[] = [];
  userTokenInfo: any = {};
  private dialogRef!: MatDialogRef<any>;
  @ViewChild('userModal') userModal!: TemplateRef<any>;

  userEditId: number = 0;

  constructor(
    private readonly usersService: UserInfoService,
    private dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly confirmationService: ConfirmationService,
    private readonly toastService: ToastService
  ) { }

  public ngOnInit(): void {
    this.userTokenInfo = this.usersService.getUserInfo();
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(InsertUpdateUserComponent, {
      width: '600px',
      height: '520px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  onEditUser(id: number): void {
    this.usersService.getUsersById(id).subscribe({
      next: (res: AppQuery<Users>) => {
        const users = res?.data;

        const dialogRef = this.dialog.open(InsertUpdateUserComponent, {
          width: '500px',
          autoFocus: true,
          data: users,
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.debug(result);

          if (result) {
            this.getUsers();
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching category:', error);
      },
    });
  }

  onDeleteUser(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(id).subscribe({
          next: () => {
            this.toastService.success('User deleted successfully!');
            this.getUsers();
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            this.toastService.error('Failed to delete user!');
          },
        });
      },
    });
  }


  onApprove() {
    const role = AcademicSubmissionConfig.UserRole;
    const userRole = this.userTokenInfo?.role;

    // Only allow if the user has the SuperAdmin or Admin role
    if (userRole === role.SuperAdmin || userRole === role.Admin) {
      return true;
    }

    return false;
  }
}
