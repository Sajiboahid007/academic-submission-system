import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaperApprovals } from '../../../fds-config/entity-models/approval';
import { ApprovalService } from '../../services/approval-service';
import { PaperApprovalConfirmationComponent } from '../../../shared/components/paper-approval-confirmation/paper-approval-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast.service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { UserInfoService } from '../../services/user-info-service';

@Component({
  selector: 'app-paper-approval',
  standalone: false,
  templateUrl: './paper-approval.component.html',
  styleUrl: './paper-approval.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperApprovalComponent implements OnInit {
  aprovals: PaperApprovals[] = [];
  userTokenInfo: any = {};

  constructor(
    private readonly approvalService: ApprovalService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService,
    private readonly userInfoService: UserInfoService
  ) { }

  ngOnInit(): void {
    this.userTokenInfo = this.userInfoService.getUserInfo();
    console.debug(this.userTokenInfo);
    this.getApprovalList();
  }

  public getApprovalList() {
    try {
      this.approvalService.getApprovalList().subscribe((res) => {
        console.debug(res.data);
        this.aprovals = res.data;
        this.cdr.markForCheck();
      });
    } catch (error) {
      console.error('Error fetching approval list:', error);
    }
  }

  isAllowedStatus(paperApproval: any) {
    if (paperApproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Pending) {
      return true;
    }

    return false;
  }

  isUserAllowedToApprove(paperApproval: any): boolean {
    // this are not allowed status to edit or approve
    if (!this.isAllowedStatus(paperApproval)) {
      return false;
    }


    const role = AcademicSubmissionConfig.UserRole;

    // if stuent then he is not allowed
    if (role?.Student === this.userTokenInfo?.role) {
      return false;
    }

    // if teacher and paper is not assigned to him then he is not allowed
    const paperGroups = paperApproval?.Papers?.PaperGroups;
    if (role?.Teacher === this.userTokenInfo?.role && paperGroups?.find((group: any) => group.UserId === this.userTokenInfo?.id)) {
      return false;
    }

    return true;
  }

  onApprove(paperId: any) {
    const dialogRef = this.dialog.open(PaperApprovalConfirmationComponent, {
      width: '500px',
      autoFocus: true,
      data: { PaperId: paperId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getApprovalList();
      }
    });
  }
}
