import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Role } from '../../../../fds-config/entity-models/role';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../services/role-service';

@Component({
  selector: 'app-insert-update-roles',
  standalone: false,
  templateUrl: './insert-update-roles.component.html',
  styleUrl: './insert-update-roles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertUpdateRolesComponent implements OnInit {

  roles: Role[] = [];
  roleFrom!: FormGroup
  isEditMode = false;
  roleId!: number

  constructor(private readonly dialogRef: MatDialogRef<InsertUpdateRolesComponent>,
    private readonly roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: Role | null,
  ) { }


  ngOnInit(): void {
    this.roleFrom = new FormGroup({
      Name: new FormControl('', [Validators.required]),
    });

    if (this.data) {
      this.isEditMode = true;
      this.roleId = this.data.Id;
      this.roleFrom.patchValue(this.data);
    }

  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.isEditMode) {
      this.updateRole();
    } else {
      this.addRole();
    }
  }

  addRole() {
    this.roleService.addRole(this.roleFrom.getRawValue()).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateRole() {
    const roleData: Role = this.roleFrom.getRawValue();
    roleData.Id = this.roleId
    this.roleService.updateRole(roleData).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
