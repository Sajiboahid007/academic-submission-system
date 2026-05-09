import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Department } from '../../../fds-config/entity-models/department';
import { DepartmentService } from '../../services/department-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppQuery } from '../../../shared/app-query';
import { InsertUpdateDepartmentComponent } from './insert-update-department/insert-update-department.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-department-list',
  standalone: false,
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentListComponent implements OnInit {
  department: Department[] = [];

  constructor(
    private readonly departmentService: DepartmentService,
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService,
    private readonly cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response: AppQuery<Department[]>) => {
        this.department = response.data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      },
    });
  }
  AddDepartment() {
    const dialogRef = this.dialog.open(InsertUpdateDepartmentComponent, {
      width: '500px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getDepartments();
      }
    });
  }

  onDeleteDepartment(id: number) {
    console.log('Delete department with ID:', id);
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => {
        this.toastService.success('Department deleted successfully');
        this.getDepartments();
      },
      error: (error) => {
        console.error('Error deleting department:', error);
      },
    });
  }

  onEditDepartment(id: number) {
    this.departmentService.getDepartmentById(id).subscribe({
      next: (response: AppQuery<Department>) => {
        const dialogRef = this.dialog.open(InsertUpdateDepartmentComponent, {
          width: '500px',
          autoFocus: true,
          data: response.data,
        });

        dialogRef.afterClosed().subscribe((res: any) => {
          if (res) {
            this.getDepartments();
          }
        });
      },
      error: (error) => {
        console.error('Error fetching department:', error);
      },
    });
  }
}
