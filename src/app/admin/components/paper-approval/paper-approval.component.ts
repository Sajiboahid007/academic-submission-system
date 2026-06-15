import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaperApprovals } from '../../../fds-config/entity-models/approval';
import { ApprovalService } from '../../services/approval-service';
import { PaperApprovalConfirmationComponent } from '../../../shared/components/paper-approval-confirmation/paper-approval-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../shared/services/toast.service';
import { AcademicSubmissionConfig } from '../../../fds-config/constant/academic-submission-config';
import { UserInfoService } from '../../services/user-info-service';
import { Papers } from '../../../fds-config/entity-models/papers';
import { PapersService } from '../../services/papers-service';
import { InsertUpdatePaperComponent } from '../papers-list/insert-update-paper/insert-update-paper.component';
import { AppQuery } from '../../../shared/app-query';

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
  papers: Papers[] = [];

  constructor(
    private readonly approvalService: ApprovalService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService,
    private readonly userInfoService: UserInfoService,
    private readonly papersService: PapersService
  ) { }

  ngOnInit(): void {
    this.userTokenInfo = this.userInfoService.getUserInfo();

    const userRole = this.userTokenInfo?.role;
    const { Student: studentRole, Teacher: teacherRole } = AcademicSubmissionConfig.UserRole;

    if (userRole === studentRole || userRole === teacherRole) {
      this.userPapers(Number(this.userTokenInfo?.userId));

    } else {
      this.getApprovalList();
    }
  }

  public getApprovalList() {
    try {
      this.papersService.getPapers().subscribe((res: AppQuery<Papers[]>) => {
        this.papers = res.data;
        this.cdr.markForCheck();
      });
    } catch (error) {
      console.error('Error fetching approval list:', error);
    }
  }

  private userPapers(id: number) {
    this.papersService.getPapersByUserId(id).subscribe({
      next: (res: any) => {
        this.papers = res?.data || [];
        console.debug(this.papers);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching papers:', err);
      },
    });
  }

  isAllowedStatus(paperApproval: any) {
    if (paperApproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Draft) {
      return true;
    }
    return false;
  }

  isUserAllowedToApprove1(paperApproval: any): boolean {
    // this are not allowed status to edit or approve
    if (!this.isAllowedStatus(paperApproval)) {
      return false;
    }


    const role = AcademicSubmissionConfig.UserRole;

    // if student then he is not allowed
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



  canEditPaper(approval: any): boolean {
    return this.isUserAllowedToApprove(approval);
  }

  editPaper(paperId: any) {
    this.papersService.getPaperById(paperId).subscribe({
      next: (res: AppQuery<Papers>) => {
        const paperToUpdate = res?.data;

        const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
          width: '900px',
          height: '700px',
          maxWidth: 'none',
          autoFocus: true,
          data: paperToUpdate,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.toastService.success('Paper updated successfully!');
            this.getApprovalList();
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching paper:', error);
        this.toastService.error('Failed to fetch paper details.');
      },
    });
  }

  isUserAllowedToApprove(approval: any): boolean {
    if (!this.isAllowedStatus(approval)) return false;

    const role = AcademicSubmissionConfig.UserRole;
    const userRole = this.userTokenInfo?.role;

    // get assigned users
    const paperGroups = approval?.Papers?.PaperGroups || [];

    // STUDENT: only if assigned
    if (userRole === role.Student) {
      return paperGroups.some(
        (g: any) => g.UserId === this.userTokenInfo?.userId
      );
    }

    // TEACHER: only if assigned
    if (userRole === role.Teacher) {
      return paperGroups.some(
        (g: any) => g.UserId === this.userTokenInfo?.userId
      );
    }

    // ADMIN / SUPER ADMIN: always allowed
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

  viewPaper(paperId: number) {
    if (!paperId) return;

    this.papersService.getPaperById(paperId).subscribe({
      next: (res) => {
        const fileUrl = res?.data?.FileUrl;

        if (!fileUrl) {
          console.warn('No file URL found');
          return;
        }

        window.open(fileUrl, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
