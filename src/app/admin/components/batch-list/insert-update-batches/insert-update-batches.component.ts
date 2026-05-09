import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Batches } from '../../../../fds-config/entity-models/batch';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BatchService } from '../../../services/batch-service';
import { Department } from '../../../../fds-config/entity-models/department';
import { DepartmentService } from '../../../services/department-service';

@Component({
  selector: 'app-insert-update-batches',
  standalone: false,
  templateUrl: './insert-update-batches.component.html',
  styleUrl: './insert-update-batches.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertUpdateBatchesComponent implements OnInit {
  isEditMode = false;
  batchId!: number;

  batchForm!: FormGroup;
  batches: Batches[] = [];
  department: Department[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<InsertUpdateBatchesComponent>,
    private readonly batchService: BatchService,
    private readonly departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: Batches | null,
  ) {}
  ngOnInit(): void {
    this.batchForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Year: new FormControl('', [Validators.required]),
      DepartmentId: new FormControl('', [Validators.required]),
      Status: new FormControl(true),
    });
    if (this.data) {
      this.isEditMode = true;
      this.batchId = this.data.Id;
      this.batchForm.patchValue(this.data);
    }

    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.department = response.data;

        if (this.data) {
          this.batchForm.patchValue({
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
    this.dialogRef.close(false);
  }

  onSave() {
    if (this.batchForm.invalid) return;
    if (this.isEditMode) {
      this.updateBatch();
    } else {
      this.saveBatch();
    }
  }

  saveBatch() {
    const batchData: Batches = this.batchForm.getRawValue();
    this.batchService.addBatch(batchData).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error saving batch:', error);
      },
    });
  }

  updateBatch() {
    const batchData: Batches = this.batchForm.getRawValue();
    batchData.Id = this.batchId;
    this.batchService.updateBatch(batchData).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating batch:', error);
      },
    });
  }
}
