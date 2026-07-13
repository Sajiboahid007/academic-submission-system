import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Users } from '../../../fds-config/entity-models/user';
import { UserInfoService } from '../../services/user-info-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertUpdateUserComponent } from './insert-update-user/insert-update-user.component';
import { AppQuery } from '../../../shared/app-query';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../shared/services/toast.service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { PlagarismService } from '../../services/plagarism-service';

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
  @ViewChild('forgotPasswordModal') forgotPasswordModal!: TemplateRef<any>;

  userEditId: number = 0;
  forgotPasswordForm!: FormGroup;
  selectedUserForPasswordReset: any = null;
  resetting = false;

  constructor(
    private readonly usersService: UserInfoService,
    private dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly confirmationService: ConfirmationService,
    private readonly toastService: ToastService,
    private readonly plagarismService: PlagarismService,
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

  isSuperAdmin(): boolean {
    return this.userTokenInfo?.role === AcademicSubmissionConfig.UserRole.SuperAdmin;
  }

  generateRandomPassword(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  onForgotPassword(user: any) {
    this.selectedUserForPasswordReset = user;
    const tempPassword = this.generateRandomPassword();
    
    this.forgotPasswordForm = new FormGroup({
      to: new FormControl(user.Email, [Validators.required, Validators.email]),
      subject: new FormControl('Reset Password - Academic Submission System', Validators.required),
      plainPassword: new FormControl(tempPassword, [Validators.required, Validators.minLength(4)]),
      message: new FormControl('', Validators.required),
    });

    this.updateMessagePassword(tempPassword);

    this.dialogRef = this.dialog.open(this.forgotPasswordModal, {
      width: '500px',
      autoFocus: true,
    });
  }

  regeneratePassword() {
    const newPass = this.generateRandomPassword();
    this.forgotPasswordForm.patchValue({ plainPassword: newPass });
    this.updateMessagePassword(newPass);
  }

  updateMessagePassword(newPass?: string) {
    const pass = newPass || this.forgotPasswordForm.get('plainPassword')?.value || '';
    const name = this.selectedUserForPasswordReset?.Name || 'User';
    const messageText = `Dear ${name},

Your password has been reset by the Super-Admin.

Your new temporary password is: ${pass}

Please log in and change your password immediately.

Best regards,
Academic Submission System`;

    this.forgotPasswordForm.patchValue({ message: messageText });
    this.cdr.markForCheck();
  }

  closeForgotPasswordModal() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  sendResetPasswordEmail() {
    if (this.forgotPasswordForm.invalid || this.resetting) {
      return;
    }

    this.resetting = true;
    this.cdr.markForCheck();

    const formValues = this.forgotPasswordForm.getRawValue();

    this.usersService.getUsersById(this.selectedUserForPasswordReset.Id).subscribe({
      next: (res) => {
        const fullUser = res.data;
        fullUser.Password = formValues.plainPassword;

        this.usersService.updateUser(fullUser).subscribe({
          next: () => {
            const mailData = {
              email: formValues.to,
              subject: formValues.subject,
              text: formValues.message,
            };

            this.plagarismService.sendEmail(mailData).subscribe({
              next: () => {
                this.toastService.success('Password reset successfully and email sent.');
                this.resetting = false;
                this.closeForgotPasswordModal();
                this.getUsers();
              },
              error: (err) => {
                console.error('Error sending reset email:', err);
                this.toastService.error('Password updated, but failed to send email.');
                this.resetting = false;
                this.closeForgotPasswordModal();
                this.cdr.markForCheck();
              }
            });
          },
          error: (err) => {
            console.error('Error updating user password:', err);
            this.toastService.error('Failed to reset user password.');
            this.resetting = false;
            this.cdr.markForCheck();
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user details for reset:', err);
        this.toastService.error('Failed to retrieve user details.');
        this.resetting = false;
        this.cdr.markForCheck();
      }
    });
  }
}
