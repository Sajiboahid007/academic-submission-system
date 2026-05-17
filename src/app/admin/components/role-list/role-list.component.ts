import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../fds-config/entity-models/role';
import { RoleService } from '../../services/role-service';
import { InsertUpdateRolesComponent } from './insert-update-roles/insert-update-roles.component';
import { ConfirmationService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast.service';
import { AppQuery } from '../../../shared/app-query';

@Component({
  selector: 'app-role-list',
  standalone: false,
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent implements OnInit {

  roles: Role[] = [];

  constructor(
    private readonly roleService: RoleService,
    private cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly confirmationService: ConfirmationService,
    private readonly toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data;
        this.cdr.markForCheck();
      },
    });
  }

  AddRole(): void {
    const dialogRef = this.dialog.open(InsertUpdateRolesComponent, {
      width: '500px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastService.success('Role added successfully!');
        this.getRoles();
      }
    });
  }

  onEditRole(id: number): void {
    this.roleService.getRoleById(id).subscribe({
      next: (res: AppQuery<Role>) => {
        const roleToUpdate = res?.data;

        const dialogRef = this.dialog.open(InsertUpdateRolesComponent, {
          width: '500px',
          autoFocus: true,
          data: roleToUpdate,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.toastService.success('Role updated successfully!');
            this.getRoles();
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching role:', error);
      },
    });

  }

  onDeleteRole(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this role?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roleService.deleteRole(id).subscribe({
          next: () => {
            this.toastService.success('Role deleted successfully!');
            this.getRoles();
          },
          error: (error: any) => {
            console.error('Error deleting role:', error);
          },
        });
      },
    });
  }

}
