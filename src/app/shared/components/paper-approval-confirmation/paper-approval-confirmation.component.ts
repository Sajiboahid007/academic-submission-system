import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { UserInfoService } from '../../../admin/services/user-info-service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { PaperApprovalConfirmation } from '../../services/paper-approval-confirmation';
import { ToastService } from '../../services/toast.service';
import { Users } from '../../../fds-config/entity-models/user';
import { PlagarismComponent } from '../plagarism/plagarism.component';
import { PlagarismService } from '../../../admin/services/plagarism-service';
import { FileService } from '../../../admin/services/file-service';

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
  users: Users[] = [];
  editorial: Users[] = [];
  userInfo: any = {};
  isReviewer: boolean = false;

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly dialogRef: MatDialogRef<PaperApprovalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { PaperId?: number; JournalId?: number; Source?: 'Journal' | 'Paper'; fromPaperApproval?: boolean; fromCreatePapers?: boolean; fromCreateJournal?: boolean } | null,
    private readonly cdr: ChangeDetectorRef,
    private readonly paperApprovalConfirmation: PaperApprovalConfirmation,
    private readonly toastService: ToastService,
    private readonly userService: UserInfoService,
    private readonly dialog: MatDialog,
    private readonly plagarismService: PlagarismService,
    private readonly fileService: FileService
  ) {

  }

  ngOnInit(): void {
    this.userInfo = this.userInfoService.getUserInfo();
    this.isReviewer = this.userInfo?.role === AcademicSubmissionConfig.UserRole.Reviewer;

    if (this.data?.Source === 'Journal') {
      this.getUsers();
    }

    this.approveFrom = new FormGroup({
      Status: new FormControl('', Validators.required),
      Remarks: new FormControl('', Validators.required),
      EditorialId: new FormControl(),
      RemarksFile: new FormControl(null),
    });

    const isFromCreatePapers = this.data?.fromCreatePapers || !this.data?.fromPaperApproval;

    if (isFromCreatePapers) {
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
    } else if (this.userInfo && (this.userInfo.role === AcademicSubmissionConfig.UserRole.Student
      || this.userInfo.role === AcademicSubmissionConfig.UserRole.Teacher)) {
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

      if (this.data?.Source === 'Journal' || this.data?.Source === 'Paper') {
        this.statusOptions.push({
          label: AcademicSubmissionConfig.ApprovalStatus.Draft,
          value: AcademicSubmissionConfig.ApprovalStatus.Draft,
        });
        this.statusOptions.push({
          label: AcademicSubmissionConfig.ApprovalStatus.Pending,
          value: AcademicSubmissionConfig.ApprovalStatus.Pending,
        });
        // if (this.data?.Source === 'Paper') {
        //   this.statusOptions.push({
        //     label: AcademicSubmissionConfig.ApprovalStatus.ReviewRequested,
        //     value: AcademicSubmissionConfig.ApprovalStatus.ReviewRequested,
        //   });
        // }
        this.statusOptions = this.statusOptions.filter(item => {
          return item.label !== AcademicSubmissionConfig.ApprovalStatus.Pending
        })
      }

    } else if (this.userInfo && this.userInfo.role === AcademicSubmissionConfig.UserRole.SuperAdmin) {
      this.statusOptions = Object.values(AcademicSubmissionConfig.ApprovalStatus).map((status) => ({
        label: status,
        value: status,
      }));
    } else if (this.userInfo && this.userInfo.role === AcademicSubmissionConfig.UserRole.Admin) {
      this.statusOptions = Object.values(AcademicSubmissionConfig.ApprovalStatus)
        .filter(
          (status) =>
            status !== AcademicSubmissionConfig.ApprovalStatus.Pending
        )
        .map((status) => ({
          label: status,
          value: status,
        }));
    } else if (this.userInfo && this.userInfo.role === AcademicSubmissionConfig.UserRole.Reviewer) {
      this.statusOptions = [
        {
          label: AcademicSubmissionConfig.ApprovalStatus.ReviewerReject,
          value: AcademicSubmissionConfig.ApprovalStatus.ReviewerReject,
        },
        {
          label: AcademicSubmissionConfig.ApprovalStatus.EditorialApproved,
          value: AcademicSubmissionConfig.ApprovalStatus.EditorialApproved,
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

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.data as Users[];

      this.editorial = this.users.filter(
        (user) => user?.Roles?.Name === AcademicSubmissionConfig.UserRole.Reviewer ||
          user?.Roles?.Name === AcademicSubmissionConfig.UserRole.Admin ||
          user?.Roles?.Name === AcademicSubmissionConfig.UserRole.SuperAdmin,
      );
    });
  }

  showEditorial(): boolean {
    const role = this.userInfo?.role;
    return !!this.data?.fromPaperApproval && this.data?.Source === 'Journal' && (
      role === AcademicSubmissionConfig.UserRole.SuperAdmin ||
      role === AcademicSubmissionConfig.UserRole.Admin
    );
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

    const file = this.approveFrom.get('RemarksFile')?.value;
    if (file) {
      this.isSaving = true;
      this.cdr.detectChanges();
      this.fileService.uploadFile(file).subscribe({
        next: (res) => {
          const remarksFileUrl = res?.data?.url;
          this.executeApprovalUpdate(remarksFileUrl);
        },
        error: (err) => {
          console.error('Error uploading remarks file:', err);
          this.toastService.error('Failed to upload remarks file');
          this.isSaving = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.executeApprovalUpdate(null);
    }
  }

  private executeApprovalUpdate(remarksFileUrl: string | null) {
    if (this.data?.PaperId) {
      this.updatePaperApproval(remarksFileUrl);
    } else if (this.data?.JournalId) {
      this.updateJournalApproval(remarksFileUrl);
    } else {
      this.toastService.error('Paper ID or Journal ID could not be empty');
      this.isSaving = false;
      this.cdr.detectChanges();
    }
  }

  private updatePaperApproval(remarksFileUrl: string | null) {
    this.isSaving = true;
    let formData = this.approveFrom.getRawValue();
    formData.PaperId = this.data?.PaperId;
    formData.RemarksFile = remarksFileUrl;

    this.paperApprovalConfirmation.updateApprovalStatus(formData).subscribe({
      next: (_) => {
        this.toastService.success('Paper approval status updated successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating paper approval status:', error);
        this.toastService.error('Failed to update paper approval status');
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }

  private updateJournalApproval(remarksFileUrl: string | null) {
    this.isSaving = true;
    let formData = this.approveFrom.getRawValue();
    formData.JournalId = this.data?.JournalId;
    formData.RemarksFile = remarksFileUrl;

    this.paperApprovalConfirmation.updateJournalApprovalStatus(formData).subscribe({
      next: (_) => {
        this.toastService.success('Journal approval status updated successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating journal approval status:', error);
        this.toastService.error('Failed to update journal approval status');
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }


  checkPlagarism() {
    const dialogRef = this.dialog.open(PlagarismComponent, {
      width: '900px',
      height: '600px',
      autoFocus: true,
      data: { JournalId: this.data?.JournalId, PaperId: this.data?.PaperId },
    });
  }

  sendMail() { }


  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.approveFrom.patchValue({ RemarksFile: file });
    }
  }

  onFileClear() {
    this.approveFrom.patchValue({ RemarksFile: null });
  }

  onFileRemove(event: any) {
    this.approveFrom.patchValue({ RemarksFile: null });
  }

}
