import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../../fds-config/entity-models/user';
import { UserInfoService } from '../../../services/user-info-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Department } from '../../../../fds-config/entity-models/department';
import { DepartmentService } from '../../../services/department-service';
import { Password } from 'primeng/password';
import { ToastService } from '../../../../shared/services/toast.service';

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
  departments: Department[] = [];
  roles: any[] = [];
  isEditMode: boolean = false;
  userId!: number;

  // Assuming you have a similar structure for roles

  constructor(
    private readonly usersService: UserInfoService,
    private readonly dialogRef: MatDialogRef<InsertUpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users | null,
    private readonly departmentService: DepartmentService,
    private readonly toastService: ToastService,
  ) { }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      StudentId: new FormControl('', [Validators.required]),
      DepartmentId: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      // RoleId: new FormControl('', [Validators.required]),
    });
    if (this.data) {
      this.isEditMode = true;
      this.userId = this.data.Id;
      this.userForm.patchValue(this.data);
    }

    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();

    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.data;

        if (this.data) {
          this.userForm.patchValue({
            DepartmentId: this.data.DepartmentId,
          });
        }
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      },
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
  onSave() {
    if (this.userForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.saveUser();
    }
  }

  saveUser(): void {
    const users = this.userForm.getRawValue() as Users;
    this.usersService.addUserAdmin(users).subscribe({
      next: (res: any) => {
        this.toastService.success('User created successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error creating user:', error);
      },
    });
  }

  updateUser(): void {
    this.usersService.updateUser(this.userForm.getRawValue()).subscribe({
      next: (res: any) => {
        this.toastService.success('User updated successfully');
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }

}
