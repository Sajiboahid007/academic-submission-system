import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../../fds-config/entity-models/department';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../../services/department-service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-insert-update-department',
  standalone: false,
  templateUrl: './insert-update-department.component.html',
  styleUrl: './insert-update-department.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertUpdateDepartmentComponent implements OnInit {
  isEditMode = false;
  departmentId!: number;
  departmentForm!: FormGroup;
  department: Department[] = [];
  dataSource = new MatTableDataSource<Department>([]);
  constructor(
    private readonly dialogRef: MatDialogRef<InsertUpdateDepartmentComponent>,
    private readonly departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: Department | null,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.departmentForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Code: new FormControl('', Validators.required),
    });

    if (this.data) {
      this.isEditMode = true;
      this.departmentId = this.data.Id;
      this.departmentForm.patchValue(this.data);
    }
  }

  onSave() {
    if (this.departmentForm.invalid) return;
    if (this.isEditMode) {
      this.updateDepartment();
    } else {
      this.saveDepartment();
    }
  }
  onCancel() {
    this.dialogRef.close();
  }

  saveDepartment() {
    const depData: Department = this.departmentForm.getRawValue();
    this.departmentService.addDepartment(depData).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.toastService.success('Department created successfully');
      },

      error: (error) => {
        console.error('Error saving department:', error);
      },
    });
  }
  updateDepartment() {
    const depData: Department = this.departmentForm.getRawValue();
    depData.Id = this.departmentId;
    this.departmentService.updateDepartment(depData).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.toastService.success('Department updated successfully');
      },
      error: (error) => {
        console.error('Error updating department:', error);
      },
    });
  }
}
