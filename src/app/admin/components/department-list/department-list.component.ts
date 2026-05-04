import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../../../fds-config/entity-models/department';
import { DepartmentService } from '../../services/department-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppQuery } from '../../../shared/app-query';

@Component({
  selector: 'app-department-list',
  standalone: false,
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentListComponent implements OnInit {
  Department: Department[] = [];

  dataSource = new MatTableDataSource<Department>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['Name', 'Code', 'Action'];

  constructor(private readonly departmentService: DepartmentService) {}
  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response: AppQuery<Department[]>) => {
        this.Department = response.data;
        this.dataSource.data = this.Department;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      },
    });
  }
  AddDepartment() {}

  onDeleteDepartment(department: Department) {}

  onEditDepartment(department: Department) {}
}
