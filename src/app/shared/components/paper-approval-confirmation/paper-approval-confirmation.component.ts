import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { UserInfoService } from '../../../admin/services/user-info-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { PaperApprovalConfirmation } from '../../services/paper-approval-confirmation';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-paper-approval-confirmation',
  standalone: false,
  templateUrl: './paper-approval-confirmation.component.html',
  styleUrl: './paper-approval-confirmation.component.scss',
})
export class PaperApprovalConfirmationComponent implements OnInit {
  size: any;
  approveFrom!: FormGroup;

  currentUserRole: string | null = null;
  statusOptions: any[] = [];
  isSaving: boolean = false;

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly dialogRef: MatDialogRef<PaperApprovalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { PaperId: number } | null,
    @Inject(MAT_DIALOG_DATA) public datajournal: { JournalId: number } | null,
    private readonly cdr: ChangeDetectorRef,
    private readonly paperApprovalConfirmation: PaperApprovalConfirmation,
    private readonly toastService: ToastService,
  ) { }

  ngOnInit(): void {
    const userInfo = this.userInfoService.getUserInfo();

    this.approveFrom = new FormGroup({
      Status: new FormControl(''),
      Remarks: new FormControl(''),
    });

    if (userInfo && (userInfo.role === AcademicSubmissionConfig.UserRole.Student || userInfo.role === AcademicSubmissionConfig.UserRole.Teacher)) {
      this.statusOptions = [
        {
          label: AcademicSubmissionConfig.ApprovalStatus.Draft,
          value: AcademicSubmissionConfig.ApprovalStatus.Draft,
        },
        {
          label: AcademicSubmissionConfig.ApprovalStatus.Pending,
          value: AcademicSubmissionConfig.ApprovalStatus.Pending,
        },
      ];
    } else {
      this.statusOptions = Object.values(AcademicSubmissionConfig.ApprovalStatus)
        .filter((status) => status !== AcademicSubmissionConfig.ApprovalStatus.Draft)
        .map((status) => ({
          label: status,
          value: status,
        }));
    }

    this.cdr.detectChanges();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (!this.approveFrom.valid) {
      return;
    }

    if (!this.data?.PaperId) {
      this.toastService.error('Paper id could not be empty');
      return;
    }

    this.isSaving = true;
    let formData = this.approveFrom.getRawValue();
    formData.PaperId = this.data?.PaperId;
    this.paperApprovalConfirmation.updateApprovalStatus(formData).subscribe({
      next: (_) => {
        this.toastService.success('Approval status updated successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating approval status:', error);
        this.toastService.error('Failed to update approval status');
        this.isSaving = false;
      },
    });
  }




  //this is new function
  // In your component
  onSave2() {
    if (!this.approveFrom.valid) {
      return;
    }

    if (this.data?.PaperId) {
      this.updatePaperApproval();
    } else if (this.datajournal?.JournalId) {
      this.updateJournalApproval();
    } else {
      this.toastService.error('Paper ID or Journal ID could not be empty');
    }
  }

  private updatePaperApproval() {
    this.isSaving = true;
    let formData = this.approveFrom.getRawValue();
    formData.PaperId = this.data?.PaperId;

    this.paperApprovalConfirmation.updateApprovalStatus(formData).subscribe({
      next: (_) => {
        this.toastService.success('Paper approval status updated successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating paper approval status:', error);
        this.toastService.error('Failed to update paper approval status');
        this.isSaving = false;
      },
    });
  }

  private updateJournalApproval() {
    this.isSaving = true;
    let formData = this.approveFrom.getRawValue();
    formData.JournalId = this.datajournal?.JournalId;

    this.paperApprovalConfirmation.updateJournalApprovalStatus(formData).subscribe({
      next: (_) => {
        this.toastService.success('Journal approval status updated successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating journal approval status:', error);
        this.toastService.error('Failed to update journal approval status');
        this.isSaving = false;
      },
    });
  }




}
