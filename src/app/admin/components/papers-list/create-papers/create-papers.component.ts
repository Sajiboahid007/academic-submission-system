import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Papers } from '../../../../fds-config/entity-models/papers';
import { Category } from '../../../../fds-config/entity-models/categories';
import { SubCategory } from '../../../../fds-config/entity-models/subcategory';
import { Department } from '../../../../fds-config/entity-models/department';
import { Batches } from '../../../../fds-config/entity-models/batch';
import { PapersService } from '../../../services/papers-service';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories-service';
import { SubcategoryService } from '../../../services/subcategory-service';
import { DepartmentService } from '../../../services/department-service';
import { BatchService } from '../../../services/batch-service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserInfoService } from '../../../services/user-info-service';
import { AppQuery } from '../../../../shared/app-query';
import { InsertUpdatePaperComponent } from '../insert-update-paper/insert-update-paper.component';
import { Table } from 'primeng/table';
import { PaperApprovalConfirmationComponent } from '../../../../shared/components/paper-approval-confirmation/paper-approval-confirmation.component';
import { AcademicSubmissionConfig } from '../../../../fds-config/constant/academic-submission-config';
import { ConfirmationService } from 'primeng/api';
import { JournalInsertUpdateComponent } from '../journal-insert-update/journal-insert-update.component';
import { Journals } from '../../../../fds-config/entity-models/journals';
import { JournalService } from '../../../services/journal-service';

@Component({
  selector: 'app-create-papers',
  standalone: false,
  templateUrl: './create-papers.component.html',
  styleUrl: './create-papers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePapersComponent {
  papers: Papers[] = [];
  journal: Journals[] = [];
  loading: boolean = false;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  departments: Department[] = [];
  batches: Batches[] = [];
  years: string[] = [];
  searchValue = '';
  userTokenInfo: any = {};

  constructor(
    private readonly papersService: PapersService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService,
    private readonly userInfoService: UserInfoService,
    private readonly journalService: JournalService,
    private readonly confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.userTokenInfo = this.userInfoService.getUserInfo();
    this.getPapers();
    this.getJournals();
  }

  getPapers() {
    this.papersService
      .getPapersByUserId(this.userTokenInfo.userId)
      .subscribe((res: AppQuery<Papers[]>) => {
        this.papers = res.data;
        this.years = Array.from(
          new Set(this.papers.map((paper) => paper.Year).filter((year): year is string => !!year)),
        ).sort();
        this.cdr.markForCheck();
      });
  }

  getJournals() {
    this.journalService.getJournals().subscribe({
      next: (res: AppQuery<Journals[]>) => {
        this.journal = res.data;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        this.toastService.error('Failed to load journals.');
      },
    });
  }

  AddJournal() {
    const dialogRef = this.dialog.open(JournalInsertUpdateComponent, {
      width: '900px',
      height: '700px',
      maxWidth: 'none',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.toastService.success('Paper created successfully!');
        this.getJournals();
      }
    });
  }

  AddPapers() {
    const dialogRef = this.dialog.open(InsertUpdatePaperComponent, {
      width: '900px',
      height: '700px',
      maxWidth: 'none',
      autoFocus: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getPapers();
        this.toastService.success('Paper created successfully!');
      }
    });
  }

  editPaper(paperId: number) {
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
            this.getPapers();
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching paper:', error);
        this.toastService.error('Failed to fetch paper details.');
      },
    });
  }

  viewPaper(id: number) {
    const paper = this.papers.find((p) => p.Id === id);

    if (paper?.FileUrl) {
      const link = document.createElement('a');
      link.href = paper.FileUrl;
      link.download = paper.FileUrl.split('/').pop() || 'document.pdf';
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn('No PDF file URL found.');
    }
  }
  viewJournal(id: number) {
    if (!id) return;
    this.journalService.getById(id).subscribe({
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
  editJournal(id: number) {
    this.journalService.getById(id).subscribe({
      next: (res) => {
        const journal = res?.data;

        const dialogRef = this.dialog.open(JournalInsertUpdateComponent, {
          width: '900px',
          height: '700px',
          maxWidth: 'none',
          autoFocus: true,
          data: journal,
        });

        dialogRef.afterClosed().subscribe((res: any) => {
          if (res) {
            this.toastService.success('Journal updated successfully!');
            this.getJournals();
          }
        })
      },
      error: (error: any) => {
        console.error('Error fetching journal:', error);
        this.toastService.error('Failed to fetch journal details.');
      },
    })
  }

  deleteJournal(id: number) {

  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  public getSeverity(
    status: string | undefined,
  ): 'info' | 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Pending':
        return 'warn';
      case 'Draft':
        return 'info';
      default:
        return 'secondary';
    }
  }

  onApprove(paperId: any) {
    const dialogRef = this.dialog.open(PaperApprovalConfirmationComponent, {
      width: '500px',
      autoFocus: true,
      data: { PaperId: paperId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPapers();
      }
    });
  }

  isAllowedStatus(paperApproval: any) {
    if (
      paperApproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Pending ||
      paperApproval?.Status === AcademicSubmissionConfig.ApprovalStatus.Draft
    ) {
      return true;
    }

    return false;
  }

  isUserAllowedToApproveOrEdit(paper: any) {
    const [paperAproval] = paper?.PaperApprovals;

    if (!this.isAllowedStatus(paperAproval)) {
      return false;
    }

    const role = AcademicSubmissionConfig.UserRole;
    const paperGroups = paper?.PaperGroups || [];

    if (
      (this.userTokenInfo.role === role.Student || this.userTokenInfo.role === role.Teacher) &&
      this.isAllowedStatus(paperAproval)
    ) {
      if (paperGroups.find((group: any) => group.UserId === this.userTokenInfo.userId)) {
        return true;
      }
    }

    // except for student and teacher, everyone can approve
    if (
      this.userTokenInfo.role !== role.Student &&
      this.userTokenInfo.role !== role.Teacher &&
      this.isAllowedStatus(paperAproval)
    ) {
      return true;
    }

    return false;
  }


  deletePaper(id: number): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this paper?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.papersService.deletePaper(id).subscribe({
          next: () => {
            this.toastService.success('Paper deleted successfully');
            this.getPapers();
          },
          error: (err) => {
            console.error('Error deleting paper:', err);
            this.toastService.error('Failed to delete paper');
          },
        });
      },
    });
  }
}
