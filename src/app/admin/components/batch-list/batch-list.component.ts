import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Batches } from '../../../fds-config/entity-models/batch';
import { BatchService } from '../../services/batch-service';
import { InsertUpdateBatchesComponent } from './insert-update-batches/insert-update-batches.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppQuery } from '../../../shared/app-query';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../shared/services/toast.service';
import { takeUntil } from 'rxjs';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { UserInfoService } from '../../services/user-info-service';

@Component({
  selector: 'app-batch-list',
  standalone: false,
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss',
})
export class BatchListComponent implements OnInit {
  batches: Batches[] = [];
  cols: any[] = [];

  private dialogRef!: MatDialogRef<any>;
  userTokenInfo: any;

  constructor(
    private readonly batchService: BatchService,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly confirmationService: ConfirmationService,
    private readonly toastService: ToastService,
    private readonly usersService: UserInfoService,
  ) { }
  ngOnInit(): void {
    this.userTokenInfo = this.usersService.getUserInfo();
    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Year', header: 'Year' },
      { field: 'Department.Name', header: 'Department' },
    ];

    this.getBatches();
  }

  getBatches() {
    this.batchService.getBatches().subscribe({
      next: (response) => {
        this.batches = response.data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching batches:', error);
      },
    });
  }

  AddBatch() {
    const dialogRef = this.dialog.open(InsertUpdateBatchesComponent, {
      width: '500px',
      height: '400px',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBatches();
      }
    });
  }

  onDeleteBatch(id: number) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete batch?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.batchService.deleteBatch(id).subscribe({
          next: (res: any) => {
            this.toastService.success('Batch deleted successfully!');
            this.getBatches();
          },
          error: (error: any) => {
            console.error('Error deleting batch:', error);
            this.toastService.error('Failed to delete batch!');
          },
        });
      }
    });
  }

  onEditBatch(id: number) {
    this.batchService.getBatchById(id).subscribe({
      next: (res: AppQuery<Batches>) => {
        const batchToUpdate = res?.data;

        const dialogRef = this.dialog.open(InsertUpdateBatchesComponent, {
          width: '500px',
          height: '400px',
          autoFocus: true,
          data: batchToUpdate,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.getBatches();
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching batch:', error);
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
