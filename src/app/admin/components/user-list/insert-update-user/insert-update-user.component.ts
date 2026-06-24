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
import { Role } from '../../../../fds-config/entity-models/role';
import { RoleService } from '../../../services/role-service';
import { BatchService } from '../../../services/batch-service';
import { Batches } from '../../../../fds-config/entity-models/batch';

@Component({
  selector: 'app-insert-update-user',
  standalone: false,
  templateUrl: './insert-update-user.component.html',
  styleUrl: './insert-update-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertUpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  users: Users[] = [];
  departments: Department[] = [];
  batches: Batches[] = []
  roles: Role[] = [];
  isEditMode = false;
  userId!: number;

  // Assuming you have a similar structure for roles

  constructor(
    private readonly usersService: UserInfoService,
    private readonly dialogRef: MatDialogRef<InsertUpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users | null,
    private readonly departmentService: DepartmentService,
    private readonly toastService: ToastService,
    private readonly roleService: RoleService,
    private readonly batchService: BatchService,
  ) { }


  ngOnInit(): void {
    this.userForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      StudentId: new FormControl('', [Validators.required]),
      DepartmentId: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      RoleId: new FormControl('', [Validators.required]),
      BatchId: new FormControl(''),
    });

    if (this.data) {
      this.isEditMode = true;
      this.userId = this.data.Id;

      // clearing existing validators for password
      this.userForm.get('Password')?.clearValidators();
      this.userForm.get('Password')?.updateValueAndValidity();

      this.userForm.patchValue(this.data);
    }

    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();

    this.getDepartments();
    this.getRoles();
    this.getBatches();
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
  getBatches() {
    this.batchService.getBatches().subscribe({
      next: (response) => {
        this.batches = response.data;

        if (this.data) {
          this.userForm.patchValue({
            BatchId: this.data.BatchId,
          });
        }
      },
      error: (error) => {
        console.error('Error fetching batches:', error);
      },
    });
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data;

        if (this.data) {
          this.userForm.patchValue({
            RoleId: this.data.RoleId,
          });
        }
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
      },
    });
  }

  onCancel() {
    this.dialogRef.close();
  }


  onSave() {
    if (this.userForm.invalid) {
      console.log(this.userForm);
      return;
    }


    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.saveUser();
    }
  }

  saveUser(): void {
    const users: Users = this.userForm.getRawValue();
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
    const users: Users = this.userForm.getRawValue();
    users.Id = this.userId;
    this.usersService.updateUser(users).subscribe({
      next: (_: any) => {
        this.toastService.success('User updated successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }



}
